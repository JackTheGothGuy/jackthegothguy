var STORAGE_KEY = 'jacks_vault_guestbook';
var ENTRIES_PER_PAGE = 5;
var currentPage = 1;

var moodFace = {
  happy: ':)',  excited: '!!',  bored: '-_-',  sad: ':(',
  angry: '>:(', silly: 'XD',    tired: 'x_x',  confused: 'o_O',
  hyper: '^_^', creative: '~~'
};

function loadEntries() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveEntries(entries) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch(e) {}
}

function formatDate(ts) {
  var d = new Date(ts);
  var mo = ('0' + (d.getMonth() + 1)).slice(-2);
  var dy = ('0' + d.getDate()).slice(-2);
  var yr = String(d.getFullYear()).slice(-2);
  var hr = d.getHours();
  var mn = ('0' + d.getMinutes()).slice(-2);
  var ampm = hr >= 12 ? 'PM' : 'AM';
  hr = hr % 12 || 12;
  return mo + '/' + dy + '/' + yr + ' ' + hr + ':' + mn + ' ' + ampm;
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderEntries() {
  var entries = loadEntries();
  var total = entries.length;
  var totalPages = Math.max(1, Math.ceil(total / ENTRIES_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  var sorted = entries.slice().reverse();
  var start = (currentPage - 1) * ENTRIES_PER_PAGE;
  var pageEntries = sorted.slice(start, start + ENTRIES_PER_PAGE);

  document.getElementById('total-count').textContent = total;
  document.getElementById('total-count2').textContent = total;

  var rangeEnd = Math.min(start + ENTRIES_PER_PAGE, total);
  document.getElementById('range-text').textContent =
    total === 0 ? '0-0' : (start + 1) + '-' + rangeEnd;

  var lastEl = document.getElementById('last-signed');
  lastEl.textContent = total > 0 ? sorted[0].name : 'nobody yet...';

  var recentEl = document.getElementById('recent-signers');
  if (total === 0) {
    recentEl.innerHTML = '<i>Nobody yet!!</i>';
  } else {
    var rHtml = '';
    var recent = sorted.slice(0, 5);
    for (var i = 0; i < recent.length; i++) {
      rHtml += '&hearts; ' + escHtml(recent[i].name) + '<br>';
    }
    recentEl.innerHTML = rHtml;
  }

  var container = document.getElementById('entries-container');
  if (total === 0) {
    container.innerHTML =
      '<p style="color:#996699; font-size:11px; text-align:center; font-style:italic;">' +
      'No entries yet!! Be the first to sign!! &hearts;</p>';
  } else {
    var html = '';
    for (var j = 0; j < pageEntries.length; j++) {
      var e = pageEntries[j];
      var face = e.mood && moodFace[e.mood] ? moodFace[e.mood] + ' ' + e.mood : '';
      var locTxt = e.location ? ' &mdash; <span style="color:#aa88aa;">' + escHtml(e.location) + '</span>' : '';
      var aimTxt = e.aim ? ' &bull; <span style="color:#996699; font-size:10px;">AIM: ' + escHtml(e.aim) + '</span>' : '';
      var refTxt = e.referrer ? ' &bull; <span style="color:#886688; font-size:10px;">via ' + escHtml(e.referrer) + '</span>' : '';
      var urlTxt = '';
      if (e.url && e.url.trim()) {
        var safeUrl = escHtml(e.url.trim());
        if (/^https?:\/\//i.test(e.url.trim())) {
          urlTxt = '<div class="entry-url">* <a href="' + safeUrl + '" target="_blank">' + safeUrl + '</a></div>';
        } else {
          urlTxt = '<div class="entry-url">* ' + safeUrl + '</div>';
        }
      }

      html += '<div class="gb-entry">';
      html += '<div class="entry-header">';
      html += '<span><span class="entry-name">&hearts; ' + escHtml(e.name) + '</span>' + locTxt + aimTxt + '</span>';
      html += '<span class="entry-meta">' + formatDate(e.timestamp) + refTxt + '</span>';
      html += '</div>';
      if (face) html += '<div class="entry-mood">mood: ' + escHtml(face) + '</div>';
      html += '<div class="entry-body">' + escHtml(e.message).replace(/\n/g, '<br>') + '</div>';
      html += urlTxt;
      html += '</div>';
    }
    container.innerHTML = html;
  }

  var pagEl = document.getElementById('pagination');
  if (totalPages <= 1) {
    pagEl.innerHTML = '';
  } else {
    var pagHtml = '';
    if (currentPage > 1) {
      pagHtml += '<a href="#" onclick="goPage(' + (currentPage - 1) + '); return false;">&laquo; prev</a>';
    }
    for (var p = 1; p <= totalPages; p++) {
      if (p === currentPage) {
        pagHtml += '<span class="active">' + p + '</span>';
      } else {
        pagHtml += '<a href="#" onclick="goPage(' + p + '); return false;">' + p + '</a>';
      }
    }
    if (currentPage < totalPages) {
      pagHtml += '<a href="#" onclick="goPage(' + (currentPage + 1) + '); return false;">next &raquo;</a>';
    }
    pagEl.innerHTML = pagHtml;
  }
}

function goPage(p) {
  currentPage = p;
  renderEntries();
  document.getElementById('entries-container').scrollIntoView();
}

function addToName(str) {
  var inp = document.getElementById('inp-name');
  inp.value += str;
  inp.focus();
}

function clearForm() {
  document.getElementById('inp-name').value = '';
  document.getElementById('inp-location').value = '';
  document.getElementById('inp-url').value = '';
  document.getElementById('inp-aim').value = '';
  document.getElementById('inp-referrer').selectedIndex = 0;
  document.getElementById('inp-mood').selectedIndex = 0;
  document.getElementById('inp-message').value = '';
  document.getElementById('success-msg').style.display = 'none';
  document.getElementById('error-msg').style.display = 'none';
}

function submitEntry() {
  var name = document.getElementById('inp-name').value.trim();
  var message = document.getElementById('inp-message').value.trim();
  var successEl = document.getElementById('success-msg');
  var errorEl = document.getElementById('error-msg');
  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  if (!name || !message) {
    errorEl.style.display = 'block';
    return;
  }

  var entry = {
    name:      name,
    location:  document.getElementById('inp-location').value.trim(),
    url:       document.getElementById('inp-url').value.trim(),
    aim:       document.getElementById('inp-aim').value.trim(),
    referrer:  document.getElementById('inp-referrer').value,
    mood:      document.getElementById('inp-mood').value,
    message:   message,
    timestamp: Date.now()
  };

  var entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);

  clearForm();
  successEl.style.display = 'block';
  currentPage = 1;
  renderEntries();
}

// Init on load
renderEntries();