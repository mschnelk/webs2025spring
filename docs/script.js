function getFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('filter') || 'all';
  }
  
const initialFilter = getFilterFromURL();
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
