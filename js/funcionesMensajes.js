function traerMensajes() {
    $.ajax({
        url:"http://150.230.79.86:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensaje").empty();
            console.log(respuesta);
            crearTabla3(respuesta);
        }
        });
}

function crearTabla3(items){
    let myTable="<table border=1px style='background-color:white; border:2px solid green;'>";
    myTable+="<th>ID</th><th>Mensaje</th><th colspan='2'>Acciones</th>"
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idMessage+"</td>";
        myTable+="<td>"+items[i].messageText+"</td>";
        myTable+="<td> <button onclick='editarMensaje("+items[i].idMessage+")'>Editar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+items[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensaje").append(myTable);
}

function guardarMensaje(){
    if($("#messagetext").val() !== ""){
    let myData = {
        
        messageText:$("#messagetext").val()
    }
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Message/save",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensaje").empty();
            
            messageText:$("#messagetext").val("");
            traerMensajes();
            alert("Guardado exitoso.");
            
        }
        });}else{
            alert("No es posible enviar mensajes vacios")
        }
}



function editarMensaje(idElemento){
    let MensajeEditado = prompt("Actualizacion de mensaje:");
    let datos = {
        idMessage:idElemento,
        messageText:MensajeEditado
    }
    let dataToSend=JSON.stringify(datos);
    console.log(dataToSend);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensaje").empty();
            
            messageText:$("#messagetext").val("");
            traerMensajes();
            alert("El mensaje fue actualizado.");
            
        }
        });
}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensaje").empty();
            traerMensajes();
            alert("El registro del mensaje se ha eliminado.");
            
        }
        });
}
