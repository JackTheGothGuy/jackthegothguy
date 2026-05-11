<?php
// ============================================
// submit.php  —  Handles guestbook form POST
// ============================================

require_once __DIR__ . '/db_config.php';

header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ---- Sanitise & validate ----
function clean(string $val, int $max = 200): string {
    return mb_substr(trim(strip_tags($val)), 0, $max);
}

$name    = clean($_POST['name']    ?? '', 80);
$message = clean($_POST['message'] ?? '', 1000);

if ($name === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Name and message are required.']);
    exit;
}

$location = clean($_POST['location']  ?? '', 80);
$url      = clean($_POST['website_url'] ?? '', 200);
$aim      = clean($_POST['aim_msn']   ?? '', 80);
$referrer = clean($_POST['referrer']  ?? '', 80);
$mood     = clean($_POST['mood']      ?? '', 40);
$ip       = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip       = mb_substr($ip, 0, 45);

// ---- Basic URL safety ----
if ($url !== '' && !filter_var($url, FILTER_VALIDATE_URL)) {
    $url = '';
}

// ---- Spam / flood guard: max 3 posts from same IP in 10 minutes ----
try {
    $pdo  = get_pdo();
    $stmt = $pdo->prepare(
        'SELECT COUNT(*) FROM guestbook_entries
          WHERE ip_address = ? AND created_at > DATE_SUB(NOW(), INTERVAL 10 MINUTE)'
    );
    $stmt->execute([$ip]);
    if ((int) $stmt->fetchColumn() >= 3) {
        http_response_code(429);
        echo json_encode(['ok' => false, 'error' => 'Slow down!! Too many posts in a short time. Try again soon. (>_<)']);
        exit;
    }

    // ---- Insert ----
    $ins = $pdo->prepare(
        'INSERT INTO guestbook_entries
            (name, location, website_url, aim_msn, referrer, mood, message, ip_address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $ins->execute([$name, $location, $url, $aim, $referrer, $mood, $message, $ip]);
    $newId = (int) $pdo->lastInsertId();

    // Return the new entry so JS can prepend it without a reload
    $row = $pdo->query(
        'SELECT * FROM guestbook_entries WHERE id = ' . $newId
    )->fetch();

    echo json_encode(['ok' => true, 'entry' => $row]);

} catch (PDOException $e) {
    error_log('Guestbook DB error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Database error. Try again later. :(']);
}