let Y, R;
document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("submit-button").addEventListener("click", click_button);
    document.getElementById("clear-button").addEventListener("click", clear_button);
});
function check_Y() {
    let X_text = document.getElementById("coordinate-x");
    let Y_text = document.getElementById("Y-text");
    let Y_value = Y_text.value;
    Y = Number(Y_value);
    if(Y_value.trim() === ""){
        Y_text.setCustomValidity("Поле не может быть пустым!");
        return false;
    }
    else if(isNaN(Y)){
        Y_text.setCustomValidity("В поле должно быть лишь число!");
        console.log("wtf")
        return false;
    }else if(Y<=-3 || Y >= 3){
        Y_text.setCustomValidity("Значения должны быть в диапозоне от -3 до 3!");
        return false;
    }
        Y_text.setCustomValidity("");
        console.log("all is good!");
        return true;
}
function check_R(){
    let R_text = document.getElementById("R-text");
    let R_value = R_text.value;
    R = Number(R_value);
    if(R_value.trim() === ""){
        R_text.setCustomValidity("Поле не может быть пустым!");
        return false;
    }
    else if(isNaN(R)){
        R_text.setCustomValidity("Значение R должно быть числом!");
        return false;
    }
    else if(R<0){
        R_text.setCustomValidity("Значение R не может быть отрицательным!");
        return false;
    }
    else if(R<=1 || R>=4){
        R_text.setCustomValidity("Значение R должно лежать в промежутке от 1 до 4");
        return false;
    }
    R_text.setCustomValidity("");
    return true;
}

function add_X(){
    let X_text = document.getElementById("coordinate-x");
}
function click_button(event){
    if(!check_Y()) return;
    if(!check_R()) return;
    add_X();
    event.preventDefault();

    let X_text = document.getElementById("coordinate-x").value;
    let Y_text = document.getElementById("Y-text").value;
    let R_text = document.getElementById("R-text").value;
    console.log(X_text, Y_text, R_text);

    let requestValue = ("?X=" + X_text + "&Y=" + Y_text + "&R=" + R_text);

    fetch("php/check-hit.php" + requestValue).
        then(response => response.text()).
        then(response => document.getElementById("table").innerHTML += response)
}

function clear_button(event) {
    event.preventDefault();
    fetch("php/clear_table.php").
        then(response => response.text()).
        then(response => document.getElementById("table").innerHTML = response)
}


