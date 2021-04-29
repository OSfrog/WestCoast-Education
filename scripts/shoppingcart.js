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


    static removeCartItem(cartItem, e) {
        const cartItemElement = e.target.parentNode.parentNode;

        this.shoppingCartItems = this.shoppingCartItems.filter(item => item !== cartItem);
        cartItemElement.remove();
        this.updateCart();
    }

    static updateCart() {
        this.totalAmountValue = 0;
        this.totalQuantities = 0;

        for (let item of this.shoppingCartItems) {
            this.totalQuantities += item.quantity;
            this.totalAmountValue += item.calcTotalPrice();

            document.querySelector(`#courseQuantity${item.courseId}`).value = item.quantity;
        }

        cartButton.innerText = this.totalQuantities;
        cartTitle.innerText = `Cart (${this.totalQuantities})`;
        totalAmount.innerText = `Total Amount: $${this.totalAmountValue}`;
    }

    static resetCheckoutInfo() {
        checkoutInfoModal.innerHTML = ''
    }

    static createCheckoutInfo() {
        for (let course of this.shoppingCartItems) {
            checkoutInfoModal.insertAdjacentHTML('beforeend',
                `
        <div class="cart-item">
                    <h5 class="product-name">${course.name}</h5>
                  <div class="text">
                    <p class="cart-quantity" id="course-${course.id}">Quantity: ${course.quantity}x</p>
                    <p>Unit Price: $${course.unitPrice}</p>
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

    static createCartItemHTML(cartItem) {
        cartBody.insertAdjacentHTML('beforeend',
            `
                    <div class="cart-item">
                    <div class="cart-item-top">
                    <h5 class="product-name">${cartItem.name}</h5>
                    <span class="close remove-item" id="removeItem${cartItem.courseId}">&times;</span>
                    </div>
                  <div class="img">
                    <img src=${cartItem.imageSrc} alt="">
                  </div>
                  <div class="cart-text">
                    <p class="cart-quantity" >Quantity: </p>
                    <input class="cart-item-quantity" id="courseQuantity${cartItem.courseId}" type="number" min="1" value="${cartItem.quantity}">
                    <p class="product-price">Price: $${cartItem.unitPrice}</p>
                  </div>
                </div>
                    `);

        this.addEventListenerQuantity(cartItem);
        this.addEventListenerRemove(cartItem);
    }

    static addEventListenerRemove(cartItem) {
        const removeButton = document.querySelector(`#removeItem${cartItem.courseId}`);
        removeButton.addEventListener('click', (e) => {
            this.removeCartItem(cartItem, e);
            this.updateCart();
        })
    }

    static addEventListenerQuantity(cartItem) {
        const quantity = document.querySelector(`#courseQuantity${cartItem.courseId}`);
        quantity.addEventListener('change', (e) => {
            const input = e.target;
            if (isNaN(input.value) || input.value <= 0) {
                cartItem.quantity = 1;
            } else {
                cartItem.changeQuantity(parseInt(input.value));
            }
            this.updateCart();
        });
    }

    static addToCart(cartItem) {
        this.shoppingCartItems.push(cartItem);
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


