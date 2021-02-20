/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.getElementById("insertbt").addEventListener("click", guardar_informacion);
document.getElementById("deletebt").addEventListener("click", borrar_tabla);
document.getElementById("showbt").addEventListener("click", genera_tabla);

window.onload = function(){
    genera_tabla();
    indexID.setCurID();
};

//gestiona el tema del ID
var indexID = {
    id : 0,
    getID : function(){
        return this.id;
    },
    setID : function(newID){
        this.id = newID;
    },
    addID : function(){
        this.id++;
    },
    //busca el id maximo actual +1
    setCurID : function(){
        var max = 0;
        if(character != null){
            for(i in character){
                if(character[i]["id"] > max){
                    max = character[i]["id"];
                }
            }
        }
        this.setID(max);
        this.addID();
    }
};

//array json donde se guarda las entradas
var character = [
    {id:1, name: "Isaac", hp:6, consumable:1, items:105, nameImage:"playername_01_isaac.png", portrait:"playerportraitbig_01_isaac.png", costume:"Default", skinColor:-1, canShoot:true, canFly:false},
    {id:2, name: "Magdalene", hp:8, consumable:1, items:45, nameImage:"playername_02_magdalene.png", portrait:"playerportraitbig_02_magdalene.png", costume:"Default", skinColor:-1, canShoot:true, canFly:false}
];

//array de los keys para el array json
var jsonKey = [
    "id", "name", "hp", "consumable", "items", "nameImage", "portrait", "costume", "skinColor", "canShoot", "canfly"
]

//array para mostrar en la tabla commo titulo
var titulo = [
    "ID", "Name", "HP", "Consumables", "Items", "Image's Name", "Portrait", "Costume",  "Skin Color", "Shoot", "Fly"
];

//genera la tabla en el div de tabla
function genera_tabla() {
    // Obtener la referencia del elemento body
    var div = document.getElementById("table");

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    tabla.setAttribute("class", "table");
    var tbody = document.createElement("tbody");
  
  //Poner el titulo de la tabla
    var tr = document.createElement("tr");
    for (var i = 0; i < titulo.length; i++) {
        var celda = document.createElement("th");
        var text = document.createTextNode(titulo[i]);
        celda.appendChild(text);
        tr.appendChild(celda);
    }
    tbody.appendChild(tr);
    
    //Poner los elementos en la tabla, cogiendo del JSON
    for(i in character){
        var tr = document.createElement("tr");
        var characterValue = Object.values(character[i]);
        for (i = 0; i < characterValue.length; i++){
            var celda = document.createElement("td");
            
            //El switch sirve para los imagenes
            switch(i){
                case 5:
                    var img = document.createElement("img");
                    img.src = "gfx/nameImage/"+characterValue[i];
                    celda.appendChild(img);
                    break;
                case 6:
                    var img = document.createElement("img");
                    img.src = "gfx/playerPortrairBig/"+characterValue[i];
                    celda.appendChild(img);
                    break;
                    
                default:
                    var text = document.createTextNode(characterValue[i]);
                    celda.appendChild(text);
                    break;
            }

            tr.appendChild(celda);
        }
        tbody.appendChild(tr);
    }
    
    tabla.appendChild(tbody);
    div.appendChild(tabla);
    
    
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

//Borra la tabla
function borrar_tabla(){
    document.getElementById("table").innerHTML = "";
}

//coge todo del formulario y lo pone en el JSON
function guardar_informacion(){
    var insertForm = document.getElementById("insert").firstElementChild.children;
    var newRegistro = {};
    for (i = 0; i < insertForm.length; i++){
        switch(i){
            case 0:
                newRegistro[jsonKey[i]] = indexID.getID();
                indexID.addID();
                break;
            case 8: 
            case 9:
                newRegistro[jsonKey[i]] = insertForm[i].checked;
                break;
            default:
                newRegistro[jsonKey[i]] = insertForm[i].value;
                break;
        }
        
    }
    character.push(newRegistro);
    console.log(character);
}