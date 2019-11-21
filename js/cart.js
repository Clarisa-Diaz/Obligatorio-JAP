let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";


function updateSubtotal(){
    let precioUni = parseInt(document.getElementById("precio").textContent);
    let cant = parseInt(document.getElementById("cantidad").value);
    subtotal = cant*precioUni;
    document.getElementById("subTotal").innerHTML = subtotal;
    document.getElementById("productCostText").innerHTML = subtotal;
}


function showArticles(array){
    let contenido = "";
    for (let i = 0; i<array.length; i++){
        articulo = array[i];
    contenido += `
        <tr>
            <td><img src="`+articulo.src+`" width="50px"></td>
            <td>`+articulo.name+`</td>
            <td id="precio">`+articulo.unitCost+`</td>
            <td><input type="number" name="count" id="cantidad" value="`+articulo.count+`"</td>
            <td>`+articulo.currency+`</td>
            <td><span id="subTotal"></span></td>
        </tr>
    `
    document.getElementById("infoTable").innerHTML = contenido;
    updateSubtotal(); 
    updateTotalCosts();
    document.getElementById("cantidad").addEventListener("change", function(){
        updateSubtotal();
        })
    }
}

function updateTotalCosts(){
    let costoEnvio = subtotal * shippingPercentage;
    document.getElementById("comissionText").innerHTML = costoEnvio;
    total = subtotal + costoEnvio;
    document.getElementById("totalCostText").innerHTML = total;
} 


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            showArticles(resultObj.data.articles);
        }
    });
});

//Hace los calculos de porccentaje para la compra 
document.getElementById("premium").addEventListener("change", function(){
    shippingPercentage = 0.15;
    updateTotalCosts();
});

document.getElementById("express").addEventListener("change", function(){
    shippingPercentage = 0.07;
    updateTotalCosts();
});

document.getElementById("standar").addEventListener("change", function(){
    shippingPercentage = 0.05;
    updateTotalCosts();
});

 //Hace que en el modal de pago se seleccione una forma y desabilita el otro 
document.getElementById("tarjradio").addEventListener("change", function(){
    document.getElementById("creditpay").disabled = false;
    document.getElementById("bankpay").disabled = true;
    document.getElementById("span1").innerHTML = CREDIT_CARD_PAYMENT;
});

document.getElementById("bankradio").addEventListener("change", function(){
    document.getElementById("bankpay").disabled = false;
    document.getElementById("creditpay").disabled = true;
    document.getElementById("codpay").disabled = true;
    document.getElementById("vencipay").disabled = true;
    document.getElementById("span1").innerHTML = BANKING_PAYMENT;
});

var form = document.getElementById("cartform");

form.addEventListener("submit", function(e){

    let productNameInput = document.getElementById("dire");

    productNameInput.classList.remove("is-invalid");

    if (productNameInput.value === "")
    {
        productNameInput.classList.add("is-invalid");
        infoMissing = true;
    }
    if(e.preventDefault) e.preventDefault();
    return false;
}); 