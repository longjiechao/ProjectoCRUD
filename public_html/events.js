/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.getElementById("deletebt").addEventListener("click", generar_form);
document.getElementById("showbt").addEventListener("click", que_tabla_generar);

//recarga todos los eventos
function loadAllEvents(){
    loadAllDeleteDoubleClick();
}

//recarga todos los botones de eliminar del 
function loadAllDeleteDoubleClick(){
    var tr = document.getElementsByTagName("tr");
    for(i = 1; i < tr.length; i++){
        tr[i].addEventListener("dblclick", function(e){
            var tr = document.getElementsByTagName("tr");
            for(i = 1; i < tr.length; i++){
                if(tr[i] === e.target.parentNode){
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    character.splice(i-1, 1);
                    if(poder_generar_tabla()){
                        borrar_tabla();
                        generar_tabla_vacia();
                    }
                }
            }
        });
    }
}