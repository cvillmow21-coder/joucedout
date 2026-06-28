function toggle(id){

    let sections = document.querySelectorAll(".shop-section");

    sections.forEach(sec => {
        if(sec.id === id){
            sec.style.display = sec.style.display === "block" ? "none" : "block";
        } else {
            sec.style.display = "none";
        }
    });

}
