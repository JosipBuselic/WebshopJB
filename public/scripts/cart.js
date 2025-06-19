document.addEventListener("DOMContentLoaded", () => {

    async function loadFromSession(){

        const res = await fetch("/cart/getAll", {
            method: "GET"
        })

        const product_in_cart = await res.json()

        const cart_section = document.getElementById("cart_section");

        if(product_in_cart.length != 0){


            for(let i = 0; i < product_in_cart.length; i++){
                const item = product_in_cart[i];
    
                // radim div element
                const div = document.createElement("div");
                div.classList.add("element");
                div.setAttribute("data-id", product_in_cart[i].id)
    
                //appendam ga na cart_section
                cart_section.appendChild(div);
    
                // kreiram img
                const img = document.createElement("img");
                img.src = item.image;
    
                // appendam sliku na nas div
                div.appendChild(img);     
                
                // kreiram jos dva pod diva
                const childdiv1 = document.createElement("div");
                const childdiv2 = document.createElement("div");
    
                childdiv1.classList.add("product_info");
                childdiv2.classList.add("product_quantity");
    
                div.appendChild(childdiv1);
                div.appendChild(childdiv2);
    
    
                //kreiram sav tekst koje je potreban za product_info
                const name = document.createElement("h3");
                const size = document.createElement("h3");
                const price = document.createElement("h3");
    
                name.textContent = `Name: ${item.name}`;
                size.textContent = `Size: ${item.size}`;
                price.textContent = `Price: ${item.price}€`;
    
                childdiv1.appendChild(name);
                childdiv1.appendChild(size);
                childdiv1.appendChild(price);
    
                // kreiram button-e koja ce nam reci quantity za neki item koliko smo ga uzeli
                const sub = document.createElement("button");
                const quantity = document.createElement("h3");
                const add = document.createElement("button");
    
                sub.innerText = "<";
                add.innerText = ">";
                quantity.innerText = item.quantity;
    
                sub.classList.add("sub");
                quantity.classList.add("quantity");
                add.classList.add("add");
                
                // morao sam staviti atribut data-index za svaki button jer kad brisem elemente u ovisnosti o i u for petlji u funkciji sub_button
                // te nece raditi
                sub.setAttribute("data-index", i);

                childdiv2.appendChild(sub);
                childdiv2.appendChild(quantity);
                childdiv2.appendChild(add);
            }
        
        }

        add_button();
        sub_button();
    }
    
    // ovdje se nalazi funkcija 
    function sub_button(){
        const subs = document.getElementsByClassName("sub");
        const quantitys = document.getElementsByClassName("quantity");  
        for(let i = 0; i < subs.length; i++){
            subs[i].addEventListener("click", async (e) => {

                const element = e.target.closest(".element")
                const quantityElement = element.querySelector(".quantity");
                const productId = element.getAttribute("data-id")

                const res = await fetch(`/cart/remove/${productId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const res2 = await fetch(`/cart/getAll`, {
                    method: "GET"
                })

                const js = await res.json()

                const cart = await res2.json()

                // uzimam data index od tog button-a te je to zapravo index od cijelog elementa
                const index = parseInt(e.target.getAttribute("data-index"));
    
                if(js.deleteElement){
                    document.querySelectorAll(".element")[index].remove();
                    refreshIndex();

                } else {
                    let currentQuantity = parseInt(quantityElement.innerText);
                    quantityElement.innerText = currentQuantity - 1;
                }
                
                updateCart();
                total_price_update();

                if(cart.length <= 0){
                    window.location.href = "cart"
                }
            });
        }
    }

    // refresham data-index od svakog buttona
    function refreshIndex(){
        const subs = document.querySelectorAll(".sub");
        subs.forEach((btn, i) => btn.setAttribute("data-index", i));
    }
    
    // add button samo dodaje jos u quantity 
    async function add_button(){

        const adds = document.getElementsByClassName("add");
        const quantitys = document.getElementsByClassName("quantity");  
        for(let i = 0; i < adds.length; i++){
            adds[i].addEventListener("click", async () => {

                const element = e.target.closest(".element")
                const quantityElement = element.querySelector(".quantity");
                const productId = element.getAttribute("data-id")
                const res = await fetch(`/cart/add/${productId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const product_in_cart = await res.json()

                let currentQuantity = parseInt(quantityElement.innerText);
                quantityElement.innerText = currentQuantity + 1;
    
                updateCart();
                total_price_update();
            });
        }
    }

    async function updateCart(){

        const res = await fetch('/cart/number', {
            method: "GET"
        });

        const numberInCart = await res.json();

        const circle = document.getElementById("circle");

        if (!circle) {
            console.warn("No element with ID 'circle' found in DOM.");
            return;
        }

        circle.innerHTML = numberInCart.broj;

        if (numberInCart.broj != 0) {
            circle.style.display = "flex";
            circle.style.textAlign = "center";
        }

    }

    // ovo je button empty cart koji prilikom pritiska brise cijeli cart 
    function empty_cart(){
        const btn = document.getElementById("empty_cart")
        btn.addEventListener("click", async() =>{
            const res = await fetch("/cart/empty", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const js = await res.json()
            if(!js.success) throw new Error("nije dobro")

            window.location.href = "/cart"
        })
    }

    // ispisuje ukupnu cijenu svih proizvoda
    async function total_price_update(){

        const res = await fetch("/cart/getAll", {
            method: "GET"
        })

        const product_in_cart = await res.json()

        const total_price = document.getElementById("total_price");

        if(product_in_cart.length == 0){
            total_price.innerText = "0.00€";
        }
        else{
            let total_price_counter = 0;
            for(let i = 0; i < product_in_cart.length; i++){
                const item = product_in_cart[i];

                total_price_counter += Number(item.price) * Number(item.quantity);
            }

            total_price.innerText = `${total_price_counter.toFixed(2)}€`;
        }
    }

    // kada pritisnem alert_buy kaze korisniku da je kupio proizvode iz kosarice
    function alert_buy(){
        const buy_button = document.querySelector("#buy");

        buy_button.addEventListener("click", () =>{
            alert("Hvala na kupnji!")
        })

    }

    // ako je kosarica empty onda nam ova funkcija omogucuje da ispise poruku koja govori korisniku da je kosarica prazna
    async function isEmpty(){

        const res = await fetch("/cart/getAll", {
            method: "GET"
        })

        const product_in_cart = await res.json()
        
        if(product_in_cart.length == 0){
            const empty = document.createElement("h1");
            empty.textContent = "The cart is empty maybe try to buy something :D";

            cart_section.appendChild(empty);
        }
    }
    
    isEmpty();
    empty_cart();
    loadFromSession();
    total_price_update();
    alert_buy();
});
