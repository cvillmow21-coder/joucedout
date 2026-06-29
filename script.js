window.placeOrder = function(){

    if(cart.length === 0){
        alert("Dein Warenkorb ist leer.");
        return;
    }

    // Bestellnummer
    const orderId = "JUICE-" + Math.floor(10000 + Math.random() * 90000);

    // Datum
    const date = new Date().toLocaleString("de-DE");

    // Warenkorb leeren
    cart = [];
    localStorage.removeItem("cart");
    updateCart();

    // Overlay
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
            animation:fadeIn .4s ease;
        ">

            <div style="
                background:rgba(255,255,255,0.06);
                padding:30px;
                border-radius:18px;
                box-shadow:0 0 30px rgba(255,70,210,.25);
                max-width:400px;
            ">

                <h1 style="font-size:40px;margin-bottom:10px;">
                    ✔ Bestellung erfolgreich
                </h1>

                <p style="opacity:0.8;margin-bottom:15px;">
                    Danke für deine Bestellung bei JuicedOut
                </p>

                <p style="font-size:14px;opacity:0.7;">
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

    document.getElementById("backToShop").onclick = function(){
        location.href = "index.html";
    };
};
