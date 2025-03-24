
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
});