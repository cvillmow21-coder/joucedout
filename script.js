console.log("SCRIPT LOADED OK");

// Warenkorb im globalen Scope
window.cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
window.addToCart = function(name, price){

    console.log("ADD WORKS:", name, price);

    window.cart.push({
        name: name,
        price: Number(price)
    });

    localStorage.setItem("cart", JSON.stringify(window.cart));

    updateCart();

}

/* TOGGLE CART */
window.toggleCart = function(){

    const cart = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if(!cart || !overlay) return;

    cart.classList.toggle("hidden");
    overlay.classList.toggle("hidden");

}

/* CLEAR CART */
window.clearCart = function(){
    window.cart = [];
    localStorage.setItem("cart", JSON.stringify(window.cart));
    updateCart();
}

/* REMOVE ITEM */
window.removeItem = function(index){
    window.cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(window.cart));
    updateCart();
}

/* UPDATE UI */
function updateCart(){

    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if(!count || !items || !total) return;

    count.innerText = window.cart.length;

    items.innerHTML = "";

    let sum = 0;

    window.cart.forEach((item, i) => {

        sum += item.price;

        items.innerHTML += `
            <div>
                ${item.name} - €${item.price.toFixed(2)}
                <span onclick="removeItem(${i})" style="cursor:pointer;">❌</span>
            </div>
        `;

    });

    total.innerText = "Total: " + sum.toFixed(2) + "€";

}

updateCart();
window.loadCheckout = function(){

    const items = document.getElementById("checkout-items");
    const totalEl = document.getElementById("checkout-total");

    if(!items || !totalEl) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    items.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price;

        items.innerHTML += `
            <div>
                ${item.name}
                <span>€${item.price.toFixed(2)}</span>
            </div>
        `;

    });

    totalEl.innerText = "Total: " + total.toFixed(2) + "€";

}

/* AUTO LOAD */
window.onload = function(){
    loadCheckout();
}
