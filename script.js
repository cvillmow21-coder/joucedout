console.log("JUICEDOUT SHOP LOADED ✔");

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

    if (isNaN(price)) {
        console.error("Ungültiger Preis:", price);
        return;
    }

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

    console.log("Produkt hinzugefügt:", name);
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

    if (!confirm("Warenkorb wirklich leeren?")) return;

    window.cart = [];

    saveCart();
    updateCart();
};

// =========================
// TOGGLE CART
// =========================

window.toggleCart = function() {

    const cartPanel = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if (!cartPanel || !overlay) return;

    cartPanel.classList.toggle("hidden");
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

    let totalItems = 0;
    let totalPrice = 0;

    window.cart.forEach((item, index) => {

        const qty = Number(item.qty) || 1;
        const price = Number(item.price) || 0;

        totalItems += qty;
        totalPrice += qty * price;

        items.innerHTML += `
            <div class="cart-item">

                <div class="cart-info">
                    <strong>${item.name}</strong><br>
                    €${price.toFixed(2)}
                </div>

                <div class="cart-actions">

                    <span>x${qty}</span>

                    <span
                        onclick="removeItem(${index})"
                        style="
                            cursor:pointer;
                            color:#ff4d8d;
                            margin-left:12px;
                            font-weight:bold;
                        ">
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

        const qty = Number(item.qty) || 1;
        const price = Number(item.price) || 0;

        const lineTotal = qty * price;

        sum += lineTotal;

        items.innerHTML += `
            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:12px;
                padding-bottom:10px;
                border-bottom:1px solid rgba(255,255,255,.08);
            ">

                <span>${item.name} × ${qty}</span>

                <span>€${lineTotal.toFixed(2)}</span>

            </div>
        `;
    });

    total.innerText = "Total: €" + sum.toFixed(2);

// =========================
// PLACE ORDER
// =========================

window.placeOrder = function () {

    if (window.cart.length === 0) {
        alert("Dein Warenkorb ist leer.");
        return;
    }

    const orderId = "JUICE-" + Math.floor(10000 + Math.random() * 90000);
    const date = new Date().toLocaleString("de-DE");

    // HIER kommt später PayPal bzw. Backend/Telegram hin

    // Warenkorb leeren
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
        ">

            <div style="
                background:rgba(255,255,255,.06);
                padding:35px;
                border-radius:18px;
                box-shadow:0 0 30px rgba(255,70,210,.35);
                text-align:center;
                color:white;
                max-width:420px;
                width:90%;
            ">

                <h1>✔ Bestellung erfolgreich</h1>

                <p style="margin-top:15px;">
                    Danke für deine Bestellung bei JuicedOut.
                </p>

                <p style="margin-top:20px;font-size:14px;opacity:.8;">
                    Bestellnummer:<br>
                    <strong>${orderId}</strong>
                </p>

                <p style="font-size:14px;opacity:.8;">
                    ${date}
                </p>

                <button
                    onclick="location.href='index.html'"
                    style="
                        margin-top:25px;
                        padding:14px 26px;
                        border:none;
                        border-radius:12px;
                        cursor:pointer;
                        background:linear-gradient(90deg,#ff3ebf,#9d4dff);
                        color:white;
                        font-size:16px;
                    ">
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

    console.log("DOM READY ✔");

    updateCart();

    if (typeof loadCheckout === "function") {
        loadCheckout();
    }

});
