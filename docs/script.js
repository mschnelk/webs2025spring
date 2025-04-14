const flashImages = [
  { url:'flash (47).png', type: ['celestial'] },
  { url:'flash (46).png', type: ['flora-fauna'] },
  { url:'flash (45).png', type: ['flora-fauna'] },
  { url:'flash (44).png', type: ['western', 'flora-fauna'] },
  { url:'flash (43).png', type: ['western', 'flora-fauna'] },
  { url:'flash (42).png', type: ['western', 'flora-fauna'] },
  { url:'flash (41).png', type: ['flora-fauna', 'small'] },
  { url:'flash (40).png', type: ['small', 'flora-fauna'] },
  { url:'flash (39).png', type: ['flora-fauna'] },
  { url:'flash (38).png', type: ['western', 'flora-fauna'] },
  { url:'flash (37).png', type: ['wild-flower'] },
  { url:'flash (36).png', type: ['western', 'flora-fauna', 'celestial'] },
  { url:'flash (35).png', type: ['wild-flower'] },
  { url:'flash (34).png', type: ['wild-flower'] },
  { url:'flash (33).png', type: ['wild-flower'] },
  { url:'flash (32).png', type: ['wild-flower'] },
  { url:'flash (31).png', type: ['wild-flower'] },
  { url:'flash (30).png', type: ['wild-flower'] },
  { url:'flash (29).png', type: ['wild-flower'] },
  { url:'flash (28).png', type: ['wild-flower'] },
  { url:'flash (27).png', type: ['wild-flower'] },
  { url:'flash (26).png', type: ['wild-flower'] },
  { url:'flash (25).png', type: ['wild-flower'] },
  { url:'flash (24).png', type: ['wild-flower'] },
  { url:'flash (23).png', type: ['flora-fauna'] },
  { url:'flash (22).png', type: [] },
  { url:'flash (21).png', type: ['flora-fauna'] },
  { url:'flash (20).png', type: ['flora-fauna', 'celestial'] },
  { url:'flash (19).png', type: ['flora-fauna', 'celestial', 'western'] },
  { url:'flash (18).png', type: ['flora-fauna'] },
  { url:'flash (17).png', type: ['small', 'celestial'] },
  { url:'flash (16).png', type: ['small'] },
  { url:'flash (15).png', type: ['small'] },
  { url:'flash (14).png', type: ['western', 'celestial', 'flora-fauna'] },
  { url:'flash (13).png', type: ['small', 'celestial', 'flora-fauna'] },
  { url:'flash (12).png', type: ['flora-fauna'] },
  { url:'flash (11).png', type: ['flora-fauna'] },
  { url:'flash (10).png', type: ['small', 'flora-fauna'] },
  { url:'flash (9).png', type: ['small', 'celestial'] },
  { url:'flash (8).png', type: ['flora-fauna'] },
  { url:'flash (7).png', type: ['flora-fauna'] },
  { url:'flash (6).png', type: ['flora-fauna', 'western'] },
  { url:'flash (5).png', type: ['flora-fauna'] },
  { url:'flash (4).png', type: ['celestial'] },
  { url:'flash (3).png', type: ['small', 'flora-fauna', 'celestial'] },
  { url:'flash (2).png', type: ['flora-fauna'] },
  { url:'flash (1).png', type: ['small', 'celestial'] }
];

let currentIndex = 0;
const imagesPerLoad = 12;


function getFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('filter') || 'all';
  }
  
let currentFilter = getFilterFromURL();
setFilter(currentFilter);


function getFilteredImages()
{
  if (currentFilter == 'all') return flashImages;
  return flashImages.filter(img => img.type.includes(currentFilter));
}

function createGallery()
{
  // find and clear gallery
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  // create four columns
  let columns = [];
  for (let i = 0; i< 4; i++)
  {
    let column = document.createElement('div');
    column.classList.add("gallery-column");
    columns.push(column);
    gallery.appendChild(column);
  }

  let filteredImages = getFilteredImages();

  for (let i = 0; i <  currentIndex; i++)
  {
    let newImage = document.createElement('img');
    newImage.src = "images/flash/" + filteredImages[i].url;
    newImage.alt = '';
    columns[i%4].appendChild(newImage);
  }

  const loadButton = document.getElementById('load-more');
  if (currentIndex >= filteredImages.length)
  {
    loadButton.style.display = 'none';
  }
  else
  {
    loadButton.style.display = 'block';
  }
}

function loadMoreImages()
{
  let filtered = getFilteredImages();
  currentIndex += imagesPerLoad;
  if (currentIndex > filtered.length) currentIndex = filtered.length;
  createGallery();
}

function setFilter(newFilter)
{
  currentFilter = newFilter;
  currentIndex = 0;

  const btns = document.getElementById('filter').getElementsByTagName('button');
  for (let i = 0; i < btns.length; i++)
  {
    btns[i].classList.remove('current');
    if (btns[i].getAttribute('data-filter') == newFilter) btns[i].classList.add('current');
  }
  loadMoreImages();
}


/*
filterSelection(initialFilter);

function filterSelection(c) {
  var y = document.getElementsByClassName("gallery-column");
  var x = [];
  for (var i = 0; i < y.length; i++)
  {
    x = x.concat(Array.from(y[i].getElementsByTagName('img')));
  }

  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}

// show filtered images
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// hide images that are not selected
function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

const btns = document.getElementById("filter").getElementsByTagName("button");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    const current = document.getElementsByClassName("current");
    if (current[0]) current[0].classList.remove("current");
    this.classList.add("current");
  });

  // set the intial filter to "current" button
  if (btns[i].getAttribute("data-filter") === initialFilter) {
    btns[i].classList.add("current");
  }
}
*/