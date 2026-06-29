console.log("SCRIPT LOADED");

// =========================
// CART
// =========================

window.cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(window.cart));
}

// =========================
// ADD TO CART
// =========================

window.addToCart = function(name, price){

    price = Number(price);

    let existing = window.cart.find(item => item.name === name);

    if(existing){
        existing.qty++;
    }else{

        window.cart.push({
            name:name,
            price:price,
            qty:1
        });

    }

    saveCart();
    updateCart();

}

// =========================
// REMOVE
// =========================

window.removeItem = function(index){

    if(window.cart[index].qty > 1){

        window.cart[index].qty--;

    }else{

        window.cart.splice(index,1);

    }

    saveCart();
    updateCart();

}

// =========================
// CLEAR
// =========================

window.clearCart = function(){

    window.cart=[];

    saveCart();

    updateCart();

}
// =========================
// TOGGLE CART
// =========================

window.toggleCart = function(){

    const cartPanel = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if(!cartPanel) return;

    cartPanel.classList.toggle("hidden");

    if(overlay){
        overlay.classList.toggle("hidden");
    }

}

// =========================
// CLOSE CART
// =========================

window.closeCart = function(){

    const cartPanel = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    if(cartPanel){
        cartPanel.classList.add("hidden");
    }

    if(overlay){
        overlay.classList.add("hidden");
    }

}

// =========================
// UPDATE CART
// =========================

function updateCart(){

    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if(!count || !items || !total){
        return;
    }

    items.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    window.cart.forEach((item,index)=>{

        totalPrice += item.price * item.qty;
        totalItems += item.qty;

        items.innerHTML += `
            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong><br>
                    €${item.price.toFixed(2)}

                </div>

                <div>

                    x${item.qty}

                    <span
                        onclick="removeItem(${index})"
                        style="
                            margin-left:12px;
                            cursor:pointer;
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
// CHECKOUT PAGE
// =========================

window.loadCheckout = function(){

    const items = document.getElementById("checkout-items");
    const total = document.getElementById("checkout-total");

    if(!items || !total){
        return;
    }

    items.innerHTML = "";

    let sum = 0;

    window.cart.forEach(item=>{

        const itemTotal = item.price * item.qty;

        sum += itemTotal;

        items.innerHTML += `
            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:12px;
            ">

                <span>${item.name} × ${item.qty}</span>

                <span>€${itemTotal.toFixed(2)}</span>

            </div>
        `;

    });

    total.innerText = "Total: €" + sum.toFixed(2);

}
// =========================
// PLACE ORDER
// =========================

window.placeOrder = function(){

    if(window.cart.length === 0){
        alert("Dein Warenkorb ist leer.");
        return;
    }

    const orderId = "JUICE-" + Math.floor(10000 + Math.random() * 90000);
    const date = new Date().toLocaleString("de-DE");

    // Warenkorb leeren
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
            z-index:9999;
        ">

            <div style="
                background:rgba(255,255,255,.06);
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

                <p style="margin-bottom:20px;">
                    Danke für deine Bestellung bei JuicedOut.
               
