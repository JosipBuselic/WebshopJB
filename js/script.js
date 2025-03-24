let countForCart = 0;
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
    for (let i = 0; i < sizeElements.length; i++) {
        sizeElements[i].addEventListener("click", () => {
            const circle = document.getElementById("circle");
            circle.innerHTML = ++countForCart;
            if (countForCart !== 0) {
                circle.style.display = "flex";
                circle.style.textAlign = "center";
            }
        });
    }
});