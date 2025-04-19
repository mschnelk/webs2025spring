
  
  
  
  let currentIndex = 0;
  const imagesPerLoad = 12;
  let currentFilter = 'all';

  window.onload = function() {
    setFilter(getFilterFromURL());
  };
  
  
  function getFilterFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('filter') || 'all';
    }
  
  
  function getFilteredImages()
  {
    if (currentFilter == 'all') return images;
    return images.filter(img => img.type.includes(currentFilter));
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
      newImage.src = "../images/" + filteredImages[i].url;
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
  
  
  