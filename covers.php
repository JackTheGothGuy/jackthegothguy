<?php
// ============================================
// covers.php — Jack's Vault Covers Page
// ============================================

require_once __DIR__ . '/db_config.php';

function h(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function stars(float $avg, bool $yellow = true): string {
    $out = '';
    $color = $yellow ? '#ffcc00' : '#ffcc00';
    for ($i = 1; $i <= 5; $i++) {
        $out .= $i <= round($avg) ? '&#9733;' : '&#9734;';
    }
    return '<span style="color:' . $color . ';">' . $out . '</span>';
}

function star_select(int $cover_id): string {
    $html = '<select id="rating-' . $cover_id . '" class="retro-select">';
    $opts = [
        5 => '&#9733;&#9733;&#9733;&#9733;&#9733; (5 stars - AMAZING!!)',
        4 => '&#9733;&#9733;&#9733;&#9733;&#9734; (4 stars - rly good!)',
        3 => '&#9733;&#9733;&#9733;&#9734;&#9734; (3 stars - ok i guess)',
        2 => '&#9733;&#9733;&#9734;&#9734;&#9734; (2 stars - meh)',
        1 => '&#9733;&#9734;&#9734;&#9734;&#9734; (1 star - ew)',
    ];
    foreach ($opts as $val => $label) {
        $html .= '<option value="' . $val . '">' . $label . '</option>';
    }
    $html .= '</select>';
    return $html;
}

// Load all covers + their comment stats in one query
try {
    $pdo = get_pdo();

    $covers = $pdo->query(
        'SELECT c.*,
                COUNT(cc.id)      AS comment_count,
                COALESCE(AVG(cc.rating), 0) AS avg_rating
         FROM covers c
         LEFT JOIN cover_comments cc ON cc.cover_id = c.id
         GROUP BY c.id
         ORDER BY c.cover_number ASC'
    )->fetchAll();

    // Load comments for each cover (keyed by cover id)
    $comments = [];
    $rows = $pdo->query(
        'SELECT * FROM cover_comments ORDER BY created_at ASC'
    )->fetchAll();
    foreach ($rows as $r) {
        $comments[$r['cover_id']][] = $r;
    }

    // Top rated for sidebar
    $top_rated = $pdo->query(
        'SELECT c.title, c.cover_number, COALESCE(AVG(cc.rating),0) AS avg_r, COUNT(cc.id) AS cnt
         FROM covers c LEFT JOIN cover_comments cc ON cc.cover_id = c.id
         GROUP BY c.id ORDER BY avg_r DESC, cnt DESC'
    )->fetchAll();

    // Recently added for sidebar
    $recent = $pdo->query(
        'SELECT cover_number, title, date_added FROM covers ORDER BY date_added DESC'
    )->fetchAll();

    $total_covers = count($covers);
    $db_error = false;
} catch (PDOException $e) {
    error_log('Covers page error: ' . $e->getMessage());
    $db_error = true;
    $covers = $comments = $top_rated = $recent = [];
    $total_covers = 0;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="keywords" content="covers, music, jack's vault, videos">
  <meta name="description" content="Jack's Vault - Covers Page">
  <title>~*~ Jack's Vault - Covers ~*~</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <style type="text/css">
    .video-container { border: 1px solid #660099; background: #000; padding: 4px; margin-bottom: 4px; }
    .video-screen { background: #0a000a; min-height: 220px; display: flex; align-items: center; justify-content: center; border: 1px inset #330033; position: relative; overflow: hidden; }
    .video-placeholder { text-align: center; color: #cc99ff; font-size: 11px; font-family: Verdana, sans-serif; padding: 20px; }
    .video-placeholder p { color: #ff99ff; font-size: 13px; margin: 0 0 4px 0; }
    .video-screen video { width: 100%; display: none; }
    .video-controls { background: #1a001a; border-top: 1px solid #440044; padding: 4px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
    .vid-btn { background: #330066; border: 1px solid #cc00cc; color: #ff99ff; cursor: pointer; font-size: 10px; padding: 2px 6px; font-family: Verdana, sans-serif; }
    .vid-btn:hover { background: #550088; color: #ffffff; }
    .vid-time { font-size: 9px; color: #cc99ff; font-family: Verdana, sans-serif; margin-left: 4px; }
    .vid-progress-wrap { flex: 1; min-width: 60px; height: 6px; background: #220022; border: 1px solid #440044; cursor: pointer; position: relative; }
    .vid-progress-bar { height: 100%; background: #cc00cc; width: 0%; pointer-events: none; transition: width 0.2s linear; }
    .comment-section { border-top: 1px dashed #660066; margin-top: 8px; padding-top: 6px; }
    .comment-title { font-size: 10px; background: #1a001a; border: 1px solid #440066; color: #cc99ff; padding: 2px 6px; margin-bottom: 4px; }
    .comments-list { background: #0d000d; border: 1px inset #440044; padding: 5px; margin-bottom: 6px; max-height: 220px; overflow-y: auto; }
    .comment-entry { border-bottom: 1px dotted #440044; padding: 5px 2px; font-size: 10px; font-family: Verdana, sans-serif; }
    .comment-entry:last-child { border-bottom: none; }
    .comment-entry.new-comment { animation: flashNew 1.5s ease; }
    @keyframes flashNew { 0%{background:#330033;} 100%{background:transparent;} }
    .comment-name { color: #ff99ff; font-weight: bold; }
    .comment-stars { color: #ffcc00; margin: 0 4px; }
    .comment-date { color: #996699; font-size: 9px; }
    .comment-text { color: #ddccdd; display: block; margin-top: 2px; }
    .comment-form { background: #0d000d; border: 1px solid #440044; padding: 8px; }
    .retro-input { background: #1a001a; border: 1px inset #660066; color: #ff99ff; font-family: Verdana, sans-serif; font-size: 10px; padding: 2px 4px; width: 180px; }
    .retro-select { background: #1a001a; border: 1px inset #660066; color: #ff99ff; font-family: Verdana, sans-serif; font-size: 10px; }
    .retro-textarea { background: #1a001a; border: 1px inset #660066; color: #ff99ff; font-family: Verdana, sans-serif; font-size: 10px; padding: 2px 4px; resize: vertical; width: 220px; }
    .submit-btn { background: #660099; border: 1px solid #ff00ff; color: #ffffff; cursor: pointer; font-size: 10px; font-weight: bold; padding: 3px 10px; font-family: Verdana, sans-serif; margin-top: 4px; }
    .submit-btn:hover { background: #9900cc; }
    .submit-btn:disabled { background: #330066; cursor: wait; opacity: 0.7; }
    .comment-feedback { font-size: 10px; padding: 3px 6px; margin-top: 4px; display: none; font-family: Verdana, sans-serif; }
    .comment-success { background: #001100; border: 1px solid #00cc00; color: #00ff00; }
    .comment-error   { background: #110000; border: 1px solid #cc0000; color: #ff4444; }
    .avg-rating-line { color: #ffff00; font-size: 10px; }
    .rating-count    { color: #996699; font-size: 9px; }
    .no-comments     { font-size: 10px; font-style: italic; color: #996699; padding: 4px; }
    .db-error-box    { background: #110000; border: 1px solid #cc0000; color: #ff6666; padding: 8px; font-size: 11px; margin-bottom: 8px; }
    .cover-info td   { font-size: 10px; vertical-align: top; padding-left: 6px; }
    .interactive-stars { display: inline-flex; gap: 2px; cursor: pointer; font-size: 16px; }
    .interactive-stars span { color: #440044; transition: color 0.1s; }
    .interactive-stars span.lit { color: #ffcc00; }
    .star-label { font-size: 9px; color: #996699; font-family: Verdana, sans-serif; margin-left: 4px; }
  </style>
</head>
<body>

<marquee behavior="scroll" direction="left" scrollamount="4">
  &hearts; JACK'S COVERS PAGE &hearts; &nbsp;&nbsp;&nbsp; WATCH MY COVERS!! &nbsp;&nbsp;&nbsp;
  PLZ LEAVE A COMMENT AND RATING!! &nbsp;&nbsp;&nbsp; &hearts; JACK'S COVERS PAGE &hearts;
</marquee>

<div id="title">
  <h1>~*~ Jack's Vault ~*~</h1>
  <p id="subtitle">
    <blink>*** COVERS PAGE ***</blink>
    &nbsp;&nbsp; Last Updated: today
  </p>
</div>

<table id="main-table" cellpadding="5" cellspacing="2" border="0"><tr>

  <!-- LEFT SIDEBAR -->
  <td id="sidebar-left">
    <div class="sidebar-box">
      <div class="box-title">&#9658; NAVIGATION &#9668;</div>
      <a href="index.html">&#187; Home</a><br>
      <a href="aboutme.html">&#187; About Me</a><br>
      <a href="myphotos.html">&#187; My Photos</a><br>
      <a href="poems.html">&#187; My Poems</a><br>
      <a href="covers.php">&#187; Covers</a><br>
      <a href="daily.html">&#187; Daily Poll</a><br>
      <a href="friends.html">&#187; Friends</a><br>
      <a href="quiz.html">&#187; Quizzes</a><br>
      <a href="guestbook.php">&#187; Guestbook</a><br>
      <a href="portfolio.html">&#187; Portfolio</a><br>
      <a href="contact.html">&#187; Contact</a><br>
    </div>

    <div class="sidebar-box">
      <div class="box-title">&#9658; ONLINE STATUS &#9668;</div>
      &nbsp;xX_KillerJack69_Xx<br>
      <small><i>AIM: xX_KillerJack69_Xx</i></small><br>
      <small><i>MSN: jackrogers@hotmail.com</i></small>
    </div>

    <div class="sidebar-box">
      <div class="box-title">&#9658; COVERS INFO &#9668;</div>
      <p style="font-size:10px;">
        <b>Total Covers:</b> <?= $total_covers ?><br>
        <b>Guitar:</b> Fender Strat<br>
        <b>Amp:</b> Marshall MG15<br>
        <b>Recorded w/:</b> a webcam lol<br><br>
        <i style="color:#ff99ff;">"music is my life"</i>
      </p>
    </div>

    <div class="sidebar-box">
      <div class="box-title">&#9658; TOP RATED &#9668;</div>
      <p style="font-size:10px;">
        <?php foreach ($top_rated as $tr): ?>
          <?= stars((float)$tr['avg_r']) ?> <a href="#cover-<?= $tr['cover_number'] ?>"><?= h($tr['title']) ?></a><br>
        <?php endforeach; ?>
        <?php if (empty($top_rated)): ?>
          <i style="color:#996699;">no ratings yet!!</i>
        <?php endif; ?>
      </p>
    </div>
  </td>

  <!-- MAIN CONTENT -->
  <td id="content">

    <div class="content-box">
      <div class="box-title">&#9733; My Covers!! &#9733;</div>
      <?php if ($db_error): ?>
        <div class="db-error-box">&#10007; Database error!! Check db_config.php :(</div>
      <?php endif; ?>
      <p>
        OMG HI!! So I finally got around 2 uploading my guitar covers!! I know the quality is like
        super bad cuz I only have my webcam but WHATEVER lol. Im still learning so plz be nice!!
        <b>Leave a comment and rating below each video!!</b> It means SO much to me :)
      </p>
      <p style="text-align:center; color:#ff0099;"><b>~*~ Be nice or dont comment at all ~*~</b></p>
    </div>

    <?php foreach ($covers as $cover):
      $cid      = (int) $cover['id'];
      $cnum     = (int) $cover['cover_number'];
      $avg      = (float) $cover['avg_rating'];
      $cnt      = (int) $cover['comment_count'];
      $coms     = $comments[$cid] ?? [];
    ?>
    <!-- COVER #<?= $cnum ?> -->
    <div class="content-box" id="cover-<?= $cnum ?>">
      <div class="box-title">&#9733; Cover #<?= $cnum ?> &mdash; &ldquo;<?= h($cover['title']) ?>&rdquo; &mdash; <?= h($cover['artist']) ?> &#9733;</div>

      <table width="100%" cellspacing="4">
        <tr>
          <td width="60%" valign="top">
            <!-- VIDEO PLAYER -->
            <div class="video-container">
              <div class="video-screen" id="screen-<?= $cid ?>">
                <div class="video-placeholder" id="placeholder-<?= $cid ?>">
                  <p>&#9654; click play to watch!!</p>
                  <small><?= h($cover['title']) ?></small>
                </div>
                <video id="vid-<?= $cid ?>"
                       data-cover="<?= $cid ?>"
                       style="display:none; width:100%;"
                       preload="metadata">
                  <source src="<?= h($cover['video_src']) ?>" type="video/mp4">
                  Your browser doesn't support HTML5 video!!
                </video>
              </div>
              <div class="video-controls">
                <button onclick="playVid(<?= $cid ?>)" class="vid-btn">&#9654; PLAY</button>
                <button onclick="pauseVid(<?= $cid ?>)" class="vid-btn">&#9646;&#9646; PAUSE</button>
                <button onclick="stopVid(<?= $cid ?>)" class="vid-btn">&#9632; STOP</button>
                <div class="vid-progress-wrap" id="prog-wrap-<?= $cid ?>" onclick="seekVid(<?= $cid ?>, event)">
                  <div class="vid-progress-bar" id="prog-<?= $cid ?>"></div>
                </div>
                <span class="vid-time" id="time-<?= $cid ?>">0:00</span>
                <span style="font-size:9px; color:#cc99ff; margin-left:4px;">
                  Vol: <input type="range" min="0" max="100" value="80" style="width:46px; accent-color:#cc00cc; vertical-align:middle;"
                              oninput="setVol(<?= $cid ?>, this.value)">
                </span>
              </div>
            </div>
          </td>

          <td class="cover-info">
            <b style="color:#ff99ff;">Song Info:</b><br>
            &#9658; <b>Artist:</b> <?= h($cover['artist']) ?><br>
            &#9658; <b>Album:</b> <?= h($cover['album']) ?><br>
            &#9658; <b>Genre:</b> <?= h($cover['genre']) ?><br>
            &#9658; <b>My Gear:</b> <?= h($cover['gear']) ?><br><br>
            <b style="color:#ff99ff;">My Notes:</b><br>
            <i><?= h($cover['notes']) ?></i><br><br>
            <div class="avg-rating-line" id="avg-display-<?= $cid ?>">
              Rating: <?= stars($avg) ?>
              (<?= $avg > 0 ? number_format($avg, 1) : 'n/a' ?>)
            </div>
            <div class="rating-count" id="rating-count-<?= $cid ?>">
              <?= $cnt ?> rating<?= $cnt !== 1 ? 's' : '' ?>
            </div>
          </td>
        </tr>
      </table>

      <!-- COMMENT SECTION -->
      <div class="comment-section">
        <div class="comment-title">
          &#9658; Comments (<span id="comment-count-<?= $cid ?>"><?= $cnt ?></span>) &#9668;
        </div>

        <div id="comments-<?= $cid ?>" class="comments-list">
          <?php if (empty($coms)): ?>
            <p class="no-comments" id="no-comments-<?= $cid ?>">no comments yet!! be the first 2 comment!!</p>
          <?php else: ?>
            <?php foreach ($coms as $com): ?>
              <div class="comment-entry">
                <span class="comment-name"><?= h($com['name']) ?></span>
                <span class="comment-stars"><?= str_repeat('&#9733;', (int)$com['rating']) . str_repeat('&#9734;', 5 - (int)$com['rating']) ?></span>
                <span class="comment-date"><?= h(date('m/d/y', strtotime($com['created_at']))) ?></span>
                <span class="comment-text"><?= h($com['comment_text']) ?></span>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>

        <!-- COMMENT FORM -->
        <div class="comment-form">
          <b style="font-size:10px;">&#9660; Leave a Comment!!</b><br><br>
          <table cellspacing="3">
            <tr>
              <td style="font-size:10px;">Name:</td>
              <td><input type="text" id="name-<?= $cid ?>" class="retro-input" maxlength="60" placeholder="ur screenname"></td>
            </tr>
            <tr>
              <td style="font-size:10px;">Rating:</td>
              <td>
                <!-- Interactive star picker -->
                <div class="interactive-stars" id="star-pick-<?= $cid ?>"
                     onmouseleave="starHoverOut(<?= $cid ?>)">
                  <?php for ($s = 1; $s <= 5; $s++): ?>
                    <span data-val="<?= $s ?>"
                          onmouseover="starHover(<?= $cid ?>, <?= $s ?>)"
                          onclick="starClick(<?= $cid ?>, <?= $s ?>)">&#9733;</span>
                  <?php endfor; ?>
                </div>
                <span class="star-label" id="star-label-<?= $cid ?>">5 stars - AMAZING!!</span>
                <input type="hidden" id="rating-<?= $cid ?>" value="5">
              </td>
            </tr>
            <tr>
              <td style="font-size:10px;" valign="top">Comment:</td>
              <td>
                <textarea id="comment-<?= $cid ?>" class="retro-textarea" rows="3"
                          placeholder="say sumthing nice!!" maxlength="500"></textarea>
                <div style="font-size:9px; color:#664466; text-align:right;">
                  <span id="char-count-<?= $cid ?>">0</span>/500
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button onclick="submitComment(<?= $cid ?>)" class="submit-btn" id="submit-btn-<?= $cid ?>">
                  &#187; POST COMMENT!!
                </button>
                <div class="comment-feedback comment-success" id="success-<?= $cid ?>">
                  &#10003; ur comment was posted!! thankies!! &hearts;
                </div>
                <div class="comment-feedback comment-error" id="error-<?= $cid ?>"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <?php endforeach; ?>

  </td>

  <!-- RIGHT SIDEBAR -->
  <td id="sidebar-right">

    <div class="sidebar-box">
      <div class="box-title">&#9658; BLINKIES &#9668;</div>
      <div style="text-align:center; line-height:2;">
        <img src="https://external-media.spacehey.net/media/sxfxt8ozYNZxRnbRCXo6EceJqefu9Z4eR9kETccOIWFI=/https://64.media.tumblr.com/02aafb8de5336865a1c6627c78eb3795/72e2590fb9e2f26c-37/s250x400/c49ae6229e7e68680543723f1b1fc1fca0e79ebc.gifv" alt="HP Fan"><br>
        <img src="https://external-media.spacehey.net/media/sG8LtA5e8EoTj_c3ycmD3QFEQfxsgUOP--nXNwx6kTtY=/https://64.media.tumblr.com/5d138942ac75363bda574a2f039e4e9b/72e2590fb9e2f26c-51/s250x400/6ca394878fa61678e63758cb4ba0b1d2e23d3f64.gifv" alt="LP"><br>
        <img src="https://external-media.spacehey.net/media/sJMw7gnXLJaV1XTuCh-B7YbrAqPH6RcmVn5ONAMGpM7I=/https://64.media.tumblr.com/6d12a2374206fe6e8fde0798e3e32894/b4a8996229d50d4f-94/s250x400/3acc1cd69506129cb3b230f1a2d5765969d5869c.gifv" alt="Anime"><br>
      </div>
    </div>

    <div class="sidebar-box">
      <div class="box-title">&#9658; <a href="friends.html">&#9829; Friends</a> &#9668;</div>
      <a href="https://www.instagram.com/axl_sloan_420/">&#9829;axl_sloan</a><br>
      <a href="https://www.instagram.com/zeeny_x3/">&#9829;zeeny_x3</a><br>
      <a href="https://www.instagram.com/khad1ja__ig">&#9829; khad1ja__ig</a><br>
      <a href="https://www.instagram.com/___wonder_of_you___/">&#9829; Banshee</a><br>
    </div>

    <div class="sidebar-box">
      <div class="box-title">&#9658; RECENTLY ADDED &#9668;</div>
      <p style="font-size:10px;">
        <?php foreach ($recent as $i => $r): ?>
          &#9658; <a href="#cover-<?= $r['cover_number'] ?>"><?= h($r['title']) ?></a><br>
          &nbsp;&nbsp;<small><?= $i === 0 ? '<b style="color:#ff0099;">NEW!!</b> ' : '' ?><?= $r['date_added'] ? h(date('m/d/y', strtotime($r['date_added']))) : '' ?></small><br><br>
        <?php endforeach; ?>
      </p>
    </div>

    <div class="sidebar-box">
      <div class="box-title">&#9658; WEBRINGS &#9668;</div>
      <p style="font-size:9px; text-align:center;">
        [<a href="#">&laquo; prev</a>] <a href="#"><b>HP Fansites Ring</b></a> [<a href="#">next &raquo;</a>]<br><br>
        [<a href="#">&laquo; prev</a>] <a href="#"><b>Anime Lovers Ring</b></a> [<a href="#">next &raquo;</a>]
      </p>
    </div>
  </td>

</tr></table>

<div id="footer">
  <p>
    &copy; 2003 xX_KillerJack69_Xx's Website &mdash; All rights reserved!<br>
    <small>Created With Passion, Dedication And Nostalgia</small><br><br>
    <a href="index.html">Home</a> &bull; <a href="aboutme.html">About</a> &bull; <a href="myphotos.html">Photos</a> &bull;
    <a href="poems.html">Poems</a> &bull; <a href="guestbook.php">Guestbook</a> &bull; <a href="contact.html">Contact</a>
  </p>
  <p>
    <img src="https://media1.tenor.com/m/7XD9gEkumN8AAAAd/internet-explorer-free.gif" alt="IE6" style="width:90px;height:30px;">
    <img src="https://preview.redd.it/winamp-logo-v0-mmhrs1evq1qa1.jpg?auto=webp&s=59563ce9d5d3c515d2c27d04d1f03e7df0265a08" alt="Winamp" style="width:90px;height:30px;">
    <img src="https://cyber.dabamos.de/88x31/notepad.gif" alt="Made w Notepad" style="width:90px;height:30px;">
    <img src="https://euroring.neocities.org/images/euroring88x31.png" alt="Go Green" style="width:90px;height:30px;">
  </p>
</div>

<script>
// ============================================================
// VIDEO PLAYER
// ============================================================

function getVid(id) { return document.getElementById('vid-' + id); }

function playVid(id) {
  var v = getVid(id);
  var ph = document.getElementById('placeholder-' + id);
  if (!v) return;
  if (ph) ph.style.display = 'none';
  v.style.display = 'block';
  v.play();
}

function pauseVid(id) {
  var v = getVid(id);
  if (v) v.pause();
}

function stopVid(id) {
  var v = getVid(id);
  var ph = document.getElementById('placeholder-' + id);
  if (!v) return;
  v.pause();
  v.currentTime = 0;
  v.style.display = 'none';
  if (ph) ph.style.display = 'block';
  document.getElementById('prog-' + id).style.width = '0%';
  document.getElementById('time-' + id).textContent = '0:00';
}

function setVol(id, val) {
  var v = getVid(id);
  if (v) v.volume = val / 100;
}

function seekVid(id, evt) {
  var v = getVid(id);
  var wrap = document.getElementById('prog-wrap-' + id);
  if (!v || !v.duration) return;
  var rect = wrap.getBoundingClientRect();
  var pct = (evt.clientX - rect.left) / rect.width;
  v.currentTime = pct * v.duration;
}

function fmtTime(sec) {
  var m = Math.floor(sec / 60);
  var s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// Wire up timeupdate for all videos on page
document.addEventListener('DOMContentLoaded', function() {
  var videos = document.querySelectorAll('video[data-cover]');
  videos.forEach(function(v) {
    var id = v.getAttribute('data-cover');
    v.addEventListener('timeupdate', function() {
      if (!v.duration) return;
      var pct = (v.currentTime / v.duration) * 100;
      var bar = document.getElementById('prog-' + id);
      var time = document.getElementById('time-' + id);
      if (bar)  bar.style.width = pct + '%';
      if (time) time.textContent = fmtTime(v.currentTime) + ' / ' + fmtTime(v.duration);
    });
    v.addEventListener('ended', function() { stopVid(id); });
  });

  // Char counters
  document.querySelectorAll('textarea[id^="comment-"]').forEach(function(ta) {
    var coverId = ta.id.replace('comment-', '');
    var counter = document.getElementById('char-count-' + coverId);
    if (counter) {
      ta.addEventListener('input', function() {
        counter.textContent = ta.value.length;
      });
    }
  });

  // Init star pickers to 5 stars lit
  document.querySelectorAll('.interactive-stars').forEach(function(wrap) {
    var spans = wrap.querySelectorAll('span');
    spans.forEach(function(sp) { sp.classList.add('lit'); });
  });
});

// ============================================================
// INTERACTIVE STAR PICKER
// ============================================================

var starValues = {};

var starLabels = {
  1: '1 star - ew',
  2: '2 stars - meh',
  3: '3 stars - ok i guess',
  4: '4 stars - rly good!',
  5: '5 stars - AMAZING!!'
};

function starHover(coverId, val) {
  var spans = document.querySelectorAll('#star-pick-' + coverId + ' span');
  spans.forEach(function(sp) {
    sp.classList.toggle('lit', parseInt(sp.getAttribute('data-val')) <= val);
  });
  var lbl = document.getElementById('star-label-' + coverId);
  if (lbl) lbl.textContent = starLabels[val] || '';
}

function starHoverOut(coverId) {
  var current = starValues[coverId] || 5;
  starHover(coverId, current);
  var lbl = document.getElementById('star-label-' + coverId);
  if (lbl) lbl.textContent = starLabels[current] || '';
}

function starClick(coverId, val) {
  starValues[coverId] = val;
  document.getElementById('rating-' + coverId).value = val;
  starHover(coverId, val);
}

// ============================================================
// COMMENT SUBMIT (AJAX)
// ============================================================

function starsHtml(rating) {
  var out = '';
  for (var i = 1; i <= 5; i++) {
    out += i <= rating ? '&#9733;' : '&#9734;';
  }
  return out;
}

function submitComment(coverId) {
  var name    = document.getElementById('name-'    + coverId).value.trim();
  var comment = document.getElementById('comment-' + coverId).value.trim();
  var rating  = parseInt(document.getElementById('rating-'  + coverId).value) || 5;

  var successBox = document.getElementById('success-' + coverId);
  var errorBox   = document.getElementById('error-'   + coverId);
  var btn        = document.getElementById('submit-btn-' + coverId);

  successBox.style.display = 'none';
  errorBox.style.display   = 'none';

  if (!name || !comment) {
    errorBox.textContent    = '!! plz fill in ur name and comment!!';
    errorBox.style.display  = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'posting...';

  var body = new URLSearchParams({
    action:   'comment',
    cover_id: coverId,
    name:     name,
    comment:  comment,
    rating:   rating
  });

  fetch('covers_action.php', { method: 'POST', body: body })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      btn.disabled = false;
      btn.textContent = '» POST COMMENT!!';

      if (data.ok) {
        // Remove "no comments" placeholder
        var noCom = document.getElementById('no-comments-' + coverId);
        if (noCom) noCom.remove();

        // Build new comment entry
        var list = document.getElementById('comments-' + coverId);
        var entry = document.createElement('div');
        entry.className = 'comment-entry new-comment';
        var today = new Date();
        var dateStr = (today.getMonth()+1) + '/' + today.getDate() + '/' +
                      String(today.getFullYear()).slice(2);
        entry.innerHTML =
          '<span class="comment-name">' + escHtml(data.comment.name) + '</span>' +
          '<span class="comment-stars">' + starsHtml(parseInt(data.comment.rating)) + '</span>' +
          '<span class="comment-date">' + dateStr + '</span>' +
          '<span class="comment-text">' + escHtml(data.comment.comment_text) + '</span>';
        list.appendChild(entry);
        list.scrollTop = list.scrollHeight;

        // Update counters
        document.getElementById('comment-count-' + coverId).textContent = data.count;
        document.getElementById('rating-count-'  + coverId).textContent =
          data.count + ' rating' + (data.count !== 1 ? 's' : '');

        // Update average stars display
        var avgEl = document.getElementById('avg-display-' + coverId);
        if (avgEl) {
          var avg = data.avg_rating;
          var starsOut = '';
          for (var i = 1; i <= 5; i++) {
            starsOut += i <= Math.round(avg) ? '&#9733;' : '&#9734;';
          }
          avgEl.innerHTML = 'Rating: <span style="color:#ffcc00;">' + starsOut + '</span> (' + avg.toFixed(1) + ')';
        }

        // Clear form
        document.getElementById('name-'    + coverId).value = '';
        document.getElementById('comment-' + coverId).value = '';
        document.getElementById('char-count-' + coverId).textContent = '0';
        starClick(coverId, 5);

        successBox.style.display = 'block';
        setTimeout(function() { successBox.style.display = 'none'; }, 3000);

      } else {
        errorBox.textContent   = '!! ' + (data.error || 'something went wrong!!');
        errorBox.style.display = 'block';
      }
    })
    .catch(function() {
      btn.disabled = false;
      btn.textContent = '» POST COMMENT!!';
      errorBox.textContent   = '!! network error!! check ur connection (>_<)';
      errorBox.style.display = 'block';
    });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}
</script>

</body>
</html>