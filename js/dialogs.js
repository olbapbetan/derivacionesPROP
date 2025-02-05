////////////////////////////
// Distintos dialogos
///////////////////////////

///////////////////////
// Lectura de premisas
// inpPremisas
var dPrems = {};
dPrems.inp = document.createCosa("input");
dPrems.but = document.createCosa(
  "button",
  "type",
  "button",
  "name",
  "btnHip",
  "onclick",
  "setPremisas( dPrems.inp.value )"
);
dPrems.but.appendChild(document.createTextNode("Premisas"));

///////////////////////
// Lectura de conclusion
// inpConclusion
var dConc = {};
dConc.inp = document.createCosa("input");
dConc.but = document.createCosa(
  "button",
  "type",
  "button",
  "name",
  "btnConc",
  "onclick",
  "setConclusion ( dConc.inp.value )"
);
dConc.but.appendChild(document.createTextNode("Conclusión"));

function analizaUrl() {
  var dataUrlDecoded = decodeURIComponent(window.location.search);
  var dataUrl = dataUrlDecoded.match(/\?(.*);;(.*)/);
  //    var dataUrl = window.location.search.match (/\?(.*);;(.*)/);
  if (dataUrl != null && dataUrl.length == 3) {
    // SOLUCION CHANCHA, IFF en lugar de <->
    dConc.inp.value = dataUrl[2].replace(/IFF/g, "<->");
    dPrems.inp.value = dataUrl[1].replace(/IFF/g, "<->");
    if (dConc.inp.value !== "") dConc.but.click();
    if (dPrems.inp.value !== "") dPrems.but.click();
  }
  // setConclusion (dataUrl[2]);
  // setPremisas (dataUrl[1]);
}

///////////////////////
// Botonera
// botonera
var dBoton = {};
dBoton.derivar = document.createCosa(
  "button",
  "type",
  "button",
  "id",
  "btnDerivar",
  "onclick",
  "derivar()"
);
dBoton.derivar.appendChild(document.createTextNode("Derivar"));
dBoton.reset = document.createCosa(
  "button",
  "type",
  "button",
  "id",
  "btnReset",
  "onclick",
  "reset()"
);
dBoton.reset.appendChild(document.createTextNode("Reset"));
dBoton.help = document.createCosa(
  "button",
  "type",
  "button",
  "id",
  "btnHelp",
  "onclick",
  "alert('TBD')"
);
dBoton.help.appendChild(document.createTextNode("Ayuda"));
dBoton.toTex = document.createCosa(
  "button",
  "type",
  "button",
  "id",
  "btnExport",
  "onclick",
  "texExport(0)"
);
dBoton.toTex.appendChild(document.createTextNode("Exportar a LaTeX"));

///////////////////////
// Lectura de tipo de similaridad
// inpTipoSimilaridad
var dTS = {};
dTS.dSim = {};
dTS.dSim.inp = document.createCosa("input");
dTS.dSim.inp.value = "<1,2,2;1,2;1>";
dTS.dLen = {};
dTS.dLen.inp = document.createCosa("input");
dTS.dLen.inp.value = "<P,Q,R;f,g;a>";
dTS.dOK = document.createCosa(
  "button",
  "type",
  "button",
  "id",
  "dTSdOK",
  "onclick",
  "setTipoLenguaje (dTS.dSim.inp.value, dTS.dLen.inp.value)"
);
dTS.dOK.appendChild(document.createTextNode("Asignar tipo y lenguaje"));
