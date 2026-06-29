console.log("JuicedOut Script geladen");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* -------------------------
   WARENKORB SPEICHERN
------------------------- */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* -------------------------
   PRODUKT HINZUFÜGEN
------------------------- */
window.placeOrder = function(){

    if(cart.length === 0){
        alert("Dein Warenkorb ist leer.");
        return;
    }

    document.body.innerHTML = `

        <div style="
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            background:linear-gradient(180deg,#14001f,#090014);
            color:white;
            text-align:center;
        ">

            <h1 style="font-size:50px;">✔ Bestellung erfolgreich</h1>
            <p style="margin-top:15px; opacity:0.8;">
                Danke für deine Bestellung bei JuicedOut
            </p>

            <button onclick="location.href='index.html'" style="
                margin-top:30px;
                padding:15px 30px;
                border:none;
                border-radius:12px;
                background:linear-gradient(90deg,#ff3ebf,#9d4dff);
                color:white;
                font-size:18px;
                cursor:pointer;
            ">
                Zurück zum Shop
            </button>

        </div>

    `;

    cart = [];
    localStorage.removeItem("cart");
}

/* -------------------------
   WARENKORB ÖFFNEN/SCHLIESSEN
------------------------- */
window.toggleCart = function() {

    const panel = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if (!panel || !overlay) return;

    panel.classList.toggle("hidden");
    overlay.classList.toggle("hidden");

}

/* -------------------------
   WARENKORB SCHLIESSEN
------------------------- */
window.closeCart = function() {

    const panel = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if (panel) panel.classList.add("hidden");
    if (overlay) overlay.classList.add("hidden");

}

/* -------------------------
   WARENKORB LEEREN
------------------------- */
window.clearCart = function() {

    cart = [];
    saveCart();
    updateCart();

}

/* -------------------------
   EIN PRODUKT ENTFERNEN
------------------------- */
window.removeItem = function(index) {

    cart.splice(index, 1);
    saveCart();
    updateCart();

}

/* -------------------------
   WARENKORB AKTUALISIEREN
------------------------- */
function updateCart() {

    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if (count) {
        count.textContent = cart.length;
    }

    if (!items || !total) return;

    items.innerHTML = "";

    let sum = 0;

    cart.forEach((item, index) => {

        sum += item.price;

        items.innerHTML += `
            <div>
                <span>${item.name}</span>
                <span>
                    €${item.price.toFixed(2)}
                    <span onclick="removeItem(${index})" style="cursor:pointer;margin-left:8px;">❌</span>
                </span>
            </div>
        `;

    });

    total.textContent = "Total: €" + sum.toFixed(2);

}

/* -------------------------
   CHECKOUT LADEN
------------------------- */
window.loadCheckout = function() {

    const items = document.getElementById("checkout-items");
    const total = document.getElementById("checkout-total");

    if (!items || !total) return;

    items.innerHTML = "";

    let sum = 0;

    cart.forEach(item => {

        sum += item.price;

        items.innerHTML += `
            <div>
                <span>${item.name}</span>
                <span>€${item.price.toFixed(2)}</span>
            </div>
        `;

    });

    total.textContent = "Total: €" + sum.toFixed(2);

}
let shipping = 4.99;

let subtotal = 0;

cart.forEach(item => {
    subtotal += item.price;
});

const total = subtotal + shipping;

document.getElementById("checkout-subtotal").innerText =
"Zwischensumme: €" + subtotal.toFixed(2);

document.getElementById("checkout-total").innerText =
"Total: €" + total.toFixed(2);
/* -------------------------
   START
------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    updateCart();
    loadCheckout();

});
window.placeOrder = function(){

    if(cart.length === 0){
        alert("Dein Warenkorb ist leer.");
        return;
    }

    alert("Vielen Dank für deine Bestellung! 🎉");

    cart = [];
    localStorage.removeItem("cart");

    window.location.href = "index.html";
}
window.applyDiscount = function(){

    const code = document.getElementById("discount-code").value;

    if(code === "JUICED10"){
        alert("10% Rabatt aktiviert!");

    } else {
        alert("Ungültiger Code");
    }

}
