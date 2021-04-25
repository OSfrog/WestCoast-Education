'use strict';

const addCourseButton = document.querySelector('#addCourse');
const addCourseModal = document.querySelector('#addCourseModal');
const checkoutModal = document.querySelector('#checkoutModal');
const checkoutInfoModal = document.querySelector('#checkoutInfoModal');
const checkoutTotalModal = document.querySelector('#checkoutTotalModal');
const courseCloseButton = document.querySelector('#courseCloseModal');
const checkoutCloseButton = document.querySelector('#checkoutCloseModal');
const numberInput = document.querySelector('#numberInput');
const titleInput = document.querySelector('#titleInput');
const categoryInput = document.querySelector('#categoryInput');
const descriptionInput = document.querySelector('#descriptionInput');
const lengthInput = document.querySelector('#lengthInput');
const priceInput = document.querySelector('#priceInput');
const imageInput = document.querySelector('#imageInput');
const saveButton = document.querySelector('#save');
const cartButton = document.querySelector('#cart');
const cartSideBar = document.querySelector('.cart-sidebar')
const cartBody = document.querySelector('.cart-body');
const cartTitle = document.querySelector('#cartTitleText');
const cartCloseButton = document.querySelector('#cartClose')
const totalAmount = document.querySelector('#totalAmount');
const checkoutButton = document.querySelector('#checkoutButton');
let shoppingCartItems = [];
let totalAmountValue = 0;

addCourseButton.addEventListener('click', () => {
    addCourseModal.classList.remove('hidden');
});

checkoutCloseButton.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');

    resetCheckoutInfo();
});

courseCloseButton.addEventListener('click', () => {
    addCourseModal.classList.add('hidden');
});

saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    AddCourse()
        .then(data => {
            // console.log(data);
        });
})

cartButton.addEventListener('click', () => {
    cartSideBar.style.right = "0";
})

cartCloseButton.addEventListener('click', () => {
    closeCartSideBar();
})

checkoutButton.addEventListener('click', () => {
    if(shoppingCartItems.length < 1) return;

    checkoutModal.classList.toggle('hidden');

    createCheckoutInfo();
    closeCartSideBar();
    ResetCart();
})

//Get the parent of the clicked element
document.addEventListener('click', (e) => {
    if (e.target.id === 'cartButton') {
        const cardArray = e.target.parentNode.children[1].innerText.split('\n');
        arrayOfCourseObjects.find(function (course) {
            if (course.title === cardArray[0] 
                && !shoppingCartItems.includes(course)) {

                shoppingCartItems.push(course);
                
                createCartItem(course);
                totalAmountValue += parseInt(course.price);
            } else if (course.title === cardArray[0] &&
                shoppingCartItems.includes(course)) {
                shoppingCartItems.push(course);
                
                document.querySelector(`#course-${course.id}`).innerText = 
                `${shoppingCartItems.filter(x => x === course).length}x`
                totalAmountValue += parseInt(course.price);
            }
        })
        cartButton.innerText = `${shoppingCartItems.length}`
        cartTitle.innerText = `Cart (${shoppingCartItems.length})`
        totalAmount.innerText = `Total Amount: $${totalAmountValue}`
        console.log(shoppingCartItems);
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        addCourseModal.classList.add('hidden');
    }
})

function resetCheckoutInfo() {
    checkoutInfoModal.innerHTML = ''
}

function createCheckoutInfo() {
    const filteredItems = arrayOfCourseObjects.filter(x => shoppingCartItems.includes(x));

    for (let course of filteredItems) {
        checkoutInfoModal.insertAdjacentHTML('beforeend',
            `
    <div class="cart-item">
                <h5 class="product-name">${course.title}</h5>
              <div class="text">
                <span class="cart-quantity" id="course-${course.id}">${shoppingCartItems.filter(x => x === course).length}x <b>$${course.price}</b></span>
              </div>
            </div>
    `);
    };

    checkoutTotalModal.innerText = `Total: $${totalAmountValue}`;
}

function closeCartSideBar() {
    cartSideBar.style.right = "-25rem";
}

function ResetCart() {
    shoppingCartItems = [];
    totalAmountValue = 0;
    cartBody.innerHTML = '';
    totalAmount.innerHTML = '';
    cartButton.innerHTML = `${shoppingCartItems.length}`;
    cartTitle.innerHTML = 'Cart (0)';
}

function createCartItem(course) {
    cartBody.insertAdjacentHTML('beforeend',
        `
                <div class="cart-item">
                <h5 class="product-name">${course.title}<span class="close" id="removeItem${course.id}">&times;</span></h5>
              <div class="img">
                <img src=${course.image} alt="">
              </div>
              <div class="text">
                <span class="cart-quantity" id="course-${course.id}">${shoppingCartItems.filter(x => x === course).length}x</span>
                <h5 class="product-price">$${course.price}</h5>
              </div>
            </div>
                `);
}

async function AddCourse() {

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
            if(course[`${prop}`] === '') {
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
