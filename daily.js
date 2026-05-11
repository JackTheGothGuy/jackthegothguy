// daily.js - Daily Poll Script for Jack's Vault
// Cycles through 14 polls, one per day, using day-of-year % 14
// Votes stored in localStorage per poll index

var POLLS = [
  {
    question: "Whos the BEST member of the Fellowship of the Ring??",
    options: ["Frodo", "Aragorn", "Legolas", "Gandalf", "Samwise"]
  },
  {
    question: "Whats ur Favourite Matrix character??",
    options: ["Neo", "Trinity", "Morpheus", "Agent Smith", "The Oracle"]
  },
  {
    question: "Best Pink Floyd album EVER??",
    options: ["The Wall", "Dark Side of the Moon", "Wish You Were Here", "Animals", "Meddle"]
  },
  {
    question: "Which Hogwarts house would u be in??",
    options: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"]
  },
  {
    question: "Whos the hottest guy in Hollywood rn??",
    options: ["Orlando Bloom", "Johnny Depp", "Elijah Wood", "Tobey Maguire", "Ewan McGregor"]
  },
  {
    question: "Whats ur Favourite AIM away message style??",
    options: ["Lyrics from a song", "Inspirational quote", "Inside joke", "just bbl lol", "A poem I wrote"]
  },
  {
    question: "Best Buffy the Vampire Slayer season??",
    options: ["Season 2", "Season 3", "Season 5", "Season 6", "Season 7"]
  },
  {
    question: "What do u listen 2 music on??",
    options: ["Winamp", "Windows Media Player", "CD player", "My discman", "The radio"]
  },
  {
    question: "Favourite Alice In Chains album??",
    options: ["Dirt", "Facelift", "Jar of Flies", "Alice in Chains (Tripod)", "Sap"]
  },
  {
    question: "How do u usually hang out w/ ur friends??",
    options: ["AIM all night", "At the mall", "Watching movies", "Playing video games", "At band practice"]
  },
  {
    question: "Whats ur Favourite thing 2 do on the internet??",
    options: ["Make/browse fan sites", "Chat on AIM", "Download music", "Browse forums", "Make quizzes on Quizilla"]
  },
  {
    question: "Best Lord of the Rings movie so far??",
    options: ["Fellowship of the Ring", "The Two Towers", "Waiting 4 Return of the King!!"]
  },
  {
    question: "Whats ur Favourite kind of music??",
    options: ["Prog Rock", "Grunge", "Punk", "Nu-Metal", "Classic Rock", "Anime OSTs"]
  },
  {
    question: "Spirited Away or Princess Mononoke - which is better??",
    options: ["Spirited Away for sure!!", "Princess Mononoke!!", "I luv both equally!!", "Havent seen one of them yet"]
  }
];

