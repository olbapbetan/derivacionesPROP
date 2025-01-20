// Lógica de la ventana que muestra el código LaTeX exportado
function texExport(tree_id) {
  latexCode = "$$ " + globalIdx[tree_id].disp() + " $$";

  // remuevo números de reglas no aplicadas
  const regex = /\(\d+\)/gm;
  let aux;
  while ((aux = regex.exec(latexCode)) !== null) {
    aux.forEach((match) => {
      // si la hipótesis no está cancelada, la elimino del código LaTeX
      if (!hipotesisCanceladas.has(match)) {
        latexCode = latexCode.replaceAll(` ${match}`, "");
      }
    });
  }

  // corrigiendo los índices canceladores para que:
  // 1. sean consecutivos
  // 2. comiencen en 1
  let indicesCanceladores = [""];
  while ((aux = regex.exec(latexCode)) !== null) {
    aux.forEach((match) => {
      indicesCanceladores.push(match.slice(1, -1));
    });
  }
  for (i of indicesCanceladores) {
    latexCode = latexCode.replaceAll(`(${i})`, `_(${i})_`);
    latexCode = latexCode.replaceAll(`{${i}}`, `_{${i}}_`);
  }
  for (i in indicesCanceladores) {
    latexCode = latexCode.replaceAll(
      `_(${indicesCanceladores[i]})_`,
      `\\;(${i})`
    );
    latexCode = latexCode.replaceAll(`_{${indicesCanceladores[i]}}_`, `{${i}}`);
  }

  latexCode = convertGreekToLaTeX(latexCode);

  // abro ventana
  popUp = window.open("", "", "width=400,height=200,titlebar=no");
  popUp.document.write(
    "<div style='font-family: courier new; font-size:small;'>" +
      latexCode +
      "</div>"
  );
  popUp.focus();
}

function switchSelect(b) {
  var lst = document.getElementsByName("selectRule");
  for (var idx = 0; idx < lst.length; idx++) lst[idx].disabled = b;
}
function switchSelectOn() {
  switchSelect(false);
}
function switchSelectOff() {
  switchSelect(true);
}

////////////////
// Auxiliares para el size

function checkSize(p) {
  document.body.appendChild(p);
  var ans = $(p).width();
  document.body.removeChild(p);
  return ans;
}

function tokenToTexStr(fml) {
  var ans = tk2Tex[fml.tk];
  return ans === undefined ? fml.value : ans;
}

function tokenToASCIIStr(fml) {
  var ans = tk2Ascii[fml.tk];
  return ans === undefined ? fml.value : ans;
}

function tokenToUnicodeStr(fml) {
  var ans = tk2Char[fml.tk];
  return ans === undefined ? fml.value : ans;
}

function dispFfTex(f, lst) {
  return dispFfAux(f, lst, tokenToTexStr(f));
}

function dispFfAscii(f, lst) {
  return dispFfAux(f, lst, tokenToASCIIStr(f));
}

function dispFf(f, lst) {
  return dispFfAux(f, lst, tokenToUnicodeStr(f));
}

function dispFfAux(f, lst, con) {
  var myIndex = precedencia(f.tk),
    ans = "";
  switch (lst.length) {
    case 0:
      switch (f.tk) {
        case "lequ":
          ans = f.hijosT[0].disp() + "=" + f.hijosT[1].disp();
          break;
        case "id":
          if (f.hijosT.length == 0) ans = con; // + "()";
          else {
            ans = con + "(" + f.hijosT[0].disp();
            for (var i = 1; i < f.hijosT.length; i++)
              ans = ans + "," + f.hijosT[i].disp();
            ans = ans + ")";
          }
          break;
        default:
          ans = con;
          break;
      }
      break;
    case 1:
      var otherIndex = precedencia(f.hijos[0].tk);
      switch (f.tk) {
        case "lall":
        case "lexi":
          con = "(" + con + " " + f.value + ")";
          break;
        case "lnot":
          break;
      }
      if (myIndex < otherIndex) ans = con + lst[0];
      else ans = con + "(" + lst[0] + ")";
      break;
    case 2:
      var lIndex = precedencia(f.hijos[0].tk);
      var rIndex = precedencia(f.hijos[1].tk);
      if (myIndex > rIndex) {
        ans = con + " (" + lst[1] + ")";
      } else {
        ans = con + " " + lst[1];
      }
      if (myIndex >= lIndex) {
        ans = "(" + lst[0] + ")" + ans;
      } else {
        ans = lst[0] + ans;
      }
      break;
    default:
      alert("ERROR: cantidad de subfórmulas no válida");
      break;
  }
  return ans;
}

