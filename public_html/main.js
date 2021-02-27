/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//      (\d{0,4})?(,\d{0,4})*
//      \d(:\d)?
//      (B\d)?(K\d)?(C\d)?


window.onload = function(){
    que_tabla_generar();
    indexID.setCurID();
    loadAllMod();
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
    {id:1, name: "Isaac", hp:6, consumable:1, items:105, nameImage:"playername_01_isaac.png", portrait:"playerportraitbig_01_isaac.png", costume:-1, skinColor:"Default", canShoot:true, canFly:false},
    {id:2, name: "Magdalene", hp:8, consumable:1, items:45, nameImage:"playername_02_magdalene.png", portrait:"playerportraitbig_02_magdalene.png", costume:-1, skinColor:"Default", canShoot:true, canFly:false}
];

//array de los keys para el array json
var jsonKey = [
    "id", "name", "hp", "consumable", "items", "nameImage", "portrait", "costume", "skinColor", "canShoot", "canFly"
]

//array para mostrar en la tabla commo titulo
var titulo = [
    "ID", "Name", "HP", "Consumables", "Items", "Image's Name", "Portrait", "Costume",  "Skin Color", "Shoot", "Fly"
];

//decide que tabla generar
function que_tabla_generar(){
    borrar_form();
    if(poder_generar_tabla()){
        generar_tabla_vacia();
    }else{
        generar_tabla();
    }
}

//comprueba si la se puede generar la tabla o no
function poder_generar_tabla(){
    if(character.length == 0){
        return true;
    }else{
        return false;
    }
}

//funcion que se usa cuando el array json no hay entradas (excepto el primero)
function generar_tabla_vacia(){
    var div = document.getElementById("table");
    var h3 = document.createElement("h3");
    var text = document.createTextNode("No hay ningúna entrada, por favor inserte una");
    h3.appendChild(text);
    div.appendChild(h3);
    
    //boton de insertar
    var button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", generar_form);
    button.type = "button";
    text = document.createTextNode("Insertar");
    button.appendChild(text);
    div.appendChild(button);
}

