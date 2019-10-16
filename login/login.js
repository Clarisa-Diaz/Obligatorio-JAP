function guardarDatos(){

var usuario = "";

usuario = document.getElementById("login").value
sessionStorage.setItem('usuario', usuario);
}


