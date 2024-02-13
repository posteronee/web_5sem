window.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.querySelector('.image-container');
    const preloader = document.querySelector('.preloader');
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');

    let currentImageIndex = 0;
    let imageStack = [];

    initGallery();

    async function initGallery() {
        localStorage.clear();
        const cachedImages = localStorage.getItem('cachedImages');
        if (cachedImages) {
            imageStack = JSON.parse(cachedImages);
        } else {
            await updateGallery();
        }

        showImageFromStack();
    }

    nextButton.addEventListener('click', async function () {
        await showNextImages();
    });

    prevButton.addEventListener('click', function () {
        showPrevImage();
    });

    async function showNextImages() {
        await updateGallery(currentImageIndex + 1);
        currentImageIndex = currentImageIndex + 1 >= imageStack.length ? 0 : currentImageIndex + 1;
        showImageFromStack();
    }

    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = imageStack.length - 1;
        }
        showImageFromStack();
    }

    async function updateGallery(index = 0) {
        preloader.style.display = 'block';

        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=cherry&per_page=10&size=medium2&orientation=landscape&page=${Math.random() * 10}&random=${Math.random()}`, {
                method: 'GET',
                headers: {
                    'Authorization': '1S9ufDXzal35Ul5QjpKZUeNYUJiFxzahbUPSvYDAJr9EyQJ3Y0FQlvxc'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            addImagesToContainer(responseData);
        } catch (err) {
            showErrorMessage(err);
        } finally {
            preloader.style.display = 'none';
        }
    }

    function addImagesToContainer(response) {
        if (response.photos && response.photos.length > 0) {
            const newImages = response.photos.map(photo => photo.src.landscape);
            imageStack = [...imageStack, ...newImages];
            saveImagesToLocalStorage();
        }
    }

    function saveImagesToLocalStorage() {
        localStorage.setItem('cachedImages', JSON.stringify(imageStack));
    }

    function showImageFromStack() {
        let currentImage = imageStack[currentImageIndex];
        let imagePair = document.createElement('img');
        imagePair.classList.add('image-pair');
        imagePair.alt = 'img';
        imagePair.src = currentImage;

        imageContainer.innerHTML = '';
        imageContainer.appendChild(imagePair);

        updateButtons();
    }

    function updateButtons() {
        nextButton.disabled = false;
        prevButton.disabled = false;
    }

    function showErrorMessage(err) {
        console.error(err);
    }
});