function precedencia(x) {
  switch (x) {
    case "lequ":
    case "id":
    case "bottom":
      return 3;
    case "lnot":
    case "lall":
    case "lexi":
      return 2;
    case "land":
    case "lor":
      return 1;
    case "lthen":
    case "liff":
      return 0;
  }
}

/////////////////////////////////////////
/////////////// REGLAS DE INFERENCIA

// Chequea que la hipótesis seleccionada esté bien aplicada para luego cancelarla
// indexRule -> número de regla que está cancelando
function appHip(hip, n, indexRule) {
  var p = globalIdx[n];
  var forbidden = p.ForbiddenVars(p.conclusion);
  var exceptions = p.ExceptionForms();
  var problema = !p.conclusion.eq(hip);
  if (problema) alert("Esta regla no está siendo aplicada correctamente.");
  else {
    idx = 0;
    while (!problema && idx < forbidden.length)
      problema = problema || p.conclusion.enFV([forbidden[idx++]]);
    idx = 0;
    while (problema && idx < exceptions.length)
      problema = problema && !p.conclusion.eq(exceptions[idx++]);
    if (problema) alert("Esta regla no está siendo aplicada correctamente.");
    else {
      p.just = "Hip-" + indexRule;
      prueba2Html();
    }
  }
}

function appPremisa(pre, n) {
  var p = globalIdx[n],
    idx = 0;
  var forbidden = p.ForbiddenVars(p.conclusion);
  var problema = !p.conclusion.eq(premisas[pre]);
  while (!problema && idx < forbidden.length)
    problema = problema || p.conclusion.enFV([forbidden[idx++]]);
  if (problema) alert("Esta regla no está siendo aplicada correctamente.");
  else {
    p.just = "Pre";
    prueba2Html();
  }
}

/////////////// REGLAS DE INFERENCIA
/////////////////////////////////////////

function derivar() {
  var p = new Prueba(conclusion);
  p.prems = premisas;
  globalIdx = [p];
  prueba2Html();
  dPrems.but.disabled = true;
  dConc.but.disabled = true;
  dBoton.derivar.disabled = true;
  dBoton.reset.disabled = false;
}

function reset() {
  resetConclusion();
  resetPremisas();
  hipotesisCanceladas = new Set();
  dPrems.but.disabled = false;
  dConc.but.disabled = false;
  pFORM.form.off();
  dBoton.derivar.disabled = true;
  dBoton.reset.disabled = true;
  globalIdx = [];
  var div = document.getElementById("tree");
  if (div.firstChild !== null) div.removeChild(div.firstChild);
  return;
}

function prueba2Html() {
  switchSelectOn();
  var div = document.getElementById("tree");
  var t = globalIdx[0].fapply(dispPruebaHTML);
  if (div.firstChild !== null) div.replaceChild(t.div, div.firstChild);
  else div.appendChild(t.div);
  reloadLaTeX();
  return;
}

function colapsarPrueba(fidx) {
  var p = globalIdx[fidx];
  p.visible = !p.visible;
  prueba2Html();
  return;
}

function deshacerPrueba(n) {
  if (
    confirm(
      "¿Confirma que desea deshacer esta (sub)prueba?" +
        "\n\nEsto puede romper los índices canceladores."
    )
  ) {
    // FIXME
    var p = globalIdx[n];
    p.just = "?";
    p.visible = true;
    p.hijos = [];
    //TODO, limpiar memoria
    prueba2Html();
  }
  return;
}

function createOption(txt) {
  var obj = document.createElement("OPTION");
  obj.text = txt;
  return obj;
}

// Chequea elemento seleccionado de 'select'
function applyRule(select, nregla) {
  var hips = globalIdx[nregla].getHips();
  var index = select.selectedIndex;

  if (premisas.length > 0 && index - 1 < premisas.length)
    appPremisa(index - 1, nregla);
  else if (hips.length > 0 && index - premisas.length <= hips.length)
    appHip(
      hips[index - premisas.length - 1][0],
      nregla,
      hips[index - premisas.length - 1][1]
    );
  else {
    var nombreRegla = select.options[select.selectedIndex].text;
    applyrule(nm2Rule[nombreRegla], nregla);
  }
  // reinicio la opcion por defecto
  select[0].selected = "1";
}

