let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){

    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        container.innerHTML += `
            <div class="checkout-item">
                <span>${item.name} - €${item.price.toFixed(2)}</span>
                <button onclick="removeItem(${index})">X</button>
            </div>
        `;

    });

    document.getElementById("total").innerText = "Total: €" + total.toFixed(2);

}

function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
