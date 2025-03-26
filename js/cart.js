document.addEventListener("DOMContentLoaded", () => {

    // Dodavanje brojeva na dugmima za povecanje i smanjenje quantity-a
    const quantity = document.getElementById("quantity");

    quantity.innerHTML = `${Number(localStorage.getItem(`counter`))}`;
    document.getElementById("sub").addEventListener("click", () => {

        if(quantity.innerHTML != 0){
            quantity.innerHTML = `${Number(localStorage.getItem(`counter`)) - 1}`;
            localStorage.setItem("counter", `${Number(quantity.innerHTML)}`);
        }
    });

    document.getElementById("add").addEventListener("click", () => {
        quantity.innerHTML = `${Number(localStorage.getItem(`counter`)) + 1}`;
        localStorage.setItem("counter", `${Number(quantity.innerHTML)}`);
    })

});