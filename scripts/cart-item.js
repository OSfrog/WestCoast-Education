'use strict';

class CartItem {
    constructor(course){
        this.course = course;
        this.name = course.title;
        this.unitPrice = course.price;
        this.imageSrc = course.image;
        this.quantity = 1;
        this.totalPrice = 0;
    }

    changeQuantity(value){
        value > 0 ? this.quantity = value : this.quantity = 1;
    }

    calcTotalPrice(){
        this.totalPrice = this.quantity * this.unitPrice;
    }
}