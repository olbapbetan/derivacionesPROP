
var lenPad = 16;
var padLeftRight = "padding: 0px " + lenPad + "px";
var padLeft = "padding-left: " + lenPad + "px";
var widthSelect = 0;
var widthCollapsed = 0;

var justSize = {};

function calcSizeJust () {
    var a = document.createCosa ("TD");
    var t = document.createTextNode ("");
    a.appendChild (t);
    
    for (var i = 0; i < justificaciones.length; i ++) {
	t.nodeValue = just2Str [justificaciones[i]];
	justSize[justificaciones[i]] = checkSize (a);
    }
}

function calcCollapsedSize () 
{
    var ans = document.createCosa("TABLE");
    var tr = document.createElement("TR");
    var td1 = document.createCosa ("TD");
    td1.appendChild (document.createTextNode("..."));
    
    tr.appendChildren (td1);
    ans.appendChild(tr);
    widthCollapsed = checkSize(ans);

    $(".pruebaOculta").css("width", widthCollapsed + "px");
    $(".pruebaOculta").css("padding", "2px");
    widthCollapsed = checkSize(ans) + 4;
}

function calcSelectSize () 
{
    var sel = document.createCosa("SELECT");
    var nota = document.createElement("OPTION");
    nota.text = "Ingrese acción";
    sel.appendChild (nota);

// POR QUE NO FUNCIONA LA LINEA SIGUIENTE???
//    var sel = selectinapplication (0);
    
    widthSelect = checkSize(sel);

    // AJUSTE QUE NO ENTIENDO, PERO NECESARIO
    // widthSelect = widthSelect + 1;
}

