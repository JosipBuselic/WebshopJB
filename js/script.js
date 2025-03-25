

document.addEventListener("DOMContentLoaded", () =>{
    
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

    
    const sizeElements = document.getElementsByClassName("size");
    let countForCart = 0;
    
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
            loader.style.width = '10px';
            loader.style.height = '10px';
            loader.style.animation = 'spin 0.5s linear infinite';
    
            // Nakon 500ms, zamijeni loader sa check ikonom i ažuriraj krug
            setTimeout(() => {
                sizeElements[i].innerHTML = '<img src="images/icon_check.png" alt="" class="check">';
                const check = sizeElements[i].querySelector(".check");
    
                check.style.position = "absolute";
                check.style.objectFit = "contain";
                check.style.width = "90%";
                check.style.height = "60%";
    
                circle.innerHTML = ++countForCart;
    
                if (countForCart !== 0) {
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

    // Kategorije tab
    document.getElementById("kategorije").addEventListener("click", () =>{
        const kategorije_section = document.getElementById("kategorije_section");
        const kategorije_links = document.getElementById("kategorije_links");

        kategorije_section.style.width = "20%";
        setTimeout(() => {
            kategorije_links.style.opacity = "1";
        }, 300);
    });

    document.getElementById("kategorije_exit").addEventListener("click", () =>{
        const kategorije_section = document.getElementById("kategorije_section");
        const kategorije_links = document.getElementById("kategorije_links");

        kategorije_section.style.width = "0";
        kategorije_links.style.opacity = "0";
    });
    

});