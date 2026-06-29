window.placeOrder = function(){

    if(cart.length === 0){
        alert("Dein Warenkorb ist leer.");
        return;
    }

    // Warenkorb speichern/clearen
    cart = [];
    localStorage.removeItem("cart");
    updateCart();

    // Success Overlay erstellen
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
            text-align:center;
            z-index:9999;
        ">

            <h1 style="font-size:50px;margin-bottom:10px;">
                ✔ Bestellung erfolgreich
            </h1>

            <p style="opacity:0.8;font-size:18px;">
                Danke für deine Bestellung bei JuicedOut
            </p>

            <button id="backToShop" style="
                margin-top:30px;
                padding:15px 30px;
                border:none;
                border-radius:12px;
                background:linear-gradient(90deg,#ff3ebf,#9d4dff);
                color:white;
                font-size:18px;
                cursor:pointer;
                box-shadow:0 0 25px rgba(255,70,210,.45);
                transition:.25s;
            ">
                Zurück zum Shop
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("backToShop").onclick = function(){
        location.href = "index.html";
    };
};
