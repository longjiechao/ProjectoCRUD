/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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

function loadAllMod(){
    var mod = document.getElementsByClassName("mod");
    console.log(mod);
    for(i = 0; i < mod.length; i++){
        mod[i].addEventListener("keypress", function(e){
            if(e.keyCode === 13){
                var mod = document.getElementsByClassName("mod");
               for(i = 0; i < mod.length; i++){
                   if(mod[i] == e.target){
                       console.log(character[i]);
                       modificar_tabla(character[i]);
                   }
               }
            }
        });
    }
}