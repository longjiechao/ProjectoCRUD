/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//item      (\d{0,4})?(,\d{0,4})*
//vida:escudo      \d(:\d)?
//consumable      (B\d)?(K\d)?(C\d)?


window.onload = function(){
    que_tabla_generar();
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
    {id:1,
        name: "Isaac",
        hp:6, consumable:"B1",
        items:[
            {   id:105,
                img: "collectibles_105_Dice.png",
                name:"The D6",
                descripcion:"Reroll your destiny",
                cargas: 6,
                tipo:"activa"}
        ],
        nameImage:"playername_01_isaac.png",
        portrait:"playerportraitbig_01_isaac.png",
        costume:-1,
        skinColor:"Default",
        canShoot:true,
        canFly:false},
    {id:2,
        name:"Magdalene",
        hp:8,
        consumable:"",
        items: "",
        nameImage:"playername_02_magdalene.png",
        portrait:"playerportraitbig_02_magdalene.png",
        costume:-1,
        skinColor:"Default",
        canShoot:true,
        canFly:false},
    {id:10,
        name:"The Lost",
        hp:0,
        consumable:"C1",
        items:[
            {   id:284,
                img: "collectibles_284_d4.png",
                name:"D4",
                descripcion:"Reroll into something else",
                cargas: 6,
                tipo:"activa"},
            {   id:313,
                img: "collectibles_313_holymantle.png",
                name:"Holy Mantle",
                descripcion:"Holy shield",
                cargas: "",
                tipo:"pasiva"}
        ],
        nameImage:"playername_12_thelost.png",
        portrait:"playerportraitbig_12_thelost.png",
        costume:-1,
        skinColor:"Default",
        canShoot:true,
        canFly:true}
];

//array de los keys para el array json
var jsonKey = [
    "id", "name", "hp", "consumable", "items", "nameImage", "portrait", "costume", "skinColor", "canShoot", "canFly"
];

//array para mostrar en la tabla commo titulo
var titulo = [
    "ID", "Name", "HP", "Consumables", "Items", "Image's Name", "Portrait", "Costume",  "Skin Color", "Shoot", "Fly"
];

//lo mismo que arriba, pero para los ITEMS
var itemTitulo = ["ID", "Imagen", "Nombre", "Descripción", "Cargas", "Tipo"];
var itemJSON = ["id", "img", "name", "decripcion", "cargas", "tipo"];

//Un pequeño array que lo utilizo para guardas 2 imagenes, necesitaba variables globales
var imgMod = [];

