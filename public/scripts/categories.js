

document.addEventListener("DOMContentLoaded", ()=>{
    // ovdje kada pritsinem na odredenu kategoriju stvorim sve proizovde iz te kategorije da nestavramo vise html datoteka
    async function loadPage(){

        const query = window.location.search.split("=")
        const id = query[1]

        const response = await fetch(`/home/getProducts/${id}`, {
            method: "GET"
        })
        if(!response.ok) throw new Error("Network was not ok")
        const stvari = await response.json()

        console.log(stvari)

        const section = document.getElementById("section");
        const containers = document.createElement("div");
        containers.classList.add("containers");

        section.appendChild(containers);
        const naslov = document.getElementById("section").querySelector("h2");
        const span = document.createElement("span");
        span.innerText = "& ";

        naslov.append(span, stvari.name);

        for(let j = 0; j < stvari.products.length; j++){
            let big = j % 3;
            let small = j % 2;

            // container
            const container = document.createElement("div");
            container.classList.add("container");
            container.setAttribute("data-id", `${stvari.products[j].id}`)

            switch(big){
                case 0:
                    container.classList.add("left");
                    break;
                case 1:
                    container.classList.add("center");
                    break;
                case 2:
                    container.classList.add("right");
                    break;
                default:
                    break;
            }
            switch(small){
                case 0:
                    container.classList.add("left_mini");
                    break;
                case 1:
                    container.classList.add("right_mini");
                    break;
                default:
                    break;
            }

            containers.appendChild(container);

            // img
            const img = document.createElement("img");
            img.classList.add("product_picture");
            img.src = stvari.products[j].image;

            container.appendChild(img);

            // div buttons
            const size_buttons = document.createElement("div");
            size_buttons.classList.add("size_buttons");

            container.appendChild(size_buttons);

            for(let k = 0; k < stvari.products[j].size.length; k++){
                const button_size = document.createElement("button")
                button_size.classList.add("size");
                button_size.innerText = stvari.products[j].size[k];

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

            name.innerText = stvari.products[j].name;
            price.innerText = stvari.products[j].price + "€";

            about_product.appendChild(name);
            about_product.appendChild(price);
                
        }
    }



    loadPage();

})

