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
                <div class="card-container">
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
        const courseTitle = e.target.parentNode.children[1].innerText.split('\n')[0];
        let selectedCourse = {}
        arrayOfCourseObjects.find(function (course) {
            if (course.title === courseTitle) {
                selectedCourse = course;
            }
        });

        const cartItem = ShoppingCart.shoppingCartItems.find(course => course.name === courseTitle);

        if (cartItem !== undefined){
            cartItem.addQuantity();

        } else {
            const cartItem = new CartItem(selectedCourse)
            ShoppingCart.addToCart(cartItem);
            ShoppingCart.createCartItemHTML(cartItem);
        }
        ShoppingCart.updateCart();
    });
}

