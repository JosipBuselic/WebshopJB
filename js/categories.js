import { data } from './data.js';

document.addEventListener("DOMContentLoaded", () => {
    function loadPage(){

        const categorie = localStorage.getItem("categorie");
        const section = document.getElementById("section");
        for(let i = 0; i < data.categories.length; i++){
            if(data.categories[i].name == categorie){

                for(let j = 0; j < (data.categories[i].products.length/3)+1; j++){
                    const row_container = document.createElement("div");
                    row_container.classList.add("container_row");
                    section.appendChild(row_container);
                }

                for(let j = 0; j < data.categories[i].products.length; j++){
                    
                }
            }
        }
    }

    loadPage();
});