console.log("PRO SHOP LOADED ✔");

// =========================
// PRODUCTS DATABASE
// =========================

window.products = [
    {
        id: 1,
        name: "THC Juice Classic",
        price: 19.99
    },
    {
        id: 2,
        name: "THC Juice Premium",
        price: 29.99
    },
    {
        id: 3,
        name: "Kratom Green",
        price: 17.99
    },
    {
        id: 4,
        name: "Kratom Gold",
        price: 27.99
    }
];
console.log("SCRIPT LOADED");

// =========================
// CART STATE
// =========================

window.cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    const existing = window.cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        window.cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    saveCart();
    updateCart();
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

// =========================
// UPDATE CART
// =========================

function updateCart() {

    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if (!count || !items || !total) return;

    items.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    window.cart.forEach((item, index) => {

        const qty = item.qty || 1;
        const price = item.price || 0;

        totalItems += qty;
        totalPrice += qty * price;

        items.innerHTML += `
            <div>
                <div>
                    <b>${item.name}</b><br>
                    €${price.toFixed(2)}
                </div>

                <div>
                    x${qty}
                    <span onclick="removeItem(${index})"
                        style="cursor:pointer;margin-left:10px;color:red;">
                        ✖
                    </span>
                </div>
            </div>
        `;
    });

    count.innerText = totalItems;
    total.innerText = "Total: €" + totalPrice.toFixed(2);
}
// =========================
// CHECKOUT
// =========================

window.loadCheckout = function() {

    const items = document.getElementById("checkout-items");
    const total = document.getElementById("checkout-total");

    if (!items || !total) return;

    items.innerHTML = "";

    let sum = 0;

    window.cart.forEach(item => {

        const qty = item.qty || 1;
        const price = item.price || 0;

        const totalItem = qty * price;
        sum += totalItem;

        items.innerHTML += `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <span>${item.name} × ${qty}</span>
                <span>€${totalItem.toFixed(2)}</span>
            </div>
        `;
    });

    total.innerText = "Total: €" + sum.toFixed(2);
};

// =========================
// PLACE ORDER
// =========================

window.placeOrder = function() {

    if (window.cart.length === 0) {
        alert("Dein Warenkorb ist leer.");
        return;
    }

    const orderId = "JUICE-" + Math.floor(10000 + Math.random() * 90000);
    const date = new Date().toLocaleString("de-DE");

    window.cart = [];
    saveCart();
    updateCart();

    const overlay = document.createElement("div");

    overlay.innerHTML = `
        <div style="
            position:fixed;
            inset:0;
            background:linear-gradient(180deg,#14001f,#090014);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
            color:white;
        ">

            <div style="
                background:rgba(255,255,255,0.06);
                padding:30px;
                border-radius:16px;
                text-align:center;
                box-shadow:0 0 30px rgba(255,70,210,.3);
            ">

                <h1>✔ Bestellung erfolgreich</h1>

                <p>Bestellnummer: <b>${orderId}</b></p>
                <p>${date}</p>

                <button onclick="location.href='index.html'"
                    style="margin-top:20px;padding:10px 20px;">
                    Zurück zum Shop
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);
};

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {

    updateCart();

    if (typeof loadCheckout === "function") {
        loadCheckout();
    }
});

console.log("SCRIPT READY ✔");
window.renderProducts = function(containerId = "products") {

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    window.products.forEach(p => {

        container.innerHTML += `
            <div class="product-card">

                <h3>${p.name}</h3>

                <span>€${p.price.toFixed(2)}</span>

                <button onclick="addToCart('${p.name}', ${p.price})">
                    In den Warenkorb
                </button>

            </div>
        `;
    });
};
window.addToCart = function(name, price) {

    price = Number(price);

    if (isNaN(price)) {
        console.error("INVALID PRICE:", name, price);
        return;
    }

    const existing = window.cart.find(i => i.name === name);

    if (existing) {
        existing.qty++;
    } else {
        window.cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    saveCart();
    updateCart();
};
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
window.clearCart = function() {

    window.cart = [];

    saveCart();
    updateCart();
};
window.toggleCart = function() {

    const cart = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if (!cart || !overlay) return;

    cart.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
};
window.closeCart = function() {

    document.getElementById("cart")?.classList.add("hidden");
    document.getElementById("overlay")?.classList.add("hidden");
};
function updateCart() {

    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if (!count || !items || !total) return;

    items.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    window.cart.forEach((item, index) => {

        const qty = item.qty || 1;
        const price = item.price || 0;

        totalItems += qty;
        totalPrice += qty * price;

        items.innerHTML += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong><br>
                    €${price.toFixed(2)}
                </div>

                <div>
                    x${qty}
                    <span onclick="removeItem(${index})"
                        style="cursor:pointer;color:red;margin-left:10px;">
                        ✖
                    </span>
                </div>

            </div>
        `;
    });

    count.innerText = totalItems;
    total.innerText = "Total: €" + totalPrice.toFixed(2);
}
document.addEventListener("DOMContentLoaded", () => {
    updateCart();

    if (typeof loadCheckout === "function") {
        loadCheckout();
    }

    if (typeof renderProducts === "function") {
        renderProducts();
    }
});
