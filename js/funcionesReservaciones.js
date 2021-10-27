function traerReservaciones() {
    $.ajax({
        url:"http://150.230.79.86:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            console.log(respuesta);
            crearTabla5(respuesta);
        }
        });
}

function crearTabla5(items){
    let myTable="<table border=1px>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idReservation+"</td>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        
        myTable+="<td> <button onclick='editarReservacion("+items[i].idReservation+")'>Detalles</button>";
        myTable+="<td> <button onclick='borrarReservacion("+items[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservaciones").append(myTable);
}

function guardarReservacion(){
    let myData = {
        
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Reservation/save",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            
            startDate:$("#startDate").val("");
            devolutionDate:$("#devolutionDate").val("");
            
            traerReservaciones();
            alert("Guardado exitoso.");
            
        }
        });
}

function editarReservacion(idElemento){
    let fecha1 = prompt("Nueva fecha de inicio (aaaa/mm/dd):").split("/");
    let fecha2 = prompt("Nueva fecha de devolucion (aaaa/mm/dd):").split("/");
    
    newStartdate = new Date(fecha1[0],fecha1[1],fecha1[2]);
    newdevolutionDate= new Date(fecha2[0], fecha2[1], fecha2[2]);
    console.log(newStartdate,newdevolutionDate);
    let myData = {
        idReservation:idElemento,
        startDate:newStartdate,
        devolutionDate:newdevolutionDate,
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            
            startDate:$("#startDate").val("");
            devolutionDate:$("#devolutionDate").val("");
            
            traerReservaciones();
            alert("Actualizado exitoso.");
            
        }
        });
}

function borrarReservacion(idElemento){
    let myData={
        idReservation:idElemento
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            traerReservaciones();
            alert("El registro se ha eliminado.");
            
        }
        });
}