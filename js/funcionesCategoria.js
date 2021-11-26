function traerCategoria() {
    $.ajax({
        url:"http://150.230.79.86:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategoria").empty();
            crearTabla4(respuesta);
            
            let $select = $("#select-category");
            $select.empty();
            for(i=0;i<respuesta.length;i++){
                $select.append('<option value='+respuesta[i].id+'>'+respuesta[i].name+'</option>');
            }
            
        } 
        });
    
}

function crearTabla4(items){
    let myTable="<table border=1px style='background-color:white; border:2px solid green;'>";
    myTable+="<th>ID</th><th>Nombre Categoria</th><th>Descripción</th><th colspan='2'>Acciones</th>"
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        
        myTable+="<td> <button onclick='editarCategoria("+items[i].id+")'>Editar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCategoria").append(myTable);
}

function guardarCategoria(){
    if($("#nameCategoria").val() !== "" && $("#descriptionCategoria").val() !== ""){
        
    let myData = {
        
        name:$("#nameCategoria").val(),
        description:$("#descriptionCategoria").val(),
        
        
    }
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Category/save",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategoria").empty();
            
            name:$("#nameCategoria").val("");
            description:$("#descriptionCategoria").val("");
            
            traerCategoria();
            alert("Guardado exitoso.");
            
        }
        });}else{
            alert("Todos los campos son requeridos");
        }
}

function editarCategoria(idElemento){
    let newName = prompt("Nuevo nombre:");
    let newDescripcion = prompt("Descripcion:");
    
    let myData = {
        id:idElemento,
        name:newName,
        description:newDescripcion,
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategoria").empty();
            
            name:$("#nameCategoria").val("");
            description:$("#descriptionCategoria").val("");
            
            traerCategoria();
            alert("Actualizado exitoso.");
            
        }
        });
}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.79.86:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategoria").empty();
            traerCategoria();
            alert("El registro se ha eliminado.");
            
        }
        });
}