//genera la tabla en el div de tabla
function generar_tabla() {
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
            var td =  document.createElement("td");
            
            //El switch sirve para los imagenes
            switch(i){
                case 0:
                    var text = document.createTextNode(characterValue[i]);
                    var button = document.createElement("button");
                    button.appendChild(text);
                    button.type = "button";
                    button.className = "mod";
                    td.appendChild(button);
                    break;
                case 5:
                    var img = document.createElement("img");
                    img.src = "gfx/nameImage/"+characterValue[i];
                    img.style['pointer-events'] = 'none';
                    td.appendChild(img);
                    break;
                case 6:
                    var img = document.createElement("img");
                    img.src = "gfx/playerPortrairBig/"+characterValue[i];
                    img.style['pointer-events'] = 'none';
                    td.appendChild(img);
                    break;
                    
                default:
                    var text = document.createTextNode(characterValue[i]);
                    td.appendChild(text);
                    break;
            }

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
    tabla.appendChild(tbody);
    div.appendChild(tabla);
    
     //boton de insertar
    var button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", generar_form);
    button.type = "button";
    text = document.createTextNode("Insertar");
    button.appendChild(text);
    div.appendChild(button);
    
    //para generar los botones de borrar las entradas
//    borrar_entrada();
    
    //Recarga todos los eventos
    loadAllEvents();
    
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

//genera el formulario
function generar_form(){
    borrar_tabla();
    var div = document.getElementById("insert");
    var form = document.createElement("form");
    form.setAttribute("class", "form");
    var input, select, option;
    var text;
    var button;
    
    //Name
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "Name";
    input.required = true;
    form.appendChild(input);
    
    //HP
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "HP";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Consumables
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "Consumables";
    form.appendChild(input);
    
    //Items
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "Items";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Image's Name
    input = document.createElement("input");
    input.name = "info";
    input.type = "file";
    input.placeholder = "Image's Name";
    input.required = true;
    input.accept = "image/*";
    form.appendChild(input);
    
    //Portrait
    input = document.createElement("input");
    input.name = "info";
    input.type = "file";
    input.placeholder = "Portrait";
    input.required = true;
    input.accept = "image/*";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Costume
    input = document.createElement("input");
    input.name = "info";
    input.type = "number";
    input.min = -1;
    input.placeholder = "Costume";
    form.appendChild(input);
    
    //skinColor
    select = document.createElement("select");
    select.name = "info";
        //options
        option = document.createElement("option");
        text = "Default";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Brown";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Red";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Black";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Green";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
    
    form.appendChild(select);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //canShoot
    input = document.createElement("input");
    input.name = "info";
    input.className = "check";
    input.type = "checkbox";
    form.appendChild(input);
    form.appendChild(document.createTextNode("canShoot"));
    
    //canFly
    input = document.createElement("input");
    input.name = "info";
    input.className = "check";
    input.type = "checkbox";
    form.appendChild(input);
    form.appendChild(document.createTextNode("canFly"));
    
    //BR
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    
    //boton de insertar
    button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", guardar_informacion);
    button.type = "submit";
    text = document.createTextNode("Insert");
    button.appendChild(text);
    form.appendChild(button);
    
    //boton de resetear
    button = document.createElement("button");
    button.className = "button insert";
    button.type = "reset";
    text = document.createTextNode("Reset");
    button.appendChild(text);
    form.appendChild(button);
    
    //boton de cancelar
    button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", que_tabla_generar);
    button.type = "button";
    text = document.createTextNode("Cancel");
    button.appendChild(text);
    form.appendChild(button);
    
    div.appendChild(form);
}

//Borra la tabla
function borrar_tabla(){
    var table = document.getElementById("table");
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
}

//Borra el formulario
function borrar_form(){
    var insert = document.getElementById("insert");
    while (insert.hasChildNodes()) {
        insert.removeChild(insert.firstChild);
    }
}

function modificar_tabla(charact){
    borrar_tabla();
    var div = document.getElementById("insert");
    var form = document.createElement("form");
    form.setAttribute("class", "form");
    var input, select, option;
    var text, h1;
    var button;
    
    text = document.createTextNode("ID: " + charact.id + " ");
    h1 = document.createElement("h1");
    h1.appendChild(text);
    form.appendChild(h1);
    
    //Name
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "Name";
    input.required = true;
    form.appendChild(input);
    
    //HP
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "HP";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Consumables
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "Consumables";
    form.appendChild(input);
    
    //Items
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "Items";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Image's Name
    input = document.createElement("input");
    input.name = "info";
    input.type = "file";
    input.placeholder = "Image's Name";
    input.accept = "image/*";
    form.appendChild(input);
    
    //Portrait
    input = document.createElement("input");
    input.name = "info";
    input.type = "file";
    input.placeholder = "Portrait";
    input.accept = "image/*";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Costume
    input = document.createElement("input");
    input.name = "info";
    input.type = "number";
    input.min = -1;
    input.placeholder = "Costume";
    form.appendChild(input);
    
    //skinColor
    select = document.createElement("select");
    select.name = "info";
        //options
        option = document.createElement("option");
        text = "Default";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Brown";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Red";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Black";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Green";
        option.value = text;
        option.innerHTML = text;
        select.appendChild(option);
    
    form.appendChild(select);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //canShoot
    input = document.createElement("input");
    input.name = "info";
    input.className = "check";
    input.type = "checkbox";
    form.appendChild(input);
    form.appendChild(document.createTextNode("canShoot"));
    
    //canFly
    input = document.createElement("input");
    input.name = "info";
    input.className = "check";
    input.type = "checkbox";
    form.appendChild(input);
    form.appendChild(document.createTextNode("canFly"));
    
    //BR
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    
    //boton de actualizar
    button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", actualizar_informacion);
    button.type = "button";
    text = document.createTextNode("Actalizar");
    button.appendChild(text);
    form.appendChild(button);
    
    //boton de cancelar
    button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", que_tabla_generar);
    button.type = "button";
    text = document.createTextNode("Cancel");
    button.appendChild(text);
    form.appendChild(button);
    
    div.appendChild(form);
    
    
    var insertForm = document.getElementsByName("info");
    var imgName;
    var imgPortrait;
    for (i = 0; i <= insertForm.length; i++){
        if(i == 9 || i == 10){
            insertForm[i-1].checked = charact[jsonKey[i]];
        }else if(i == 5){
            imgName = charact[jsonKey[i]];
        }else if(i ==6){
            imgPortrait = charact[jsonKey[i]];
        }else if(i != 0){
            insertForm[i-1].value = charact[jsonKey[i]];
        }
    }
}

//coge todo del formulario y lo pone en el JSON
function guardar_informacion(){
    var insertForm = document.getElementsByName("info");
    var newRegistro = {};
    for (i = 0; i < insertForm.length+1; i++){
        switch(i){
            case 0:
                newRegistro[jsonKey[i-1]] = indexID.getID();
                indexID.addID();
                break;
            case 9: 
            case 10:
                newRegistro[jsonKey[i-1]] = insertForm[i-1].checked;
                break;
            default:
                var insert = insertForm[i-1].value;
                insert = insert.replace(/.*\\/, "");
                newRegistro[jsonKey[i-1]] = insert;
                break;
        }
        if(i != 0) console.log("I: " + i + "key: " + jsonKey[i-1] + "  value: " + insertForm[i-1].value);
    }
    character.push(newRegistro);
    borrar_form();
    que_tabla_generar();
}

function actualizar_informacion(){
    var insertForm = document.getElementsByName("info");
    var id = document.getElementsByTagName("h1").title;
    
    for(i = 0; i < character.length; i++){
        console.log(character[i].id);
        console.log(id);
    }
    
//    for (i = 0; i < insertForm.length+1; i++){        
//        switch(i){
//            case 0:
//                newRegistro[jsonKey[i-1]] = indexID.getID();
//                indexID.addID();
//                break;
//            case 9: 
//            case 10:
//                newRegistro[jsonKey[i-1]] = insertForm[i-1].checked;
//                break;
//            default:
//                var insert = insertForm[i-1].value;
//                insert = insert.replace(/.*\\/, "");
//                newRegistro[jsonKey[i-1]] = insert;
//                break;
//        }
//        if(i != 0) console.log("I: " + i + "key: " + jsonKey[i-1] + "  value: " + insertForm[i-1].value);
//    }
//    character.push(newRegistro);
//    borrar_form();
//    que_tabla_generar();
}
