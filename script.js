function toggle(id){

    const sections = document.querySelectorAll(".shop-section");

    sections.forEach(sec => {

        if(sec.id === id){

            // wenn schon offen → schließen
            if(sec.classList.contains("active")){
                sec.classList.remove("active");
            } else {
                sec.classList.add("active");
            }

        } else {
            sec.classList.remove("active");
        }

    });

}
