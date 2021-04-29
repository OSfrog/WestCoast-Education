'use strict';

const checkoutModal = document.querySelector('#checkoutModal');
const checkoutInfoModal = document.querySelector('#checkoutInfoModal');
const checkoutTotalModal = document.querySelector('#checkoutTotalModal');
const checkoutCloseButton = document.querySelector('#checkoutCloseModal');
const cartButton = document.querySelector('#cart');
const cartSideBar = document.querySelector('.cart-sidebar')
const cartBody = document.querySelector('.cart-body');
const cartTitle = document.querySelector('#cartTitleText');
const cartCloseButton = document.querySelector('#cartClose')
const totalAmount = document.querySelector('#totalAmount');
const checkoutButton = document.querySelector('#checkoutButton');


class ShoppingCart {

    static shoppingCartItems = [];
    static totalAmountValue = 0;
    static totalQuantities = 0;


    static removeCartItem(course, e) {
        const courseObject = (arrayOfCourseObjects.find(c => c === course));
        const cartItemElement = e.target.parentNode.parentNode;

        this.shoppingCartItems = this.shoppingCartItems.filter(course => course !== courseObject);
        cartItemElement.remove();
        this.updateCart();
    }

    static updateCart() {
        const cartText = document.querySelectorAll('.cart-text');
        this.totalQuantities = 0;
        this.totalAmountValue = 0;
        for (let item of cartText) {
            const quantity = parseInt(item.children[1].value);
            const price = parseInt(item.children[2].innerText.substr(8));

            this.totalQuantities += quantity;
            this.totalAmountValue += price * quantity
        }

        cartButton.innerText = this.totalQuantities;
        cartTitle.innerText = `Cart (${this.totalQuantities})`;
        totalAmount.innerText = `Total Amount: $${this.totalAmountValue}`;
    }

    static resetCheckoutInfo() {
        checkoutInfoModal.innerHTML = ''
    }

    static createCheckoutInfo() {
        const filteredItems = arrayOfCourseObjects.filter(x => this.shoppingCartItems.includes(x));

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

        checkoutTotalModal.innerText = `Total: $${this.totalAmountValue}`;
    }

    static closeCartSideBar() {
        cartSideBar.style.right = "-25rem";
    }

    static resetCart() {
        this.shoppingCartItems = [];
        this.totalAmountValue = 0;
        cartBody.innerHTML = '';
        totalAmount.innerHTML = '';
        cartButton.innerHTML = `${this.shoppingCartItems.length}`;
        cartTitle.innerHTML = 'Cart (0)';
    }

    static createCartItem(course) {
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

        this.addEventListenerQuantity(course);
        this.addEventListenerRemove(course);
    }

    static addEventListenerRemove(course) {
        const removeButton = document.querySelector(`#removeItem${course.id}`);
        removeButton.addEventListener('click', (e) => {
            this.removeCartItem(course, e);
            this.updateCart();
        })
    }

    static addEventListenerQuantity(course) {
        const quantity = document.querySelector(`#courseQuantity${course.id}`);
        quantity.addEventListener('change', (e) => {
            const input = e.target;
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            this.updateCart();
        });
    }

    static addToCart(course){
        this.shoppingCartItems.push(course);
    }

}

checkoutCloseButton.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');

    ShoppingCart.resetCheckoutInfo();
});

cartButton.addEventListener('click', () => {
    cartSideBar.style.right = "0";
})

cartCloseButton.addEventListener('click', () => {
    ShoppingCart.closeCartSideBar();
})

checkoutButton.addEventListener('click', () => {
    if (ShoppingCart.shoppingCartItems.length < 1) return;

    checkoutModal.classList.toggle('hidden');

    ShoppingCart.createCheckoutInfo();
    ShoppingCart.closeCartSideBar();
    ShoppingCart.resetCart();
})


