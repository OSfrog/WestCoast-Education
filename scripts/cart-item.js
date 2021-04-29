'use strict';

class CartItem {
    constructor(course){
        this.courseId = course.id;
        this.name = course.title;
        this.unitPrice = parseInt(course.price);
        this.imageSrc = course.image;
        this.quantity = 1;
        this.totalPrice = 0;
    }

    changeQuantity(value){
        value > 0 ? this.quantity = value : this.quantity = 1;
    }

    addQuantity(){
        this.quantity++;
    }

    calcTotalPrice(){
        return this.totalPrice = this.quantity * this.unitPrice;
    }
}