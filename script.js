let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SAVE */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* KATEGORIEN */
function toggle(id){

    const sections = document.querySelectorAll(".shop-section");

    sections.forEach(sec => {
        sec.classList.toggle("active", sec.id === id && !sec.classList.contains("active"));
        if(sec.id !== id) sec.classList.remove("active");
    });

}

/* ADD */
function addToCart(name, price){

    cart.push({name, price});
    saveCart();
    updateCart();

}

/* REMOVE ITEM */
function removeItem(index){

    cart.splice(index, 1);
    saveCart();
    updateCart();

}

/* UPDATE CART UI */
function updateCart(){

    const count = document.getElementById("count");
    if(count) count.innerText = cart.length;

    const box = document.getElementById("cartItemsSmall");
    if(!box) return;

    box.innerHTML = "";

    let total = 0;

    if(cart.length === 0){
        box.innerHTML = "<p style='opacity:0.6'>Cart is empty</p>";
    }

    cart.forEach((item, index) => {

        total += item.price;

        box.innerHTML += `
            <div class="small-item">
                <span>${item.name} - €${item.price.toFixed(2)}</span>
                <button onclick="removeItem(${index})">X</button>
            </div>
        `;

    });

    box.innerHTML += `
        <div style="margin-top:10px; font-weight:bold;">
            Total: €${total.toFixed(2)}
        </div>
    `;
}

/* TOGGLE CART */
function toggleCart(){

    const box = document.getElementById("cartBox");

    if(!box) return;

    box.style.display = (box.style.display === "block") ? "none" : "block";

}

/* INIT */
updateCart();
