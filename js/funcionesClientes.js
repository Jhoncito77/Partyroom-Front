function traerClientes() {
    $.ajax({
        url:"http://150.230.79.86:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            console.log(respuesta);
            crearTabla2(respuesta);
        }
        });
}

function crearTabla2(items){
    let myTable="<table border=1px>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idClient+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].password+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button onclick='editarCliente("+items[i].idClient+")'>Editar</button>";
        myTable+="<td> <button onclick='borrarCliente("+items[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").append(myTable);
}

function guardarCliente(){
    if($("#nameCliente").val() !== "" && $("#email").val() !== "" && $("#password").val() !== "" && $("#age").val() !== ""){
    let myData = {
        
        name:$("#nameCliente").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Client/save",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            
            name:$("#nameCliente").val("");
            email:$("#email").val("");
            password:$("#password").val("");
            age:$("#age").val("");
            traerClientes();
            alert("Guardado exitoso.");
            
        }
        });}else{
            alert("Todos los campos son requeridos");
        }
}

function editarCliente(idElemento){
    let newName = prompt("Nuevo nombre:");
    let newEmail = prompt("Nuevo email:");
    let newPassword = prompt("Nuevo password:");
    let newAge = prompt("Nueva edad:");
    let datos = {
        idClient:idElemento,
        name:newName,
        email:newEmail,
        password:newPassword,
        age:newAge
    }
    let dataToSend=JSON.stringify(datos);
    console.log(dataToSend);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            
            name:$("#nameCliente").val("");
            email:$("#email").val("");
            password:$("#password").val("");
            age:$("#age").val("");
            traerClientes();
            alert("Cliente actualizado");
            
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
        });
}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            traerClientes();
            alert("El registro se ha eliminado.");
            
        }
        });
}
