let allImages = [];
let loadedImages = 0;
const imagesPerLoad = 12;

async function fetchImages() {
    const response = await fetch('/get-images');
    allImages = await response.json();
    loadedImages = 0;
    document.getElementById('flash-1').innerHTML = '';
    document.getElementById('flash-2').innerHTML = '';
    document.getElementById('gallery-3').innerHTML = '';
    document.getElementById('gallery-4').innerHTML = '';
    loadMoreImages();
}

function loadMoreImages() {
    const galleries = [
        document.getElementById('flash-1'),
        document.getElementById('flash-2'),
        document.getElementById('flash-3'),
        document.getElementById('flash-4')
    ];

    const remainingImages = allImages.length - loadedImages;
    const imagesToLoad = Math.min(imagesPerLoad, remainingImages);

    for (let i = 0; i < imagesToLoad; i++) {
        const image = allImages[loadedImages + i];
        const imgElement = document.createElement('img');
        imgElement.src = `images/${image}`;
        imgElement.alt = image;
        galleries[(loadedImages + i) % 4].appendChild(imgElement);
    }

    loadedImages += imagesToLoad;

    // Hide the button if all images are loaded
    if (loadedImages >= allImages.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}

document.getElementById('load-more').addEventListener('click', loadMoreImages);

fetchImages();