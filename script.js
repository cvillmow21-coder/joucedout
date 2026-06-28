let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* KATEGORIEN TOGGLE */
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

    alert(name + " wurde hinzugefügt 🛒");

}