// Day names for display
var DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Get the poll index for today (0-13) based on day of year
function getDayOfYear(date) {
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = date - start;
  var oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getTodayPollIndex() {
  var now = new Date();
  return getDayOfYear(now) % POLLS.length;
}

// LocalStorage helpers
function getStorageKey(pollIndex) {
  return 'jacks_vault_poll_' + pollIndex + '_votes';
}

function getVotedKey(pollIndex) {
  return 'jacks_vault_poll_' + pollIndex + '_voted';
}

// Get saved votes for a poll, returns array of counts
function getSavedVotes(pollIndex, numOptions) {
  var raw = localStorage.getItem(getStorageKey(pollIndex));
  if (raw) {
    try {
      var arr = JSON.parse(raw);
      if (arr.length === numOptions) return arr;
    } catch(e) {}
  }
  // Seed with some fake votes so it doesnt look empty
  var fake = [];
  for (var i = 0; i < numOptions; i++) {
    fake.push(Math.floor(Math.random() * 18) + 2);
  }
  localStorage.setItem(getStorageKey(pollIndex), JSON.stringify(fake));
  return fake;
}

function saveVotes(pollIndex, votesArr) {
  localStorage.setItem(getStorageKey(pollIndex), JSON.stringify(votesArr));
}

function hasVotedToday(pollIndex) {
  return localStorage.getItem(getVotedKey(pollIndex)) === '1';
}

function markVoted(pollIndex) {
  localStorage.setItem(getVotedKey(pollIndex), '1');
}

// Format a date nicely like the site
function formatDate(date) {
  return MONTH_NAMES[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// Render the poll options (radio buttons or results bars)
function renderOptions(pollIndex, showResults) {
  var poll = POLLS[pollIndex];
  var votes = getSavedVotes(pollIndex, poll.options.length);
  var total = 0;
  for (var i = 0; i < votes.length; i++) total += votes[i];

  var wrap = document.getElementById('poll-options-wrap');
  wrap.innerHTML = '';

  for (var j = 0; j < poll.options.length; j++) {
    var pct = total > 0 ? Math.round((votes[j] / total) * 100) : 0;

    var row = document.createElement('div');
    row.className = 'poll-option-row';

    if (!showResults) {
      // Show radio button
      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'poll_choice';
      radio.value = j;
      radio.id = 'opt_' + j;
      var lbl = document.createElement('label');
      lbl.htmlFor = 'opt_' + j;
      lbl.innerHTML = ' &bull; ' + poll.options[j];
      row.appendChild(radio);
      row.appendChild(lbl);
    } else {
      // Show result bar
      var optLabel = document.createElement('div');
      optLabel.style.color = '#ddaaff';
      optLabel.style.marginBottom = '1px';
      optLabel.innerHTML = '&bull; ' + poll.options[j];
      row.appendChild(optLabel);

      var barWrap = document.createElement('div');
      barWrap.className = 'poll-bar-wrap';
      barWrap.style.display = 'block';

      var barFill = document.createElement('div');
      barFill.className = 'poll-bar-fill';
      barFill.style.width = pct + '%';
      barWrap.appendChild(barFill);
      row.appendChild(barWrap);

      var barLbl = document.createElement('div');
      barLbl.className = 'poll-bar-label';
      barLbl.style.display = 'block';
      barLbl.innerHTML = votes[j] + ' votes (' + pct + '%)';
      row.appendChild(barLbl);
    }

    wrap.appendChild(row);
  }

  if (showResults && total > 0) {
    document.getElementById('poll-total').innerHTML = total + ' total votes so far!!';
  }
}

// Called when user clicks VOTE
function submitVote() {
  var pollIndex = getTodayPollIndex();

  if (hasVotedToday(pollIndex)) {
    alert("u already voted 2day!! come back tomorrow 4 a new poll :)");
    return;
  }

  var chosen = document.querySelector('input[name="poll_choice"]:checked');
  if (!chosen) {
    alert("pick an option first lol!!");
    return;
  }

  var poll = POLLS[pollIndex];
  var votes = getSavedVotes(pollIndex, poll.options.length);
  votes[parseInt(chosen.value)] += 1;
  saveVotes(pollIndex, votes);
  markVoted(pollIndex);

  // Show results
  renderOptions(pollIndex, true);
  document.getElementById('poll-submit-btn').style.display = 'none';
  var msg = document.getElementById('poll-voted-msg');
  msg.style.display = 'block';
  updateSidebarStats();
}

// Build the archive of past polls (previous 6 days)
function buildArchive() {
  var now = new Date();
  var archiveDiv = document.getElementById('poll-archive');
  archiveDiv.innerHTML = '';

  var todayIdx = getTodayPollIndex();

  for (var d = 1; d <= 6; d++) {
    var pastDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - d);
    var pastDoy = getDayOfYear(pastDate);
    var pastPollIdx = pastDoy % POLLS.length;
    var pastPoll = POLLS[pastPollIdx];
    var pastVotes = getSavedVotes(pastPollIdx, pastPoll.options.length);

    // Find winner
    var maxV = 0, winnerIdx = 0;
    for (var i = 0; i < pastVotes.length; i++) {
      if (pastVotes[i] > maxV) { maxV = pastVotes[i]; winnerIdx = i; }
    }
    var total = 0;
    for (var k = 0; k < pastVotes.length; k++) total += pastVotes[k];
    var winPct = total > 0 ? Math.round((maxV / total) * 100) : 0;

    var item = document.createElement('div');
    item.className = 'poll-archive-item';
    item.innerHTML =
      '<b style="color:#cc99ff;">' + formatDate(pastDate) + '</b><br>' +
      '<i style="color:#ddaaff;">' + pastPoll.question + '</i><br>' +
      'Winner: <span class="poll-archive-winner">' + pastPoll.options[winnerIdx] + '</span>' +
      ' &mdash; ' + winPct + '% (' + total + ' votes)';
    archiveDiv.appendChild(item);
  }

  if (archiveDiv.innerHTML === '') {
    archiveDiv.innerHTML = '<span style="color:#996699; font-size:10px;">No past polls yet!! check back tomorrow!!</span>';
  }
}

// Update the sidebar vote stats widget
function updateSidebarStats() {
  var totalAllTime = 0;
  var topAnswer = '';
  var topCount = 0;

  for (var p = 0; p < POLLS.length; p++) {
    var poll = POLLS[p];
    var votes = getSavedVotes(p, poll.options.length);
    for (var i = 0; i < votes.length; i++) {
      totalAllTime += votes[i];
      if (votes[i] > topCount) {
        topCount = votes[i];
        topAnswer = poll.options[i];
      }
    }
  }

  var tvEl = document.getElementById('sidebar-total-votes');
  var taEl = document.getElementById('sidebar-top-answer');
  if (tvEl) tvEl.innerHTML = totalAllTime;
  if (taEl) taEl.innerHTML = topAnswer ? ('"' + topAnswer + '"') : 'N/A';
}

// Main init
function initPoll() {
  var now = new Date();
  var pollIndex = getTodayPollIndex();
  var poll = POLLS[pollIndex];

  // Set day label
  document.getElementById('poll-day-label').innerHTML =
    DAY_NAMES[now.getDay()] + ', ' + formatDate(now) +
    ' &mdash; Poll #' + (pollIndex + 1) + ' of ' + POLLS.length;

  // Set question
  document.getElementById('poll-question').innerHTML = poll.question;

  var alreadyVoted = hasVotedToday(pollIndex);

  if (alreadyVoted) {
    renderOptions(pollIndex, true);
    document.getElementById('poll-submit-btn').style.display = 'none';
    var msg = document.getElementById('poll-voted-msg');
    msg.style.display = 'block';
    msg.innerHTML = '&#10003; u already voted 2day!! come back tomorrow!!';
  } else {
    renderOptions(pollIndex, false);
  }

  buildArchive();
  updateSidebarStats();
}

// Run on load
initPoll();