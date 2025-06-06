// sale button koji nas samo vodi do new collection dijela
document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("sale_button").addEventListener("click", () => {
        document.getElementById("secondBody_section").scrollIntoView({
            behavior: "smooth"
        });
    });
});