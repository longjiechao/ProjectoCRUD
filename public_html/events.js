/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//recarga todos los eventos
function loadAllEvents(){
    loadAllDeleteDoubleClick();
    loadAllDeleteDoubleClickSub();
    loadAllMod();
}

//recarga todos los botones de eliminar de las entradas
function loadAllDeleteDoubleClick(){
    var tr = document.getElementsByClassName("entrada");
    for(i = 0; i < tr.length; i++){
        tr[i].addEventListener("dblclick", function(e){
            console.log("a");
            var tr = document.getElementsByClassName("entrada");
            for(i = 0; i < tr.length; i++){
                if(tr[i] === e.target.parentNode){
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    character.splice(i, 1);
                    if(poder_generar_tabla()){
                        borrar_tabla();
                        generar_tabla_vacia();
                    }
                }
            }
        });
    }
}


//recarga todos los botones de eliminar de las subentradas
function loadAllDeleteDoubleClickSub(){
    var tr = document.getElementsByClassName("subentrada");
    for(i = 0; i < tr.length; i++){
        console.log(i);
        tr[i].addEventListener("dblclick", function(e){
            var tr = document.getElementsByClassName("subentrada");
            var id = document.getElementById("table").firstChild.firstChild.lastChild.firstChild.textContent;
            for(i = 0; i < tr.length; i++){
                if(tr[i] === e.target.parentNode){
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    for(y = 0; y < character.length; y++){
                        if(character[y].id == id){
                            console.log(y);
                            character[y].items.splice(i, 1);
                        }
                    }
                    if(tr.length == 0){
                        borrar_subEntrada();
                        generar_subtabla_vacia();
                    }
                }
            }
        });
    }
}

//carga todos los eventos para modificar una entrada
function loadAllMod(){
    var mod = document.getElementsByClassName("mod");
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

//crea todos los eventos para mostrar la tabla con su subtabla
//function loadAllSubTable(){
//    var showItem = document.getElementsByClassName("showItem");
//    for(i = 0; i < mod.length; i++){
//        showItem[i].addEventListener("click", function(e){
//            var showItem = document.getElementsByClassName("showItem");
//                for(i = 0; i < showItem.length; i++){
//                   if(showItem[i] == e.target){
//                       console.log(i);
//                   }
//               }
//        });
//    }
//}