'use strict';

const addCoursesButton = document.querySelector('#addCourse');
const addCoursesModal = document.querySelector('#addCourseModal');
const closeButton = document.querySelector('.close');
const numberInput = document.querySelector('#numberInput');
const titleInput = document.querySelector('#titleInput');
const categoryInput = document.querySelector('#categoryInput');
const descriptionInput = document.querySelector('#descriptionInput');
const lengthInput = document.querySelector('#lengthInput');
const priceInput = document.querySelector('#priceInput');
const imageInput = document.querySelector('#imageInput');
const saveButton = document.querySelector('#save');

addCoursesButton.addEventListener('click', () => {
    addCoursesModal.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
    addCoursesModal.classList.add('hidden');
});

saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    AddCourse()
    .then(data => {
        console.log(data);
    });
})

async function AddCourse() {
    
    
    const course = {
        courseNumber: numberInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
      length: lengthInput.value,
      category: categoryInput.value,
      image : imageInput.value,
      price: priceInput.value
    }

    const response = await fetch('http://localhost:3000/courses', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });
    
      if(!response.ok) throw new Error(response.statusText);
    
      return response.json();
}