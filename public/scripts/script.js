

document.addEventListener("DOMContentLoaded", () =>{
    
    //---- Scroll top button --------
    window.addEventListener("scroll", () => {
        const button = document.getElementById("top_button");
        
        // ako skrolam vise od 100 px onda mi se prikaze dugme
        if (window.scrollY > 100) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });

    // kad pritisnem dugme vraca me na vrh stranice
    document.getElementById("top_button").addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    });


    function sizeButtons(){

        const sizes = document.getElementsByClassName("size");

        // iteriram kroz sve button-e
        for(let i = 0; i < sizes.length; i++){


                sizes[i].addEventListener("click", async () => {

                    const container = sizes[i].closest(".container");
                    const id = container ? container.getAttribute("data-id") : null;

                    if (!id) {
                        console.error("Data-id attribute not found on container!");
                        return;
                    }

                    const response = await fetch(`/cart/add/${id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ size: i % 6 }),
                    });

                    if (!response.ok) {
                        console.error("Fetch error:", response.status, response.statusText);
                    } else {
                        const data = await response.json();
                        console.log("Response:", data);
                    }


            });
        }

        for (let i = 0; i < sizes.length; i++) {
            sizes[i].addEventListener("click", () => {
        
                let previousSize = sizes[i].innerHTML;
        
                // Prikaz loadera
                sizes[i].innerHTML = '<div class="loader"></div>';
                const loader = sizes[i].querySelector(".loader");
        
                loader.style.border = '2px solid #27445D';
                loader.style.borderTop = '2px solid transparent';
                loader.style.borderRadius = '50%';
                loader.style.width = '1vmin';
                loader.style.height = '1vmin';
                loader.style.animation = 'spin 0.5s linear infinite';
        
                // Nakon 500ms, zamijeni loader sa check ikonom i ažuriraj krug
                setTimeout(() => {
                    sizes[i].innerHTML = '<img src="/images/icon_check.png" alt="" class="check">';
                    const check = sizes[i].querySelector(".check");
        
                    check.style.position = "absolute";
                    check.style.objectFit = "contain";
                    check.style.width = "90%";
                    check.style.height = "60%";


                    updateCart()
                    updateCounters()
        
                    // Vrati izvorni tekst nakon dodatnih 300ms
                    setTimeout(() => {
                        sizes[i].innerHTML = previousSize;
                    }, 300);
                }, 500);
            });
        }

    }

    const circle = document.getElementById("circle");

    async function updateCart(){

        const res = await fetch('/cart/number', {
            method: "GET"
        });

        if(!res.ok) throw new Error("nije dobro")

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
    


    //----- Counter for added item -----
    const counters = document.getElementsByClassName("counter");
    const product_picture = document.getElementsByClassName("product_picture");

    async function updateCounters(){  

        const res = await fetch("/cart/getAll", {
            method: "GET"
        })

        if(!res.ok) throw new Error("nije dobro")
        const data = await res.json()


        for(let i = 0; i < counters.length; i++){
            let counter = 0;

            for(let j = 0; j < data.length; j++){
                const item = data[j];
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

    updateCart()
    updateCounters()

    const kategorijeLink = document.querySelector(".kategorije");
        
    if (kategorijeLink) {
        kategorijeLink.addEventListener("click", async (event) => {
            event.preventDefault();
                
            try {
                const res = await fetch("/home/getCategories",{
                    method: "GET"
                });
                if(!res.ok) throw new Error("Network was not ok");
                const categories = await res.json();

                const kategorije_section = document.getElementById("kategorije_section");
                const kategorije_links = document.getElementById("kategorije_links");
                const black_screen = document.getElementById("whole_screen");

                // Čistimo stare linkove da ne dupliciramo
                kategorije_links.innerHTML = "";
                
                for(let i in categories){
                    const link = document.createElement("li");
                    link.classList.add("kategorije_link");


                    const a = document.createElement("a");
                    a.innerText = categories[i].name;
                    a.href = `/home/getProducts?id=${i}`;

                    link.appendChild(a);
                    kategorije_links.appendChild(link);
                }
            
                if(window.matchMedia("(max-width: 1024px)").matches){
                    kategorije_section.style.width = "40%";
                } else {
                    kategorije_section.style.width = "20%";
                }
            
                kategorije_links.style.display = "flex";
                black_screen.style.display = "block";
                setTimeout(() => {
                    kategorije_links.style.opacity = "1";
                }, 300);
                } catch(error) {
                    console.error("Greška pri učitavanju kategorija:", error);
                    alert("Došlo je do greške prilikom učitavanja kategorija.");
                }
            });
        } else {
            console.log("Element sa klasom '.kategorije' nije pronađen.");
        }

   

        const exitButton = document.getElementById("kategorije_exit");
        if (exitButton) {
            exitButton.addEventListener("click", () => {
                const kategorije_section = document.getElementById("kategorije_section");
                const kategorije_links = document.getElementById("kategorije_links");
                const black_screen = document.getElementById("whole_screen");

                kategorije_section.style.width = "0";
                kategorije_links.style.opacity = "0";
                setTimeout(() => {
                    kategorije_links.style.display = "none";
                    black_screen.style.display = "none";
                }, 300);
            });
        } else {
            console.warn("#kategorije_exit not found in DOM");
        }


    // ovaj dio stavlja cijeli screen da bude zatamljeniji dok su kategorije otvorene
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


    const url = window.location.href;
    const shouldDelay = url.includes("getProducts");

    if (shouldDelay) {
        setTimeout(() => {
            sizeButtons();
            updateCounters();
        }, 100);
    } else {
        sizeButtons();
        updateCounters();
    }
});