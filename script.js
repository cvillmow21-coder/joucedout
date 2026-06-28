document.addEventListener("DOMContentLoaded", () => {

    window.toggle = function(id){

        const sections = document.querySelectorAll(".shop-section");

        sections.forEach(sec => {

            if(sec.id === id){
                sec.classList.toggle("active");
            } else {
                sec.classList.remove("active");
            }

        });

    };

});
