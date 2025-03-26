document.addEventListener("DOMContentLoaded", () => {

    function loadFromLocalStorage(){
        let product_in_cart = JSON.parse(localStorage.getItem("cart"));
        const cart_section = document.getElementById("cart_section");
        for(let i = 0; i < product_in_cart.length; i++){
            const item = JSON.parse(product_in_cart[i]);

            // radim div element
            const div = document.createElement("div");
            div.classList.add("element");

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

            name.textContent = `size: ${item.name}`;
            size.textContent = `size: ${item.size}`;
            price.textContent = `size: ${item.price}`;

            childdiv1.appendChild(name);
            childdiv1.appendChild(size);
            childdiv1.appendChild(price);

            // kreiram dugma koja ce nam reci quantity za neki item koliko smo ga uzeli
            const sub = document.createElement("button");
            const quantity = document.createElement("h3");
            const add = document.createElement("button");

            sub.innerText = "<";
            add.innerText = ">";
            quantity.innerText = item.quantity;

            sub.classList.add("sub");
            quantity.classList.add("quantity");
            add.classList.add("add");

            childdiv2.appendChild(sub);
            childdiv2.appendChild(quantity);
            childdiv2.appendChild(add);
        }
    }
    
    loadFromLocalStorage();

    let subs = document.getElementsByClassName("sub");
    const product_in_cart = JSON.parse(localStorage.getItem("cart")) || [];
    for(let i = 0; i < subs.length; i++){
        subs = document.getElementsByClassName("sub");
        subs[i].addEventListener("click", () =>{


            const quantitys = document.getElementsByClassName("quantity");
            const elements = document.getElementsByClassName("element");

            console.log(i);
            quantitys[i].innerText = Number(quantitys[i].innerText) - 1;
            

            if(quantitys[i].innerText == 0){
                elements[i].remove();
                
                for(let j = i; j < product_in_cart.length && j + 1 != product_in_cart.length; j++){
                    let help = product_in_cart[j];
                    product_in_cart[j] = product_in_cart[j + 1];
                    product_in_cart[j + 1] = help;
                    
                }   
                
                product_in_cart.pop();

            }
            else{
                let cartItem = JSON.parse(product_in_cart[i]);
                cartItem.quantity -= 1;
                product_in_cart[i] = JSON.stringify(cartItem);
            }


            localStorage.setItem("cart", JSON.stringify(product_in_cart));

            cartCount();

            window.location.href = "../cart.html"; // dodao sam kad se kliknu da se mora ucitati opet site
        });
    }

    const adds = document.getElementsByClassName("add");
    for(let i = 0; i < adds.length; i++){
        adds[i].addEventListener("click", () =>{
            const quantitys = document.getElementsByClassName("quantity");
            const item = JSON.parse(product_in_cart[i]);
            const circle = document.getElementById("circle");

            quantitys[i].innerText = Number(quantitys[i].innerText) + 1;

            let cartItem = JSON.parse(product_in_cart[i]);
            cartItem.quantity += 1;
            product_in_cart[i] = JSON.stringify(cartItem);

            localStorage.setItem("cart", JSON.stringify(product_in_cart));

            cartCount();

            window.location.href = "../cart.html";
        });
    }

    //funkcija za refreshanje broja na kosarici
    function cartCount(){
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
        else{
            circle.style.display = "none";
        }
    }
});
