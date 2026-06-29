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
window.addToCart = function(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    saveCart();
    updateCart();

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

/* -------------------------
   START
------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    updateCart();
    loadCheckout();

});
