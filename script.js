'use strict';

// Our Services block

let servicesFilter = document.querySelector('.services-filter');
let aList = servicesFilter.querySelectorAll('.services-filter-link');
let descriptionBlocks = document.querySelectorAll('.filter-description');

servicesFilter.addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.classList.contains('services-filter-link')) {
        aList.forEach((element) => {
            element.classList.remove('services-filter-link-active');
        });

        descriptionBlocks.forEach((element) => {
            element.classList.remove('filter-description-active');
        });

        event.target.classList.add('services-filter-link-active');
        let index = Array.from(aList).indexOf(event.target);
        descriptionBlocks[index].classList.add('filter-description-active');
    }
});




// Our Amazing Work block

let portfolioFilter = document.querySelector('.portfolio-filter');
let linkList = portfolioFilter.querySelectorAll('.portfolio-filter-link');
let portfolioItems = document.querySelectorAll('.portfolio-item');
let loadMoreButton = document.querySelector('.load-more-button');

const itemsPerPage = 12;
let startIndex = 0;
let currentCategory = 'all';

function showCategory(category, startIndex, endIndex) {
    portfolioItems.forEach((element, index) => {
        if (index >= startIndex && index < endIndex) {
            if (category === 'all' || element.getAttribute('data-category') === category) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            element.style.display = 'none';
        }
    });
}

function showMore() {
    startIndex += itemsPerPage;
    const visibleItems = document.querySelectorAll(`.portfolio-item[data-category="${currentCategory}"]:not([style*="display: none"])`);
    if (startIndex >= visibleItems.length) {
        loadMoreButton.style.display = 'none';
    }
    showCategory(currentCategory, 0, startIndex + itemsPerPage);
}

portfolioFilter.addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.classList.contains('portfolio-filter-link')) {
        const filter = event.target.getAttribute('data-filter');

        linkList.forEach((element) => {
            element.classList.remove('portfolio-filter-link-active');
        });

        event.target.classList.add('portfolio-filter-link-active');

        currentCategory = filter;
        startIndex = 0;
        const visibleItems = document.querySelectorAll(`.portfolio-item[data-category="${currentCategory}"]`);
        if (visibleItems.length <= itemsPerPage) {
            loadMoreButton.style.display = 'flex';
        } else {
            loadMoreButton.style.display = 'none';
        }
        showCategory(filter, startIndex, startIndex + itemsPerPage);
    }
});

loadMoreButton.addEventListener('click', function () {
    showMore();
});

document.addEventListener('DOMContentLoaded', function () {
    showCategory("all", 0, itemsPerPage);
    loadMoreButton.style.display = 'flex';
});



// What People Say About theHam block

document.addEventListener('DOMContentLoaded', function () {
    const authorPhotos = document.querySelectorAll('.author-photo');
    const reviews = document.querySelectorAll('.review');
    const navigationButtons = document.querySelectorAll('.navigation-button');

    function showReview(authorContent) {
        reviews.forEach((review) => {
            const dataAuthorContent = review.getAttribute('data-author-content');
            if (dataAuthorContent === authorContent) {
                review.classList.add('review-active');
            } else {
                review.classList.remove('review-active');
            }
        });
    }

    function clearCurrentAuthor() {
        authorPhotos.forEach((photo) => {
            photo.classList.remove('current-author');
        });
    }

    authorPhotos.forEach((photo) => {
        photo.addEventListener('click', () => {
            const authorContent = photo.getAttribute('data-author');
            clearCurrentAuthor();
            photo.classList.add('current-author');
            showReview(authorContent);
        });
    });

    navigationButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const currentAuthorPhoto = document.querySelector('.current-author');
            const authorPhotosArray = Array.from(authorPhotos);
            const currentAuthorIndex = authorPhotosArray.indexOf(currentAuthorPhoto);

            let newIndex;
            if (button.id === 'previous') {
                newIndex = (currentAuthorIndex - 1 + authorPhotosArray.length) % authorPhotosArray.length;;
            } else if (button.id === 'next') {
                newIndex = (currentAuthorIndex + 1) % authorPhotosArray.length;
            }

            const newAuthorPhoto = authorPhotosArray[newIndex];
            const authorContent = newAuthorPhoto.getAttribute('data-author');

            currentAuthorPhoto.style.transform = 'scale(1)';
            newAuthorPhoto.style.transform = 'scale(1.2)';

            setTimeout(() => {
                clearCurrentAuthor();
                newAuthorPhoto.classList.add('current-author');
                showReview(authorContent);
            }, 500);
        });
    });

    const initialAuthorContent = authorPhotos[0].getAttribute('data-author');
    showReview(initialAuthorContent);
    authorPhotos[0].classList.add('current-author');
});

const authorPhotos = document.querySelectorAll('.author-photo');
const navigationButtons = document.querySelectorAll('.navigation-button');