//decide que tabla generar
function que_tabla_generar(){
    borrar_form();
    borrar_subEntrada();
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
function generar_tabla(){
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
        tr.className = "entrada";
        //transforma una entrada de JSON a array, quitando los keys
        var characterValue = Object.values(character[i]);
        for (y = 0; y < characterValue.length; y++){
            var td =  document.createElement("td");
            //El switch sirve para los imagenes
            switch(y){
                case 0:
                    var text = document.createTextNode(characterValue[y]);
                    var button = document.createElement("button");
                    button.appendChild(text);
                    button.type = "button";
                    button.className = "mod";
                    td.appendChild(button);
                    break;
                case 4:
                    if(characterValue[y] == ""){
                        var button = document.createElement("button");
                        var text = document.createTextNode("Añadir...");
                        button.appendChild(text);
                        button.type = "button";
                        button.className = "showItem";
                        button.addEventListener("click", function(e){
                            var table = e.target.parentNode.parentNode.parentNode;
                            var curTr = e.target.parentNode.parentNode;
                            for(i = 0; i < table.childElementCount; i++){
                                if(table.childNodes[i] === curTr){
                                    generar_subtabla(i-1);
                                }
                            };
                        });
                        td.appendChild(button);
                    }else{
                        var button = document.createElement("button");
                        var text = document.createTextNode("Ver más...");
                        button.appendChild(text);
                        button.type = "button";
                        button.className = "showItem";
                        button.addEventListener("click", function(e){
                            var table = e.target.parentNode.parentNode.parentNode;
                            var curTr = e.target.parentNode.parentNode;
                            for(i = 0; i < table.childElementCount; i++){
                                if(table.childNodes[i] === curTr){
                                    generar_subtabla(i-1);
                                }
                            };
                            
                        });
                        td.appendChild(button);
                    }
                    break;
                case 5:
                    var img = document.createElement("img");
                    img.src = "gfx/nameImage/"+characterValue[y];
                    img.style['pointer-events'] = 'none';
                    img.onerror = function(){
                        this.src = "gfx/nameImage/default.png";
                    }
                    td.appendChild(img);
                    break;
                case 6:
                    var img = document.createElement("img");
                    img.src = "gfx/playerPortrairBig/"+characterValue[y];
                    img.style['pointer-events'] = 'none';
                    img.onerror = function(){
                        this.src = "gfx/playerPortrairBig/default.png";
                    }
                    td.appendChild(img);
                    break;
                    
                default:
                    var text = document.createTextNode(characterValue[y]);
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
    input.pattern = "[0-9](:[0-9])?";
    input.placeholder = "HP";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Consumables
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.pattern = "(B[0-9])?(K[0-9])?(C[0-9])?";
    input.placeholder = "Consumables";
    form.appendChild(input);
    
    //Items
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.placeholder = "Items";
    input.disabled = "true";
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
    button.type = "button";
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

//Genera la subtabla (el de los ITEMS)
function generar_subtabla(num){
    borrar_tabla();
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
    var tr = document.createElement("tr");
    var characterValue = Object.values(character[num]);
    for (y = 0; y < characterValue.length; y++){
        var td =  document.createElement("td");

        //El switch sirve para los imagenes
        switch(y){
            case 0:
                var text = document.createTextNode(characterValue[y]);
                var button = document.createElement("button");
                button.appendChild(text);
                button.type = "button";
                button.className = "mod";
                td.appendChild(button);
                break;
            case 4:
                if(characterValue[y] == ""){
                    var text = document.createTextNode("Vacío...");
                    td.appendChild(text);
                }else{
                    var text = document.createTextNode("");
                    td.appendChild(text);
                }
                break;
            case 5:
                var img = document.createElement("img");
                img.src = "gfx/nameImage/"+characterValue[y];
                img.style['pointer-events'] = 'none';
                img.onerror = function(){
                    this.src = "gfx/nameImage/default.png";
                }
                td.appendChild(img);
                break;
            case 6:
                var img = document.createElement("img");
                img.src = "gfx/playerPortrairBig/"+characterValue[y];
                img.style['pointer-events'] = 'none';
                img.onerror = function(){
                    this.src = "gfx/playerPortrairBig/default.png";
                }
                td.appendChild(img);
                break;

            default:
                var text = document.createTextNode(characterValue[y]);
                td.appendChild(text);
                break;
        }
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    tabla.appendChild(tbody);
    div.appendChild(tabla);
    div.appendChild(document.createElement("br"));
    if(characterValue[4] == "" || characterValue[4].length == 0){
        generar_subtabla_vacia();
    }else{
        generar_subtabla2(num);
    }
    //boton para salir
    var button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", generar_subForm);
    button.type = "button";
    text = document.createTextNode("Insertar ITEM");
    button.appendChild(text);
    div.appendChild(button);
    
    //boton para salir
    var button = document.createElement("button");
    button.className = "button delete";
    button.addEventListener("click", function(){
        borrar_subEntrada();
        borrar_tabla();
        que_tabla_generar();
    });
    button.type = "button";
    text = document.createTextNode("Salir");
    button.appendChild(text);
    div.appendChild(button);
    
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

//genera la segunda la parte del ITEM de las subtablas
function generar_subtabla2(num){
    //creacion de la subtabla
    var div = document.getElementById("subTable");
    var table = document.createElement("table");
    table.setAttribute("class", "table");
    var tbody = document.createElement("tbody");
    
    var tr = document.createElement("tr");
    for(i = 0; i < itemTitulo.length; i++){
        var th = document.createElement("th");
        var text = document.createTextNode(itemTitulo[i]);
        th.appendChild(text);
        tr.appendChild(th);
    }
    tbody.appendChild(tr);
    
    for(i = 0; i < character[num].items.length; i++){
        tr = document.createElement("tr");
        tr.className = "subentrada";
        for(y in character[num].items[i]){
            td = document.createElement("td");
            if(y == "img"){
                var img = document.createElement("img");
                img.src = "gfx/item/"+ character[num].items[i][y];
                img.style['pointer-events'] = 'none';
                img.onerror = function(){
                    this.src = "gfx/item/default.png";
                };
                td.appendChild(img);
            }else{
                text = document.createTextNode(character[num].items[i][y]);
                td.appendChild(text);
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    table.setAttribute("border", "2");
    div.appendChild(table);
    
    //recarga todos los eventos
    loadAllEvents();
    
}

function generar_subtabla_vacia(){
    var div = document.getElementById("subTable");
    var h3 = document.createElement("h3");
    var text = document.createTextNode("No hay ningún ITEM, por favor inserte una");
    h3.appendChild(text);
    div.appendChild(h3);
}

//Genera formulario para la subtabla
function generar_subForm(){
    borrar_subEntrada();
    var div = document.getElementById("subinsert");
    var form = document.createElement("form");
    form.setAttribute("class", "form");
    var input, select, option;
    var text;
    var button;
    
    //ID
    input = document.createElement("input");
    input.className = "subinfo";
    input.type = "text";
    input.placeholder = "ID";
    input.required = true;
    form.appendChild(input);
    
    //Image
    input = document.createElement("input");
    input.className = "subinfo";
    input.type = "file";
    input.placeholder = "Image";
    input.required = true;
    input.accept = "image/*";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Nombre
    input = document.createElement("input");
    input.className = "subinfo";
    input.type = "text";
    input.placeholder = "Nombre";
    input.required = true;
    form.appendChild(input);
    
    //Descripcion
    input = document.createElement("input");
    input.className = "subinfo";
    input.type = "text";
    input.placeholder = "Descripcion";
    input.required = true;
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //cargas
    input = document.createElement("input");
    input.className = "subinfo";
    input.type = "number";
    input.min = -1;
    input.max = 12;
    input.value = -1;
    input.placeholder = "Cargas";
    input.disabled = true;
    form.appendChild(input);

    
    //tipo
    select = document.createElement("select");
    select.className = "subinfo";
        //options
        option = document.createElement("option");
        text = "Pasiva";
        option.value = "pasive";
        option.innerHTML = text;
        select.appendChild(option);
        
        option = document.createElement("option");
        text = "Activa";
        option.value = "active";
        option.innerHTML = text;
        select.appendChild(option);
    
    select.addEventListener("change", function(e){
        if(e.target.value == "active"){
            e.target.previousSibling.disabled = false;
            e.target.previousSibling.required = true;
        }else{
            e.target.previousSibling.disabled = true;
            e.target.previousSibling.required = false;
        }
    });
    
    form.appendChild(select);
    
    //BR
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    
    //boton de insertar
    button = document.createElement("button");
    button.className = "button insert";
    button.addEventListener("click", function(e){
        var insertForm = document.getElementsByClassName("subinfo");
        var newRegistro = {};
        for (i = 0; i < insertForm.length; i++){
            var insert = insertForm[i].value;
            insert = insert.replace(/.*\\/, "");
            newRegistro[itemJSON[i]] = insert;
        }
        
        var id = document.getElementById("table").firstChild.firstChild.lastChild.firstChild.textContent;
        for(i = 0; i < character.length; i++){
            console.log("Charid" + character[i].id);
            console.log("ID" + id);
            if(character[i].id == id){
                if(character[i].items == "" || character[i].items.length == 0){
                    newRegistro = [newRegistro];
                    character[i].items = newRegistro;
                }else{
                    character[i].items.push(newRegistro);
                }
                
                borrar_tabla();
                borrar_subform();
                generar_subtabla(i);
            }
        }
        
        //generar_subtabla();
    });
    button.type = "button";
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
    button.addEventListener("click", function(){
        borrar_tabla();
        borrar_subEntrada();
        borrar_form();
        borrar_subform();
        que_tabla_generar();
    });
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

//borrar subtabla
function borrar_subEntrada(){
    var insert = document.getElementById("subTable");
    while (insert.hasChildNodes()) {
        insert.removeChild(insert.firstChild);
    }
}

//borrar subform
function borrar_subform(){
    var insert = document.getElementById("subinsert");
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
    input.pattern = "[0-9](:[0-9])?";
    input.placeholder = "HP";
    form.appendChild(input);
    
    //BR
    form.appendChild(document.createElement("br"));
    
    //Consumables
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.pattern = "(B[0-9])?(K[0-9])?(C[0-9])?";
    input.placeholder = "Consumables";
    form.appendChild(input);
    
    //Items
    input = document.createElement("input");
    input.name = "info";
    input.type = "text";
    input.disabled = "true";
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
    button.type = "submit";
    text = document.createTextNode("Actalizar");
    button.appendChild(text);
    form.appendChild(button);
    
    //boton de cancelar
    button = document.createElement("button");
    button.className = "button delete";
    button.addEventListener("click", que_tabla_generar);
    button.type = "button";
    text = document.createTextNode("Cancel");
    button.appendChild(text);
    form.appendChild(button);
    
    div.appendChild(form);
    
    
    var insertForm = document.getElementsByName("info");
    for (i = 0; i <= insertForm.length; i++){
        if(i == 9 || i == 10){
            insertForm[i-1].checked = charact[jsonKey[i]];  
        }else if(i == 5){
            imgMod[0] = charact[jsonKey[i]];
        }else if(i ==6){
            imgMod[1] = charact[jsonKey[i]];
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
        if(i != 0)console.log("I: " + i + "key: " + jsonKey[i-1] + "  value: " + insertForm[i-1].value);
    }
    character.push(newRegistro);
    borrar_form();
    que_tabla_generar();
}


function actualizar_informacion(){
    var id = document.getElementsByTagName("h1")[0].textContent.replace("ID: ", "");
    for(i = 0; i < character.length; i++){
        if(character[i].id == id){
            var insertForm = document.getElementsByName("info");
            for (y = 1; y <= insertForm.length; y++){   
                switch(y){
                    case 0:
                        character[i].id = id;
                        break;
                    case 5:
                        var insert = insertForm[y-1].value;
                        if (insert.length != 0){
                            insert = insert.replace(/.*\\/, "");
                        }else{
                            insert = imgMod[0];
                        }
                        character[i][jsonKey[y]] = insert;
                        break;
                    case 6:
                        var insert = insertForm[y-1].value;
                        if (insert.length != 0){
                            insert = insert.replace(/.*\\/, "");
                        }else{
                            insert = imgMod[1];
                        }
                        character[i][jsonKey[y]] = insert;
                        break;
                    case 9: 
                    case 10:
                        character[i][jsonKey[y]] = insertForm[y-1].checked;
                        break;
                    default:
                        var insert = insertForm[y-1].value;
                        character[i][jsonKey[y]] = insert;
                        break;
                }
                console.log(character[i][jsonKey[y-1]]);
            }
            console.log(character[i]);
            borrar_form();
            que_tabla_generar();
        }
    }
}
