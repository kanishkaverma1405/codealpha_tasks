
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = document.querySelectorAll('.gallery-item img');
let currentIndex = 0;

// Open Lightbox
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        currentIndex = index;
    });
});

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Close on clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Navigation
function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    lightboxImg.src = images[currentIndex].src;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') closeLightbox();
    }
});
