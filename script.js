let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SAVE */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* TOGGLE KATEGORIEN */
function toggle(id){

    const sections = document.querySelectorAll(".shop-section");

    sections.forEach(sec => {

        if(sec.id === id){
            sec.classList.toggle("active");
        } else {
            sec.classList.remove("active");
        }

    });

}

/* ADD TO CART */
function addToCart(name, price){

    cart.push({name, price});
    saveCart();
    updateCart();

}

/* CART COUNT */
function updateCart(){
    document.getElementById("count").innerText = cart.length;

    const box = document.getElementById("cartItemsSmall");
    if(!box) return;

    box.innerHTML = "";

    cart.forEach(item => {
        box.innerHTML += `<div class="small-item">${item.name} - €${item.price}</div>`;
    });
}

/* TOGGLE CART */
function toggleCart(){
    const box = document.getElementById("cartBox");

    if(box.style.display === "block"){
        box.style.display = "none";
    } else {
        box.style.display = "block";
    }
}

/* INIT */
updateCart();
