'use strict';

const addCourseButton = document.querySelector('#addCourse');
const addCourseModal = document.querySelector('#addCourseModal');
const courseCloseButton = document.querySelector('#courseCloseModal');
const saveButton = document.querySelector('#save');
const numberInput = document.querySelector('#numberInput');
const titleInput = document.querySelector('#titleInput');
const categoryInput = document.querySelector('#categoryInput');
const descriptionInput = document.querySelector('#descriptionInput');
const lengthInput = document.querySelector('#lengthInput');
const priceInput = document.querySelector('#priceInput');
const imageInput = document.querySelector('#imageInput');

addCourseButton.addEventListener('click', () => {
    addCourseModal.classList.remove('hidden');
});

courseCloseButton.addEventListener('click', () => {
    addCourseModal.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        addCourseModal.classList.add('hidden');
    }
})

saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    addCourse();
});

async function addCourse() {

    const course = {
        courseNumber: numberInput.value,
        title: titleInput.value,
        description: descriptionInput.value,
        length: lengthInput.value,
        category: categoryInput.value,
        image: imageInput.value,
        price: priceInput.value
    }

    for (let prop in course) {
        if (course[`${prop}`] === '') {
            alert('Fill out all fields before saving!');
            return;
        };
    }

    const response = await fetch('http://localhost:3000/courses', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
}
