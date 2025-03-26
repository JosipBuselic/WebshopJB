document.addEventListener("DOMContentLoaded", () =>{
    
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
