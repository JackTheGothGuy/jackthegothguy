// portfolio.js - Jack's Portfolio Scripts
// last edited 04/21/2003 lol

// visitor counter (fake but classic!!)
var fakeVisitorNum = Math.floor(Math.random() * 58) + 1;
var totalCount = 42 + fakeVisitorNum;
var padded = String(totalCount).padStart(6, '0');
if (document.getElementById('visitor-count')) {
  document.getElementById('visitor-count').innerHTML = padded;
}
if (document.getElementById('visitor-num')) {
  document.getElementById('visitor-num').innerHTML = '#' + totalCount;
}

// rotating quotes for sidebar
var quotes = [
  { text: '"Programs must be written for people to read, and only incidentally for machines to execute."', author: '- Abelson &amp; Sussman' },
  { text: '"Talk is cheap. Show me the code."', author: '- Linus Torvalds' },
  { text: '"First, solve the problem. Then, write the code."', author: '- John Johnson' },
  { text: '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."', author: '- Martin Fowler' },
  { text: '"The best way to predict the future is to implement it."', author: '- David Heinemeier Hansson' }
];

// pick a quote based on the day so it changes daily
var today = new Date();
var dayIndex = today.getDate() % quotes.length;
var q = quotes[dayIndex];
if (document.getElementById('daily-quote')) {
  document.getElementById('daily-quote').innerHTML = q.text;
  // find the author element right after the quote and update it
  var quoteEl = document.getElementById('daily-quote');
  if (quoteEl.nextSibling && quoteEl.nextSibling.nextSibling) {
    quoteEl.nextSibling.nextSibling.innerHTML = q.author;
  }
}

// status bar message (classic 2000s move lol)
window.status = '~*~ Welcome 2 Jack\'s Portfolio ~*~ Thanks 4 visiting!! ~*~';

// alert on first visit (annoying but authentic lol)
if (!document.cookie.match('visited=yes')) {
  alert('Heyy!! Welcome to my portfolio!! :D\nPlz check out my projects section and contact me if u wanna collab or have internship opportunities!!');
  document.cookie = 'visited=yes; path=/';
}