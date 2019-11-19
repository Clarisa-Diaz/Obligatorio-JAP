let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = "";
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

//Se obtiene el formulario de publicación de producto
var cartForm = document.getElementById("cart-info");

//Se agrega una escucha en el evento 'submit' que será
//lanzado por el formulario cuando se seleccione 'Vender'.
cartForm.addEventListener("submit", function(e){

    let productNameInput = document.getElementById("productName");
    let productCategory = document.getElementById("productCategory");
    let productCost = document.getElementById("productCostInput");
    let infoMissing = false;

    //Quito las clases que marcan como inválidos
    productNameInput.classList.remove('is-invalid');
    productCategory.classList.remove('is-invalid');
    productCost.classList.remove('is-invalid');

    //Se realizan los controles necesarios,
    //En este caso se controla que se haya ingresado el nombre y categoría.
    //Consulto por el nombre del producto
    if (productNameInput.value === "")
    {
        productNameInput.classList.add('is-invalid');
        infoMissing = true;
    }
    
    //Consulto por la categoría del producto
    if (productCategory.value === "")
    {
        productCategory.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por el costo
    if (productCost.value <=0)
    {
        productCost.classList.add('is-invalid');
        infoMissing = true;
    }
    
    if(!infoMissing)
    {
        //Aquí ingresa si pasó los controles, irá a enviar
        //la solicitud para crear la publicación.

        getJSONData(PUBLISH_PRODUCT_URL).then(function(resultObj){
            let msgToShowHTML = document.getElementById("resultSpan");
            let msgToShow = "";

            //Si la publicación fue exitosa, devolverá mensaje de éxito,
            //de lo contrario, devolverá mensaje de error.
            if (resultObj.status === 'ok')
            {
                msgToShow = resultObj.data.msg;
            }
            else if (resultObj.status === 'error')
            {
                msgToShow = ERROR_MSG;
            }

            bootbox.alert(msgToShow, null);
        });
    }

    //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
    if (e.preventDefault) e.preventDefault();
        return false;
});
});