function menuDerivar() {
  calcCollapsedSize();
  calcSelectSize();
  calcSizeJust();
  pFORM = new Prompt();
  if (conTipoDeSimilaridad)
    document
      .getElementById("inpTipoSimilaridad")
      .appendChildren(dTS.dSim.inp, dTS.dLen.inp, dTS.dOK);
  document.getElementById("inpPremisas").appendChildren(dPrems.inp, dPrems.but);
  document.getElementById("inpConclusion").appendChildren(dConc.inp, dConc.but);
  document
    .getElementById("botonera")
    .appendChildren(dBoton.derivar, dBoton.reset, dBoton.help, dBoton.toTex);
  reset();
  dPrems.but.disabled = conTipoDeSimilaridad;
  dConc.but.disabled = conTipoDeSimilaridad;
}

function setTipoLenguaje(tipo, leng) {
  var tipos = tipo.match(/<(\S*);(\S*);(\S*)>/).slice(1);
  var lengs = leng.match(/<(\S*);(\S*);(\S*)>/).slice(1);
  var problemas = tipos.length !== 3 || lengs.length !== 3;
  if (!problemas) {
    var arisP = tipos[0].split(",");
    var arisF = tipos[1].split(",");
    var nmP = lengs[0].split(",");
    var nmF = lengs[1].split(",");
    gNombreConstantes = lengs[2].split(",");
    problemas =
      arisP.length !== nmP.length ||
      arisF.length !== nmF.length ||
      gNombreConstantes.length !== +tipos[2];
  }
  if (!problemas) {
    for (var idx = 0; idx < arisP.length; idx++)
      gNombreRelaciones[nmP[idx]] = +arisP[idx];
    for (var idx = 0; idx < arisF.length; idx++)
      gNombreFunciones[nmF[idx]] = +arisF[idx];
    dPrems.but.disabled = false;
    dConc.but.disabled = false;
  } else {
    alert("Problemas con el tipo y/o el lenguaje");
    dPrems.but.disabled = true;
    dConc.but.disabled = true;
  }
}

function setConclusion(fmltxt) {
  conclusion = parse(fmltxt, parsePrincipal);
  var parent = document.getElementById("conclusion");
  var ans;
  if (conclusion !== null) {
    ans = "\\(" + convertGreekToLaTeX(conclusion.toStr()) + "\\)";
    dBoton.derivar.disabled = false;
  } else {
    ans = "???";
    dBoton.derivar.disabled = true;
  }
  parent.replaceChild(document.createTextNode(ans), parent.firstChild);
  reloadLaTeX();
}

function resetConclusion() {
  conclusion = null;
  var ans = "...";
  var parent = document.getElementById("conclusion");
  parent.replaceChild(document.createTextNode(ans), parent.firstChild);
}

// Escribe las hipótesis globales escritas en el input
function setPremisas(fmltxt) {
  premisas = [];
  var ans = "",
    premisasTxt = fmltxt.split(";"),
    newf,
    idx = 0;

  if (premisasTxt.length > 0) {
    newf = parse(premisasTxt[idx++], parsePrincipal);
    while (newf === null && idx < premisasTxt.length)
      newf = parse(premisasTxt[idx++], parsePrincipal);
    if (newf !== null) {
      premisas.push(newf);
      ans = "\\(" + convertGreekToLaTeX(newf.toStr());
      while (idx < premisasTxt.length) {
        newf = parse(premisasTxt[idx], parsePrincipal);
        if (newf !== null) {
          premisas.push(newf);
          ans += ",\\quad" + convertGreekToLaTeX(newf.toStr());
        }
        idx++;
      }
      ans += "\\)";
    }
  }

  var parent = document.getElementById("premisas");
  parent.replaceChild(document.createTextNode(ans), parent.firstChild);
  reloadLaTeX();
}

function resetPremisas() {
  premisas = [];
  var ans = "...";
  var parent = document.getElementById("premisas");
  parent.replaceChild(document.createTextNode(ans), parent.firstChild);
}

function parse(str, parseFunction) {
  SALIDA = {};
  var error_offsets = new Array();
  var error_lookaheads = new Array();
  var error_count = 0;
  if ((error_count = parseFunction(str, error_offsets, error_lookaheads)) > 0) {
    var errstr = new String();
    for (var i = 0; i < error_count; i++)
      errstr +=
        "Parse error in line " +
        (str.substr(0, error_offsets[i]).match(/\n/g)
          ? str.substr(0, error_offsets[i]).match(/\n/g).length
          : 1) +
        ' near "' +
        str.substr(error_offsets[i]) +
        '", expecting "' +
        error_lookaheads[i].join() +
        '"\n';
    alert(errstr);
    return null; // LINEA AGREGADA, REVISAR
  } else if (conTipoDeSimilaridad && !SALIDA.checkAridades()) {
    // CONDICION AGREGADA; uso de alfabeto
    alert("Problemas con aridades o nombres");
    return null;
  } else return SALIDA; // LINEA MODIFICADA
}
