<?php
// covers_action.php
require_once __DIR__ . '/db_config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || ($_POST['action'] ?? '') !== 'comment') {
    echo json_encode(['ok' => false, 'error' => 'bad request']);
    exit;
}

$cover_id = (int) ($_POST['cover_id'] ?? 0);
$name     = trim($_POST['name']    ?? '');
$comment  = trim($_POST['comment'] ?? '');
$rating   = max(1, min(5, (int) ($_POST['rating'] ?? 5)));

if (!$cover_id || $name === '' || $comment === '') {
    echo json_encode(['ok' => false, 'error' => 'plz fill in all fields!!']);
    exit;
}

if (mb_strlen($name) > 60 || mb_strlen($comment) > 500) {
    echo json_encode(['ok' => false, 'error' => 'input too long!!']);
    exit;
}

try {
    $pdo = get_pdo();

    // Make sure the cover actually exists
    $check = $pdo->prepare('SELECT id FROM covers WHERE id = ?');
    $check->execute([$cover_id]);
    if (!$check->fetch()) {
        echo json_encode(['ok' => false, 'error' => 'cover not found!!']);
        exit;
    }

    $stmt = $pdo->prepare(
        'INSERT INTO cover_comments (cover_id, name, comment_text, rating, created_at)
         VALUES (?, ?, ?, ?, NOW())'
    );
    $stmt->execute([$cover_id, $name, $comment, $rating]);

    // Return updated stats so the JS can refresh the display
    $stats = $pdo->prepare(
        'SELECT COUNT(*) AS cnt, COALESCE(AVG(rating), 0) AS avg_r
         FROM cover_comments WHERE cover_id = ?'
    );
    $stats->execute([$cover_id]);
    $row = $stats->fetch();

    echo json_encode([
        'ok'         => true,
        'count'      => (int) $row['cnt'],
        'avg_rating' => round((float) $row['avg_r'], 1),
        'comment'    => [
            'name'         => $name,
            'comment_text' => $comment,
            'rating'       => $rating,
        ],
    ]);

} catch (PDOException $e) {
    error_log('covers_action error: ' . $e->getMessage());
    echo json_encode(['ok' => false, 'error' => 'database error!! (>_<)']);
}