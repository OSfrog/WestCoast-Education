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
const shoppingCartValues = [];

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

//Get the parent of the clicked element
document.addEventListener('click', (e) => {
    if(e.target.id === 'cartButton') {
        console.log(e.target.parentNode.children[1].innerText);
    }
    if(e.target.id === 'cartButton') {
        const banan = e.target.parentNode.children[1].innerText.split('\n');
        const find = arrayOfCourseObject.find(function (post, index){
            if (post.title === banan[0]) {

                shoppingCartValues.push(post);
            }
    })
    }
   console.log(shoppingCartValues[0]);
})

const cartButton = document.getElementById('#cartButton');
console.log(cartButton);

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