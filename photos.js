// ================================================================
// PHOTO DATA
// To swap in real photos, replace the src values below.
// Format: { src: "path/to/image.jpg", caption: "your caption" }
// ================================================================

var photoData = {

  '3d': [
    { src: 'https://placehold.co/110x85/0a0a1a/9999ff?text=3D+Render+1', caption: 'dragon model - bryce 4' },
    { src: 'Resources/Images/renderforestbetter.png', caption: 'forest 3d render' },
    { src: 'https://placehold.co/110x85/1a0a1a/ff99ff?text=3D+Render+3', caption: 'castle scene - took 4hrs 2 render lol' },
    { src: 'Resources/Images/rosalina_render.png', caption: 'street rosalina' },
    { src: 'https://placehold.co/110x85/0a1a0a/99ff99?text=3D+Render+5', caption: 'forest scene w/ mist' }
  ],

  'nature': [
    { src: 'https://placehold.co/110x85/001a00/88ff88?text=Nature+1', caption: 'park near my house' },
    { src: 'https://placehold.co/110x85/001000/44cc44?text=Nature+2', caption: 'sunset from my backyard omg' },
    { src: 'Resources/Images/thelake.png', caption: 'the lake we went to' },
    { src: 'https://placehold.co/110x85/0a0a00/cccc44?text=Nature+4', caption: 'flowers in my moms garden' },
    { src: 'https://placehold.co/110x85/080808/aaaaaa?text=Nature+5', caption: 'full moon april 03 !!' }
  ],

  'music': [
    { src: 'Resources/Images/kurt cobain wannabe.png', caption: 'outdoors grunge' },
    { src: 'https://placehold.co/110x85/0a0022/cc88ff?text=Band+Photo+2', caption: 'evanescence promo shot' },
    { src: 'https://placehold.co/110x85/1a1a00/ffff44?text=Band+Photo+3', caption: 'simple plan - warped tour 02' },
    { src: 'https://placehold.co/110x85/001a00/44ff44?text=Band+Photo+4', caption: 'green day - american idiot era' },
    { src: 'https://placehold.co/110x85/1a000a/ff44aa?text=Band+Photo+5', caption: 'my Favourite LP pic ever!!' }
  ],

  'drawings': [
    { src: 'Resources/Images/drawing.jpg', caption: 'anime version of me i drew - took 2hrs' },
    { src: 'Resources/Images/girldrawing.png', caption: 'girl smoking' }
  ],

  'me': [
    { src: 'Resources/Images/guitarold.png', caption: 'first guitar moments' },
    { src: 'Resources/Images/hotpose.png', caption: 'webcam pic lol hi' },
    { src: 'Resources/Images/coolmelol.png', caption: 'felt cute here' },
    { src: 'Resources/Images/rockstar.png', caption: 'im a rockstar!' },
    { src: 'Resources/Images/mecool.png', caption: 'being weird in my room lol' }
  ],

  'misc': [
    { src: 'https://placehold.co/110x85/0d0d1a/aaaaff?text=Misc+1', caption: 'my winamp skin collection' },
    { src: 'https://placehold.co/110x85/1a0d0d/ffaaaa?text=Misc+2', caption: 'my cd collection part 1' },
    { src: 'https://placehold.co/110x85/0d1a0d/aaffaa?text=Misc+3', caption: 'my desk n computer setup' },
    { src: 'https://placehold.co/110x85/1a1a0d/ffffaa?text=Misc+4', caption: 'stuff from hot topic hehe' },
    { src: 'https://placehold.co/110x85/0d1a1a/aaffff?text=Misc+5', caption: 'random sky pic from the car' }
  ]

};

// ================================================================
// BUILD GRIDS
// ================================================================
var currentCat = '3d';
var lbPhotos = [];
var lbIndex = 0;

function buildGrid(cat) {
  var grid = document.getElementById('grid-' + cat);
  if (!grid || grid.children.length > 0) return; // already built
  var photos = photoData[cat];
  photos.forEach(function(p, i) {
    var tile = document.createElement('div');
    tile.className = 'photo-tile';
    tile.onclick = (function(c, idx){ return function(){ openLightbox(c, idx); }; })(cat, i);

    var img = document.createElement('img');
    img.src = p.src;
    img.alt = p.caption;
    img.width = 110;
    img.height = 85;

    var overlay = document.createElement('div');
    overlay.className = 'photo-overlay';
    overlay.innerHTML = '&#128269; click 2 enlarge';

    var cap = document.createElement('div');
    cap.className = 'photo-caption';
    cap.title = p.caption;
    cap.textContent = p.caption;

    tile.appendChild(img);
    tile.appendChild(overlay);
    tile.appendChild(cap);
    grid.appendChild(tile);
  });
}

// Build all grids on load so lightbox arrays work across categories
Object.keys(photoData).forEach(buildGrid);

// ================================================================
// CATEGORY TABS
// ================================================================
function showCat(cat) {
  // hide all sections
  var sections = document.querySelectorAll('.photo-section');
  sections.forEach(function(s){ s.classList.remove('visible'); });
  // deactivate all tabs
  var tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach(function(t){ t.classList.remove('active'); });
  // show selected
  document.getElementById('sec-' + cat).classList.add('visible');
  document.getElementById('tab-' + cat).classList.add('active');
  currentCat = cat;
}

// ================================================================
// LIGHTBOX
// ================================================================
function openLightbox(cat, idx) {
  lbPhotos = photoData[cat];
  lbIndex = idx;
  renderLB();
  document.getElementById('lightbox').classList.add('open');
}

function renderLB() {
  var p = lbPhotos[lbIndex];
  document.getElementById('lb-img').src = p.src;
  document.getElementById('lb-caption').textContent = p.caption;
  document.getElementById('lb-counter').textContent = (lbIndex + 1) + ' / ' + lbPhotos.length;
}

function lbStep(dir) {
  lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
  renderLB();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function closeLB(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

// keyboard nav
document.onkeydown = function(e) {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.keyCode === 37) lbStep(-1);
  if (e.keyCode === 39) lbStep(1);
  if (e.keyCode === 27) closeLightbox();
};