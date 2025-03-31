import { data } from './data.js';



function loadPage(){

    const categorie = localStorage.getItem("categorie");
    const section = document.getElementById("section");
    for(let i = 0; i < data.categories.length; i++){
        if(data.categories[i].name == categorie){

            for(let j = 0; j < (data.categories[i].products.length/3); j++){
                const row_container = document.createElement("div");
                row_container.classList.add("container_row");
                section.appendChild(row_container);
            }

            // h2 naslov
            const naslov = document.getElementById("section").querySelector("h2");
            const kategorija = localStorage.getItem("categorie");
            const span = document.createElement("span");
            span.innerText = "& ";

            naslov.append(span, kategorija);


            const rows = document.getElementsByClassName("container_row");
            for(let j = 0; j < data.categories[i].products.length; j++){
                let row = Math.floor(j / 3);

                // container
                const container = document.createElement("div");
                container.classList.add("container");

                rows[row].appendChild(container);

                // img
                const img = document.createElement("img");
                img.classList.add("product_picture");
                img.src = data.categories[i].products[j].image;

                container.appendChild(img);

                // div buttons
                const size_buttons = document.createElement("div");
                size_buttons.classList.add("size_buttons");

                container.appendChild(size_buttons);

                for(let k = 0; k < data.categories[i].products[j].size.length; k++){
                    const button_size = document.createElement("button")
                    button_size.classList.add("size");
                    button_size.innerText = data.categories[i].products[j].size[k];

                    size_buttons.appendChild(button_size);
                }

                // counter 
                const counter = document.createElement("div");
                counter.classList.add("counter")
                counter.innerText = 0;

                container.appendChild(counter);

                // about product
                const about_product = document.createElement("div");
                about_product.classList.add("about_product");

                container.appendChild(about_product);

                // h4 unutar about product
                const name = document.createElement("h4");
                const price = document.createElement("h4");

                name.innerText = data.categories[i].products[j].name;
                price.innerText = data.categories[i].products[j].price;

                about_product.appendChild(name);
                about_product.appendChild(price);
                
                if(data.categories[i].products.length % 3 == 2 && data.categories[i].products.length - 1 == j){
                    const container = document.createElement("div");
                    container.classList.add("container");

                    rows[row].appendChild(container);
                }
            }
        }
    }
}

loadPage();
