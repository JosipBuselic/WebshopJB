

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
        kategorije_links.style.display = "flex";
        setTimeout(() => {
            kategorije_links.style.opacity = "1";
        }, 300);
    });

    document.getElementById("kategorije_exit").addEventListener("click", () =>{
        const kategorije_section = document.getElementById("kategorije_section");
        const kategorije_links = document.getElementById("kategorije_links");

        kategorije_section.style.width = "0";
        kategorije_links.style.opacity = "0";
        setTimeout(() => {
            kategorije_links.style.display = "none";
        },300);
    });

    //----- Counter for added item -----
    const counters = document.getElementsByClassName("counter");
    const sizes = document.getElementsByClassName("size");
    for(let i = 0; i < sizes.length; ++i){
        sizes[i].addEventListener("click", () => {
            number = Math.floor(i/6); // broj za koji counter govorimo
            console.log(number);
            console.log(counters[number]);
            let currentValue = Number(counters[number].innerHTML);
            currentValue++;
            counters[number].innerHTML = `${currentValue}`;

            if(counters[number] != 0){
                counters[number].style.display = "block";
            }
        });
    }
    
    // ------ Image slider -------
    const first = document.getElementById("first_circle");
    const second = document.getElementById("second_circle");
    const third = document.getElementById("third_circle");

    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");
    const row3 = document.getElementById("row3");
    first.addEventListener("click", () => {
        first.style.backgroundColor = "var(--tamno_plava)";
        second.style.backgroundColor = "var(--tamno_plava_lower)";
        third.style.backgroundColor = "var(--tamno_plava_lower)";

        row1.style.display = "flex";
        row2.style.display = "none";
        row3.style.display = "none";
    
        setTimeout(() => {
            row1.style.opacity = "1";
            row2.style.opacity = "0";
            row3.style.opacity = "0";
        }, 50);

   });
    
   second.addEventListener("click", () => {
    first.style.backgroundColor = "var(--tamno_plava_lower)";
    second.style.backgroundColor = "var(--tamno_plava)";
    third.style.backgroundColor = "var(--tamno_plava_lower)";

    row1.style.display = "none";
    row2.style.display = "flex";
    row3.style.display = "none";

    setTimeout(() => {
        row1.style.opacity = "0";
        row2.style.opacity = "1";
        row3.style.opacity = "0";
    }, 50);

   });

   third.addEventListener("click", () => {
    first.style.backgroundColor = "var(--tamno_plava_lower)";
    second.style.backgroundColor = "var(--tamno_plava_lower)";
    third.style.backgroundColor = "var(--tamno_plava)";

    row1.style.display = "none";
    row2.style.display = "none";
    row3.style.display = "flex";

    setTimeout(() => {
        row1.style.opacity = "0";
        row2.style.opacity = "0";
        row3.style.opacity = "1";
    }, 50);

   });

});