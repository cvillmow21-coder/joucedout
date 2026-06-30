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

        totalItems += item.qty;
        totalPrice += item.qty * item.price;

        items.innerHTML += `
            <div class="cart-item">
                <div>
                    <b>${item.name}</b><br>
                    €${item.price.toFixed(2)}
                </div>

                <div>
                    x${item.qty}
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

        const line = item.qty * item.price;
        sum += line;

        items.innerHTML += `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <span>${item.name} × ${item.qty}</span>
                <span>€${line.toFixed(2)}</span>
            </div>
        `;
    });

    total.innerText = "Total: €" + sum.toFixed(2);
};

// =========================
// PLACE ORDER
// =========================

window.placeOrder = function() {

    const orderId = "JUICE-" + Math.floor(10000 + Math.random() * 90000);
    const date = new Date().toLocaleString("de-DE");

    const total = window.cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2);

    // optional Telegram backend
    fetch("https://DEIN-SERVER/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cart: window.cart,
            total,
            orderId,
            date
        })
    }).catch(() => {});

    window.cart = [];
    saveCart();
    updateCart();

    document.body.innerHTML += `
        <div style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.85);
            display:flex;
            justify-content:center;
            align-items:center;
            color:white;
            z-index:9999;
        ">
            <div style="text-align:center;">
                <h1>✔ Bestellung erfolgreich</h1>
                <p>${orderId}</p>
                <button onclick="location.href='index.html'">
                    Zurück
                </button>
            </div>
        </div>
    `;
};

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
    updateCart();
    if (typeof loadCheckout === "function") loadCheckout();
});
