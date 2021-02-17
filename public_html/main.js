/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//\d(:\d)?
//(B\d)?(K\d)?(C\d)?

window.onload = function(){
    genera_tabla();
};

var character = [
    {id:1, name: "Isaac", hp:6, bombs:1, items:105, nameImage:"playername_01_isaac.png", bigportrait:"playerportraitbig_01_isaac.png", costume:"Default", skinColor:-1, canShoot:true, canFly:false},
    {id:2, name: "Magdalene", hp:8, bombs:1, items:45, nameImage:"playername_02_magdalene.png", bigportrait:"playerportraitbig_02_magdalene.png", costume:"Default", skinColor:-1, canShoot:true, canFly:false}
];

var titulo = [
    "ID", "Name", "HP", "Consumables", "Items", "Image's Name", "Portrait", "Costume",  "Skin Color", "Shoot", "Fly"
];

function genera_tabla() {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    tabla.setAttribute("class", "table");
    var tbody = document.createElement("tbody");
  
    var tr = document.createElement("tr");
    for (var i = 0; i < titulo.length; i++) {
        var celda = document.createElement("th");
        var text = document.createTextNode(titulo[i]);
        celda.appendChild(text);
        tr.appendChild(celda);
    }
    tbody.appendChild(tr);
    
    for(i in character){
        var tr = document.createElement("tr");
        var characterValue = Object.values(character[i]);
        for (i = 0; i < characterValue.length; i++){
            var celda = document.createElement("td");
            
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
            
//            if(i == 7 || i == 8 || i == 9){
//                var img = document.createElement("img");
//                img.setAttribute("src", "gfx/"+characterValue[i]);
//                celda.appendChild(img);
//            }else{
//                var text = document.createTextNode(characterValue[i]);
//                celda.appendChild(text);
//            }

            tr.appendChild(celda);
        }
        tbody.appendChild(tr);
    }
    


    
    tabla.appendChild(tbody);
    body.appendChild(tabla);
    
    
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}