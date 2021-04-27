'use strict';

const checkoutModal = document.querySelector('#checkoutModal');
const checkoutInfoModal = document.querySelector('#checkoutInfoModal');
const checkoutTotalModal = document.querySelector('#checkoutTotalModal');
const courseCloseButton = document.querySelector('#courseCloseModal');
const checkoutCloseButton = document.querySelector('#checkoutCloseModal');
const cartButton = document.querySelector('#cart');
const cartSideBar = document.querySelector('.cart-sidebar')
const cartBody = document.querySelector('.cart-body');
const cartTitle = document.querySelector('#cartTitleText');
const cartCloseButton = document.querySelector('#cartClose')
const totalAmount = document.querySelector('#totalAmount');
const checkoutButton = document.querySelector('#checkoutButton');
let shoppingCartItems = [];
let totalAmountValue = 0;
let totalQuantities = 0;

checkoutCloseButton.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');

    resetCheckoutInfo();
});

courseCloseButton.addEventListener('click', () => {
    addCourseModal.classList.add('hidden');
});

cartButton.addEventListener('click', () => {
    cartSideBar.style.right = "0";
})

cartCloseButton.addEventListener('click', () => {
    closeCartSideBar();
})

checkoutButton.addEventListener('click', () => {
    if (shoppingCartItems.length < 1) return;

    checkoutModal.classList.toggle('hidden');

    createCheckoutInfo();
    closeCartSideBar();
    ResetCart();
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        addCourseModal.classList.add('hidden');
    }
})

function removeCartItem(course, e) {
    const courseObject = (arrayOfCourseObjects.find(c => c === course));
    const cartItemElement = e.target.parentNode.parentNode;

    shoppingCartItems = shoppingCartItems.filter(course => course !== courseObject);
    cartItemElement.remove();
    updateCart();
}

function updateCart() {
    const cartText = document.querySelectorAll('.cart-text');
    totalQuantities = 0;
    totalAmountValue = 0;
    for (let item of cartText) {
        const quantity = parseInt(item.children[1].value);
        const price = parseInt(item.children[2].innerText.substr(8));
        
        totalQuantities += quantity;
        totalAmountValue += price * quantity
    }

    cartButton.innerText = totalQuantities;
    cartTitle.innerText = `Cart (${totalQuantities})`;
    totalAmount.innerText = `Total Amount: $${totalAmountValue}`;
}

function resetCheckoutInfo() {
    checkoutInfoModal.innerHTML = ''
}

function createCheckoutInfo() {
    const filteredItems = arrayOfCourseObjects.filter(x => shoppingCartItems.includes(x));

    for (let course of filteredItems) {
        const quantity = document.querySelector(`#courseQuantity${course.id}`).value;
        checkoutInfoModal.insertAdjacentHTML('beforeend',
            `
    <div class="cart-item">
                <h5 class="product-name">${course.title}</h5>
              <div class="text">
                <p class="cart-quantity" id="course-${course.id}">Quantity: ${quantity}x</p>
                <p>Price: $${course.price}</p>
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
                <div class="cart-item-top">
                <h5 class="product-name">${course.title}</h5>
                <span class="close remove-item" id="removeItem${course.id}">&times;</span>
                </div>
              <div class="img">
                <img src=${course.image} alt="">
              </div>
              <div class="cart-text">
                <p class="cart-quantity" >Quantity: </p>
                <input class="cart-item-quantity" id="courseQuantity${course.id}" type="number" min="1" value="1">
                <p class="product-price">Price: $${course.price}</p>
              </div>
            </div>
                `);

                addEventListenerQuantity(course);
                addEventListenerRemove(course);
}

function addEventListenerRemove(course) {
    const removeButton = document.querySelector(`#removeItem${course.id}`);
    removeButton.addEventListener('click', (e) => {
        removeCartItem(course, e);
        updateCart();
    })
}

function addEventListenerQuantity(course) {
    const quantity = document.querySelector(`#courseQuantity${course.id}`);
    quantity.addEventListener('change', (e) => {
        const input = e.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCart();
    });
}
