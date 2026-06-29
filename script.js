
console.log("SCRIPT LOADED OK");

// =====================
// CART STATE
// =====================
window.cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================
// SAVE CART
// =====================
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(window.cart));
}

// =====================
// ADD TO CART
// =====================
window.addToCart = function(name, price){

    let existing = window.cart.find(item => item.name === name);

    if(existing){
        existing.qty += 1;
    } else {
        window.cart.push({
            name: name,
            price: Number(price),
            qty: 1
        });
    }

    saveCart();
    updateCart();
};

// =====================
// REMOVE ITEM
// =====================
window.removeItem = function(index){

    if(window.cart[index].qty > 1){
        window.cart[index].qty -= 1;
    } else {
        window.cart.splice(index, 1);
    }

    saveCart();
    updateCart();
};

// =====================
// TOGGLE CART
// =====================
window.toggleCart = function(){

    const cart = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if(!cart || !overlay) return;

    cart.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
};

// =====================
// UPDATE CART UI
// =====================
function updateCart(){

    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if(!count || !items || !total) return;

    items.innerHTML = "";

    let sum = 0;
    let totalQty = 0;

    window.cart.forEach((item, i) => {

        let itemTotal = item.price * item.qty;
        sum += itemTotal;
        totalQty += item.qty;

        items.innerHTML += `
            <div>
                <span>${item.name} x${item.qty}</span>

                <div>
                    <button onclick="removeItem(${i})">−</button>
                    <span>${item.qty}</span>
                    <button onclick="addToCart('${item.name}', ${item.price})">+</button>
                </div>

                <span>€${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    count.innerText = totalQty;
    total.innerText = "Total: €" + sum.toFixed(2);
}

// =====================
// PLACE ORDER (DEIN CHECKOUT)
// =====================
window.placeOrder = function(){

    if(window.cart.length === 0){
        alert("Dein Warenkorb ist leer.");
        return;
    }

    const orderId = "JUICE-" + Math.floor(10000 + Math.random() * 90000);
    const date = new Date().toLocaleString("de-DE");

    window.cart = [];
    localStorage.removeItem("cart");
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
            flex-direction:column;
            color:white;
            z-index:9999;
            text-align:center;
        ">

            <h1>✔ Bestellung erfolgreich</h1>

            <p>Bestellnummer: <b>${orderId}</b></p>
            <p>${date}</p>

            <button id="backToShop">
                Zurück zum Shop
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("backToShop").onclick = function(){
        location.href = "index.html";
    };
};

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
    updateCart();
});
