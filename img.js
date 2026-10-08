const imageContainer = document.getElementById("imageContainer");
const filterButtons = document.querySelectorAll(".filter");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const images = [   
    {
        id: 1,
        category: "ocean",
        image: "images/ocean (1).jpg"
    },
    {
        id: 2,
        category: "ocean",
        image: "images/ocean (2).jpg"
    },
    {
        id: 3,
        category: "ocean",
        image: "images/ocean (3).jpg"
    },
    {
        id: 4,
        category: "ocean",
        image: "images/ocean (4).jpg"
    },
    {
        id: 5,
        category: "ocean",
        image: "images/ocean (5).jpg"
    },
    {
        id: 6,
        category: "ocean",
        image: "images/ocean (6).jpg"
    },
    {
        id: 7,
        category: "food",
        image: "images/food (1).jpg"
    },
    {
        id: 8,
        category: "food",
        image: "images/food (2).jpg"
    },
    {
        id: 9,
        category: "food",
        image: "images/food (3).jpg"
    },
    {
        id: 10,
        category: "food",
        image: "images/food (4).jpg"
    },
    {
        id: 11,
        category: "food",
        image: "images/food (5).jpg"
    },
    {
        id: 12,
        category: "food",
        image: "images/food (6).jpg"
    },
    {
        id: 13,
        category: "cars",
        image: "images/car (1).jpg"
    },
    {
        id: 14,
        category: "cars",
        image: "images/car (2).jpg"
    },
    {
        id: 15,
        category: "cars",
        image: "images/car (3).jpg"
    },
    {
        id: 16,
        category: "cars",
        image: "images/car (4).jpg"
    },
    {
        id: 17,
        category: "cars",
        image: "images/car (5).jpg"
    },
    {
        id: 18,
        category: "cars",
        image: "images/car (6).jpg"
    },
    {
        id: 19,
        category: "love",
        image: "images/love (1).jpg"
    },
    {
        id: 20,
        category: "love",
        image: "images/love (2).jpg"
    },
    {
        id: 21,
        category: "love",
        image: "images/love (3).jpg"
    },
    {
        id: 22,
        category: "love",
        image: "images/love (4).jpg"
    },
    {
        id: 23,
        category: "love",
        image: "images/love (5).jpg"
    },
    {
        id: 24,
        category: "love",
        image: "images/love (6).jpg"
    },
    {
        id: 25,
        category: "sunset",
        image: "images/sunset (1).jpg"
    },
    {
        id: 26,
        category: "sunset",
        image: "images/sunset (2).jpg"
    },
    {
        id: 27,
        category: "sunset",
        image: "images/sunset (3).jpg"
    },
    {
        id: 28,
        category: "sunset",
        image: "images/sunset (4).jpg"
    },
    {
        id: 29,
        category: "sunset",
        image: "images/sunset (5).jpg"
    },
    {
        id: 30,
        category: "sunset",
        image: "images/sunset (6).jpg"
    }
];

let currentCategory = "all";
let currentPage = 0;
const imagesPerPage = 8;

let displayImagesList = [];


// ===============================
// SHUFFLE
// ===============================

function shuffleImages(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


// ===============================
// FILTER + SHUFFLE
// ===============================

function prepareImages() {

    let filteredImages;


    if (currentCategory === "all") {

        filteredImages = images;

    } else {

        filteredImages = images.filter(function (item) {

            return item.category === currentCategory;

        });
    }


    // Shuffle only once
    displayImagesList = shuffleImages(filteredImages);
}


// ===============================
// DISPLAY
// ===============================

function displayImages() {

    const start = currentPage * imagesPerPage;

    const end = start + imagesPerPage;

    const pageImages =
        displayImagesList.slice(start, end);


    imageContainer.style.opacity = "0";


    setTimeout(function () {

        imageContainer.innerHTML = "";


        pageImages.forEach(function (item) {

            const img = document.createElement("img");

            img.src = item.image;

            img.alt = item.category;

            imageContainer.appendChild(img);

        });


        imageContainer.style.opacity = "1";

        updateButtons(displayImagesList.length);

    }, 200);
}


// ===============================
// BUTTONS
// ===============================

function updateButtons(totalImages) {

    const totalPages =
        Math.ceil(totalImages / imagesPerPage);


    prevButton.disabled = currentPage === 0;

    nextButton.disabled =
        currentPage >= totalPages - 1;
}


// ===============================
// NEXT
// ===============================

nextButton.addEventListener("click", function () {

    const totalPages =
        Math.ceil(displayImagesList.length / imagesPerPage);


    if (currentPage < totalPages - 1) {

        currentPage++;

        displayImages();
    }

});


// ===============================
// PREVIOUS
// ===============================

prevButton.addEventListener("click", function () {

    if (currentPage > 0) {

        currentPage--;

        displayImages();
    }

});


// ===============================
// FILTER
// ===============================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        currentPage = 0;


        // Filter + shuffle
        prepareImages();


        // Display
        displayImages();

    });

});


// ===============================
// FIRST LOAD
// ===============================

prepareImages();

displayImages();