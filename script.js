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
// =========================
// UPDATE CART
// =========================

function updateCart() {

    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if (!count || !items || !total) {
        return;
    }

    items.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    window.cart.forEach((item, index) => {

        const qty = Number(item.qty) || 1;
        const price = Number(item.price) || 0;

        totalItems += qty;
        totalPrice += price * qty;

        items.innerHTML += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong><br>
                    €${price.toFixed(2)}
                </div>

                <div>
                    x${qty}

                    <span
                        onclick="removeItem(${index})"
                        style="
                            cursor:pointer;
                            margin-left:12px;
                            color:#ff4d8d;
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
// LOAD CHECKOUT
// =========================

window.loadCheckout = function() {

    const items = document.getElementById("checkout-items");
    const total = document.getElementById("checkout-total");

    if (!items || !total) {
        return;
    }

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

    // Cart leeren
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
                background:rgba(255,255,255,0.06);
                padding:35px;
                border-radius:18px;
                box-shadow:0 0 30px rgba(255,70,210,.35);
                text-align:center;
                max-width:420px;
                color:white;
            ">

                <h1 style="margin-bottom:15px;">
                    ✔ Bestellung erfolgreich
                </h1>

                <p style="margin-bottom:10px; opacity:0.85;">
                    Danke für deine Bestellung bei JuicedOut
                </p>

                <p style="font-size:14px; opacity:0.7;">
                    Bestellnummer: <b>${orderId}</b><br>
                    Datum: ${date}
                </p>

                <button id="backToShop" style="
                    margin-top:25px;
                    padding:12px 24px;
                    border:none;
                    border-radius:12px;
                    background:linear-gradient(90deg,#ff3ebf,#9d4dff);
                    color:white;
                    font-size:16px;
                    cursor:pointer;
                    box-shadow:0 0 20px rgba(255,70,210,.35);
                ">
                    Zurück zum Shop
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("backToShop").onclick = function() {
        location.href = "index.html";
    };
};

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
   
// =========================
// SAFETY / FIXES
// =========================

// Falls HTML Elemente erst später geladen werden
function safeUpdate() {
    try {
        updateCart();
    } catch (e) {
        console.warn("Cart update skipped:", e);
    }
}

// Globaler Reload Fix (optional)
window.refreshCart = function() {
    window.cart = JSON.parse(localStorage.getItem("cart")) || [];
    safeUpdate();
};

// Debug helper (kannst du in Konsole nutzen)
window.debugCart = function() {
    console.log("CART:", window.cart);
};

// Initialer Fix (falls Seite ohne DOMContentLoaded geladen wird)
safeUpdate();

console.log("SCRIPT READY ✔");
