console.log("JUICEDOUT SHOP LOADED ✔");

// =========================
// CART STATE
// =========================

window.cart = JSON.parse(localStorage.getItem("cart") || "[]");

// =========================
// SAVE CART
// =========================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(window.cart));
}

// =========================
// ADD TO CART
// =========================

window.addToCart = function(name, price) {

    price = Number(price);

    if (isNaN(price)) {
        console.error("Ungültiger Preis:", price);
        return;
    }

    const existing = window.cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        window.cart.push({
            name,
            price,
            qty: 1
        });
    }

    saveCart();
    updateCart();

    console.log("Added:", name);
};

// =========================
// REMOVE ITEM
// =========================

window.removeItem = function(index) {

    if (!window.cart[index]) return;

    if (window.cart[index].qty > 1) {
        window.cart[index].qty--;
    } else {
        window.cart.splice(index, 1);
    }

    saveCart();
    updateCart();
};

// =========================
// CLEAR CART
// =========================

window.clearCart = function() {

    window.cart = [];
    saveCart();
    updateCart();
};

// =========================
// TOGGLE CART
// =========================

window.toggleCart = function() {

    const cart = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if (!cart || !overlay) return;

    cart.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
};

// =========================
// CLOSE CART
// =========================

window.closeCart = function() {

    document.getElementById("cart")?.classList.add("hidden");
    document.getElementById("overlay")?.classList.add("hidden");
};
