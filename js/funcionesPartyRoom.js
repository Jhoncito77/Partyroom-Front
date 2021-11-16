function traerSalones() {
    $.ajax({
        url:"http://150.230.79.86:8080/api/Partyroom/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            console.log(respuesta);
            crearTabla(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.id'>'+name.name+'</option>');
                console.log("select"+name.id);
            })
        }
        }
        });
}

function crearTabla(items){
    let myTable="<table border=1px>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].owner+"</td>";
        myTable+="<td>"+items[i].capacity+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td> <button onclick='editarSalon("+items[i].id+")'>Detalles</button>";
        myTable+="<td> <button onclick='borrarSalon("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarSalon(){
    let myData = {
        
        owner:$("#owner").val(),
        capacity:$("#capacity").val(),
        name:$("#nameSalon").val(),
        description:$("#descriptionSalon").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Partyroom/save",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            
            owner:$("#owner").val("");
            capacity:$("#capacity").val("");
            name:$("#nameSalon").val("");
            description:$("#descriptionSalon").val("");
            traerSalones();
            alert("Guardado exitoso.");
            
        }
        });
}

function editarSalon(idElemento){
    let newOwner = prompt("Nuevo dueño:");
    let newCapacity = prompt("Capacidad:");
    let newName = prompt("Nombre:");
    let newDescription = prompt("Nueva descripcion");
    let myData = {
        id:idElemento,
        owner:newOwner,
        capacity:newCapacity,
        name:newName,
        description:newDescription,
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Partyroom/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            
            owner:$("#owner").val("");
            capacity:$("#capacity").val("");
            name:$("#nameSalon").val("");
            description:$("#descriptionSalon").val("");
            traerSalones();
            alert("Actualizado exitoso.");
            
        }
        });
}

function borrarSalon(idElemento){
    let myData={
        id:idElemento
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Partyroom/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerSalones();
            alert("El registro se ha eliminado.");
            
        }
        });
}
