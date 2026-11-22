"use strict";
const getElement = selector => document.querySelector(selector);

// running total of the order
let total = 0;

// return the name and price of an item, based on its image file name
const getSelectedProduct = src => {
    const fileName = src.split("/").at(-1);   // e.g. "cappuccino.jpg"

    switch (fileName) {
        case "espresso.jpg":
            return ["Espresso", 1.95];
        case "latte.jpg":
            return ["Latte", 2.95];
        case "cappuccino.jpg":
            return ["Cappuccino", 3.45];
        case "coffee.jpg":
            return ["Drip coffee", 1.75];
        case "biscotti.jpg":
            return ["Biscotti", 1.95];
        case "scone.jpg":
            return ["Scone", 2.95];
        default:
            return ["Unknown item", 0];
    }
};

// add an item to the order list and update the total
const addToOrder = (name, price) => {
    const option = document.createElement("option");
    option.textContent = "$" + price.toFixed(2) + " - " + name;
    getElement("#order").appendChild(option);

    total += price;
    getElement("#total").textContent = "Total: $" + total.toFixed(2);
};

// remove every item from the order and clear the total
const clearOrder = () => {
    getElement("#order").textContent = "";
    total = 0;
    getElement("#total").textContent = "";
};

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("#menu-list img");

    for (let image of images) {
        const originalSrc = image.src;   // the plain photo
        const infoSrc = image.id;        // the photo with name and price

        // preload the rollover image so it shows instantly
        const preload = new Image();
        preload.src = infoSrc;

        // swap images when the mouse moves over and off the item
        image.addEventListener("mouseover", () => {
            image.src = infoSrc;
        });
        image.addEventListener("mouseout", () => {
            image.src = originalSrc;
        });

        // add the item to the order when it's clicked
        image.addEventListener("click", evt => {
            const product = getSelectedProduct(originalSrc);
            addToOrder(product[0], product[1]);
            evt.preventDefault();   // stop the <a href="#"> from jumping the page
        });
    }

    // go to the checkout page
    getElement("#place_order").addEventListener("click", () => {
        if (getElement("#order").options.length === 0) {
            alert("Please add at least one item to your order.");
        } else {
            getElement("#order_form").submit();
        }
    });

    getElement("#clear_order").addEventListener("click", clearOrder);
});