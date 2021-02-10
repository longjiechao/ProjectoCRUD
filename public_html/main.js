/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function(){
    genera_tabla();
};

var character = [
    {id:1, name: "Isaac", hp:6,armor:0, black:0, bombs:1, items:105, nameImage:"PlayerName_01_Isaac.png", portrait: "PlayerPortrait_01_Isaac.png", bigportrait:"PlayerPortraitBig_01_Isaac.png", costume:-1, skinColor:-1, canShoot:true},
    {id:2, name: "Magdalene", hp:8, armor:0, black:0, bombs:1, items:45, nameImage:"PlayerName_02_Magdalene.png", portrait: "PlayerPortrait_02_Magdalene.png", bigportrait:"PlayerPortraitBig_02_Magdalene.png", costume:-1, skinColor:-1, canShoot:true}
];

var titulo = [
    "id", "name", "hp", "armor", "black", "bombs", "items", "nameImage", "portrait", "bigportrait", "costume",  "skinColor", "canShoot"
];

function genera_tabla() {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    var hilera = document.createElement("tr");
    for (var j = 0; j < titulo.length; j++) {
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(titulo[j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tblBody.appendChild(hilera);
    
    for(i in character){
        var hilera = document.createElement("tr");
        var characterValue = Object.values(character[i]);
        for (i = 0; i < characterValue.length; i++){
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(characterValue[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }
    


    
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    
    
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}