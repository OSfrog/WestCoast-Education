'use strict';
const mainContainer = document.querySelector('.main-container');
const mainCenterContainer = document.querySelector('.main-center-container');
const cartButtons = document.querySelectorAll('#cartButton');

let arrayOfCourseObjects = [];
function getCourses() {
    fetch('http://localhost:3000/courses')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            mainContainer.innerHTML = '';
            arrayOfCourseObjects = data;
            for (let obj of data) {
                mainContainer.insertAdjacentHTML("beforeend",
                    `
                <div class="card-container" id=${'Id' + arrayOfCourseObjects.length}">
                    <div class="card-image-container">
                    <img src="${obj.image}" />
                    </div>
                    <div  class="card-text-container">
                        <h2>${obj.title}</h2>
                        <p>Category: ${obj.category}</p>
                        <p>${obj.description}</p>
                        <p>Length: ${obj.length} weeks</p>
                        <p>\$${obj.price}</p>
                        </div>
                    <button class="card-btn" id="cartButton${obj.id}">Add To Cart</button>
                </div>
                `);

                AddEventListenerATCButton(obj);
            }
        })
        .catch((err) => {
            mainCenterContainer.innerHTML += `<p>${err}</p>`;
        })
}
getCourses();

function AddEventListenerATCButton(obj) {
    document.querySelector(`#cartButton${obj.id}`).addEventListener('click', (e) => {
        const cardArray = e.target.parentNode.children[1].innerText.split('\n');
        arrayOfCourseObjects.find(function (course) {
            if (course.title === cardArray[0]
                && !ShoppingCart.shoppingCartItems.includes(course)) {

                ShoppingCart.shoppingCartItems.push(course);

                ShoppingCart.createCartItem(course);
            } else if (course.title === cardArray[0] &&
                ShoppingCart.shoppingCartItems.includes(course)) {
                ShoppingCart.shoppingCartItems.push(course);

                document.querySelector(`#courseQuantity${course.id}`).value++;
            }
        });
        ShoppingCart.updateCart();
    });
}
