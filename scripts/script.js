import { data } from './data.js';

document.addEventListener("DOMContentLoaded", () =>{
    
    //---- Scroll top button --------
    window.addEventListener("scroll", () => {
        const button = document.getElementById("top_button");
        if (window.scrollY > 100) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });

    document.getElementById("top_button").addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    });



    // elements in local storage
    const sizes = document.getElementsByClassName("size");
    let product_in_cart = JSON.parse(localStorage.getItem("cart")) || [];
    for(let i = 0; i < sizes.length; i++){
        sizes[i].addEventListener("click", () => {
            let number = Math.floor(i/6);
            
            const productsImg = document.getElementsByClassName("product_picture");

            for(let j = 0; j < data.categories.length; j++){
                for(let k = 0; k < data.categories[j].products.length; k++){
                    if(productsImg[number].src.includes(data.categories[j].products[k].image.split("/")[4])){

                        let object = {name: `${data.categories[j].products[k].name}`,
                        size: `${sizes[i].textContent}`,
                        price: `${data.categories[j].products[k].price}`,
                        image:`${data.categories[j].products[k].image}`,
                        quantity: 1}

                        // odradujemo quantity
                        const itemIndex = product_in_cart.findIndex(item => {
                            const parsedItem = JSON.parse(item);
                            return parsedItem.name === object.name &&
                                   parsedItem.size === object.size;
                        });

                        if(itemIndex == -1){
                            product_in_cart.push(JSON.stringify(object));
                        }
                        else{
                            let cartItem = JSON.parse(product_in_cart[itemIndex]);
                            cartItem.quantity += 1;
                            product_in_cart[itemIndex] = JSON.stringify(cartItem);
                        }
                    }
                }
            }

            localStorage.setItem("cart", JSON.stringify(product_in_cart));
        });
    }


    // KOŠARICA LOCAL STORAGE
    let counterForCart = 0;
    for(let i = 0; i < product_in_cart.length; i++){
        const item = JSON.parse(product_in_cart[i]);

        counterForCart += item.quantity;
    }

    circle.innerHTML = counterForCart;
    
    if (counterForCart != 0) {
        circle.style.display = "flex";
        circle.style.textAlign = "center";
    }
    
    const sizeElements = document.getElementsByClassName("size");

    for (let i = 0; i < sizeElements.length; i++) {
        sizeElements[i].addEventListener("click", () => {
            const circle = document.getElementById("circle");
    
            let previousSize = sizeElements[i].innerHTML;
    
            // Prikaz loadera
            sizeElements[i].innerHTML = '<div class="loader"></div>';
            const loader = sizeElements[i].querySelector(".loader");
    
            loader.style.border = '2px solid #27445D';
            loader.style.borderTop = '2px solid transparent';
            loader.style.borderRadius = '50%';
            loader.style.width = '1vmin';
            loader.style.height = '1vmin';
            loader.style.animation = 'spin 0.5s linear infinite';
    
            // Nakon 500ms, zamijeni loader sa check ikonom i ažuriraj krug
            setTimeout(() => {
                sizeElements[i].innerHTML = '<img src="images/icon_check.png" alt="" class="check">';
                const check = sizeElements[i].querySelector(".check");
    
                check.style.position = "absolute";
                check.style.objectFit = "contain";
                check.style.width = "90%";
                check.style.height = "60%";


                counterForCart = 0;
                for(let i = 0; i < product_in_cart.length; i++){
                    const item = JSON.parse(product_in_cart[i]);

                    counterForCart += item.quantity;
                }

                circle.innerHTML = counterForCart;
                
                if (counterForCart != 0) {
                    circle.style.display = "flex";
                    circle.style.textAlign = "center";
                }

    
                // Vrati izvorni tekst nakon dodatnih 300ms
                setTimeout(() => {
                    sizeElements[i].innerHTML = previousSize;
                }, 300);
            }, 500);
        });
    }


    //----- Counter for added item -----
    const counters = document.getElementsByClassName("counter");
    const product_picture = document.getElementsByClassName("product_picture");

    function updateCounters(){  
        for(let i = 0; i < counters.length; i++){
            let counter = 0;

            for(let j = 0; j < product_in_cart.length; j++){
                const item = JSON.parse(product_in_cart[j]);
                if(product_picture[i].src.includes(item.image.split("/")[4])){
                    counter += item.quantity;
                }
            }

            counters[i].innerHTML = counter;
            if(counters[i].innerHTML != 0){
                counters[i].style.display = "block";
            }
        }
    }
    for(let i = 0; i < sizeElements.length; i++){
        sizeElements[i].addEventListener("click", () => {
            let number = Math.floor(i/6);
            let counter = 0;
            
            for(let j = 0; j < product_in_cart.length; j++){
                const item = JSON.parse(product_in_cart[j]);
                if(product_picture[number].src.includes(item.image.split("/")[4])){
                    counter += item.quantity;
                }
            }
        
            setTimeout(() => {
                counters[number].innerHTML = counter;
                if(counters[number].innerHTML != 0){
                    counters[number].style.display = "block";
                }
            },500);
        });
    }

    updateCounters();

    // ----- Kategorije tab ----- 
    document.querySelectorAll(".kategorije").forEach((kat)=>{
        kat.addEventListener("click", () =>{
            const kategorije_section = document.getElementById("kategorije_section");
            const kategorije_links = document.getElementById("kategorije_links");
            const black_screen = document.getElementById("whole_screen");
    
            if(window.matchMedia("(max-width: 1024px)").matches){
                kategorije_section.style.width = "40%"
            }
            else{
                kategorije_section.style.width = "20%";
            }
    
            kategorije_links.style.display = "flex";
            black_screen.style.display = "block";
            setTimeout(() => {
                kategorije_links.style.opacity = "1";
            }, 300);
        });
    });

    document.getElementById("kategorije_exit").addEventListener("click", () =>{
        const kategorije_section = document.getElementById("kategorije_section");
        const kategorije_links = document.getElementById("kategorije_links");
        const black_screen = document.getElementById("whole_screen");

        kategorije_section.style.width = "0";
        kategorije_links.style.opacity = "0";
        setTimeout(() => {
            kategorije_links.style.display = "none";
            black_screen.style.display = "none";
        },300);
    });

    document.getElementById("whole_screen").addEventListener("click", () =>{
        const kategorije_section = document.getElementById("kategorije_section");
        const kategorije_links = document.getElementById("kategorije_links");
        const black_screen = document.getElementById("whole_screen");
        kategorije_section.style.width = "0";
        kategorije_links.style.opacity = "0";
        setTimeout(() => {
            kategorije_links.style.display = "none";
            black_screen.style.display = "none";
        },300);
    })

    // funckija pamti u local storagu u kojem smo categoriji
    function categories_memory(){
        const categories_links = document.getElementsByClassName("kategorije_link");
        for(let i = 0; i < categories_links.length; i++){
            categories_links[i].addEventListener("click", () =>{
                localStorage.setItem("categorie", categories_links[i].innerText);
            });
        }
    }
    
    categories_memory();
});