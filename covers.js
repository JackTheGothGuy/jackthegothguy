// ~~~ Jack's Vault - covers.js ~~~
// handles video player + comments for covers.php
// made by xX_KillerJack69_Xx 2003 !!!

// -------------------------------------------------------
// VIDEO PLAYER FUNCTIONS
// -------------------------------------------------------

function playVid(vidId, screenId) {
  var vid = document.getElementById(vidId);
  var screen = document.getElementById(screenId);
  var placeholder = screen.querySelector('.video-placeholder');

  if (placeholder) placeholder.style.display = 'none';
  vid.style.display = 'block';
  vid.play();
}

function pauseVid(vidId) {
  var vid = document.getElementById(vidId);
  if (vid.paused) {
    vid.play();
  } else {
    vid.pause();
  }
}

function stopVid(vidId, screenId) {
  var vid = document.getElementById(vidId);
  var screen = document.getElementById(screenId);
  var placeholder = screen.querySelector('.video-placeholder');

  vid.pause();
  vid.currentTime = 0;
  vid.style.display = 'none';
  if (placeholder) placeholder.style.display = 'block';
}

function setVol(vidId, val) {
  var vid = document.getElementById(vidId);
  vid.volume = val / 100;
}

// -------------------------------------------------------
// COMMENT SYSTEM
// -------------------------------------------------------

// star strings helper
function starsStr(n) {
  var filled = '&#9733;';
  var empty  = '&#9734;';
  var s = '';
  for (var i = 1; i <= 5; i++) {
    s += (i <= n) ? filled : empty;
  }
  return s;
}

// today's date as MM/DD/YY string
function todayStr() {
  var d = new Date();
  var mm = d.getMonth() + 1;
  var dd = d.getDate();
  var yy = String(d.getFullYear()).slice(-2);
  return (mm < 10 ? '0' : '') + mm + '/' + (dd < 10 ? '0' : '') + dd + '/' + yy;
}

// sanitize so no one does anything funny lol
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function submitComment(coverNum) {
  var nameEl    = document.getElementById('name-'    + coverNum);
  var ratingEl  = document.getElementById('rating-'  + coverNum);
  var commentEl = document.getElementById('comment-' + coverNum);
  var listEl    = document.getElementById('comments-' + coverNum);

  var name    = nameEl.value.trim();
  var rating  = parseInt(ratingEl.value, 10);
  var comment = commentEl.value.trim();

  // validation
  if (!name) {
    alert('omg u forgot 2 put ur name!!');
    nameEl.focus();
    return;
  }
  if (!comment) {
    alert('u have 2 write sumthing!! even just "cool" lol');
    commentEl.focus();
    return;
  }
  if (comment.length < 3) {
    alert('write more than that plz!!');
    commentEl.focus();
    return;
  }

  // remove the "no comments yet" placeholder if present
  var emptyMsg = listEl.querySelector('p');
  if (emptyMsg) listEl.removeChild(emptyMsg);

  // build new comment div
  var entry = document.createElement('div');
  entry.className = 'comment-entry';
  entry.innerHTML =
    '<span class="comment-name">' + escapeHtml(name) + '</span> ' +
    '<span class="comment-stars">' + starsStr(rating) + '</span> ' +
    '<span class="comment-date">' + todayStr() + '</span><br>' +
    '<span class="comment-text">' + escapeHtml(comment) + '</span>';

  listEl.appendChild(entry);

  // scroll newly posted comment into view (nice lil touch!!)
  entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // flash effect - turn it yellow briefly to show it got posted
  entry.style.background = '#330033';
  setTimeout(function() {
    entry.style.background = '';
  }, 800);

  // clear the form
  nameEl.value    = '';
  commentEl.value = '';
  ratingEl.selectedIndex = 0;

  // lil confirmation popup
  var msgs = [
    'ur comment has been posted!! thx so much!! :D',
    'omg thx 4 commenting!! u rock!!',
    'posted!! ur the best visitor ever lol',
    'yay!! thx 4 the feedback!! :)',
    'comment saved!! ur awesome!!'
  ];
  alert(msgs[Math.floor(Math.random() * msgs.length)]);

  // update the comment count in the box title
  updateCommentCount(coverNum, listEl);
}

function updateCommentCount(coverNum, listEl) {
  // find the parent comment-section box-title and update count
  var section = listEl.parentElement;
  var titleEl = section.querySelector('.box-title');
  if (!titleEl) return;
  var entries = listEl.querySelectorAll('.comment-entry');
  var count = entries.length;
  titleEl.innerHTML = '&#9658; Comments (' + count + ') &#9668;';
}

// -------------------------------------------------------
// PAGE LOAD STUFF
// -------------------------------------------------------

window.onload = function() {
  // add a lil visitor counter style message in console (lol why not)
  console.log('~*~ Welcome 2 Jacks Vault Covers Page ~*~');
  console.log('plz leave a comment!! it makes my day :)');

  // highlight current page nav link
  var links = document.querySelectorAll('#sidebar-left a');
  for (var i = 0; i < links.length; i++) {
    if (links[i].href.indexOf('covers.php') !== -1) {
      links[i].style.fontWeight = 'bold';
      links[i].style.color = '#ff00ff';
    }
  }
};