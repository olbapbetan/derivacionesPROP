function centrado(seg, cont) {
  return (cont - seg) / 2;
}

function puntosTrivial(ans, fSize) {
  ans.A = lenPad;
  ans.B = lenPad + fSize;
  ans.C = ans.A;
  ans.D = ans.A;
  ans.E = ans.B;
  ans.X = 0;
  ans.Z = ans.B + lenPad;
}

// Dibuja una hoja con su cancelación
function cajaTrivial(f) {
  var ans = document.createCosa(
    "DIV",
    "class",
    f.just.startsWith("Hip-") ? "Hip" : f.just,
    "style",
    padLeftRight
  );
  const cancellingRuleIndex = f.just.startsWith("Hip-")
    ? `^{${f.just.slice(4)}}`
    : "";
  ans.appendChild(
    document.createTextNode(
      `\\( [${f.conclusion.toStr()}]${cancellingRuleIndex} \\)`
    )
  );
  return ans;
}

function puntosIncompleta(ans, fSize) {
  ans.A = lenPad;
  ans.B = lenPad + fSize;
  ans.C = ans.A;
  ans.D = ans.B;
  ans.E = ans.B + widthSelect;
  ans.X = 0;
  ans.Z = ans.E;
}

// Dibuja bloque con parte de la prueba y selector para aplicar regla
function cajaIncompleta(f) {
  var t = document.createCosa("TABLE");
  var tr = document.createElement("TR");
  var td1 = document.createCosa("TD", "style", padLeft);
  var td2 = document.createElement("TD");
  td1.appendChildren(
    document.createElement("HR"),
    document.createTextNode("\\(" + f.conclusion.toStr() + "\\)")
  );
  td2.appendChild(selectinapplication(f.idx));
  tr.appendChildren(td1, td2);
  t.appendChild(tr);
  return t;
}

function puntosComplejaConcMuyCorta(ans, fSize, lst, acum2, just) {
  ans.X = 0;
  ans.C = lst[0].A;
  ans.D = ans.C + acum2;
  ans.E = ans.D + justSize[just];
  ans.A = ans.C + centrado(fSize, acum2);
  ans.B = ans.A + fSize;
  for (var i = 0; i + 1 < lst.length; i++) {
    lst[i + 1].X = lst[i].Z;
    lst[i + 1].Z = lst[i + 1].X + lst[i + 1].Z;
  }
  ans.Z = Math.max(ans.E, lst[lst.length - 1].Z);
}

function puntosComplejaConcMuyLarga(ans, fSize, lst, acum2, just) {
  ans.X = 0;
  ans.A = 0;
  ans.B = fSize;
  ans.C = ans.A;
  ans.D = ans.B;
  ans.E = ans.D + justSize[just];
  lst[0].X = centrado(acum2, fSize) - lst[0].A;
  lst[0].Z = lst[0].X + lst[0].Z;
  for (i = 0; i + 1 < lst.length; i++) {
    lst[i + 1].X = lst[i].Z;
    lst[i + 1].Z = lst[i + 1].X + lst[i + 1].Z;
  }
  ans.Z = Math.max(ans.E, lst[lst.length - 1].Z);
}

function puntosComplejaConclusion(ans, fSize, lst, acum2, just) {
  ans.X = 0;
  ans.A = lst[0].A - centrado(acum2, fSize);
  ans.B = ans.A + fSize;
  ans.C = ans.A;
  ans.D = ans.B;
  ans.E = ans.D + justSize[just];
  for (i = 0; i + 1 < lst.length; i++) {
    lst[i + 1].X = lst[i].Z;
    lst[i + 1].Z = lst[i + 1].X + lst[i + 1].Z;
  }
  ans.Z = Math.max(ans.E, lst[lst.length - 1].Z);
}

function cajaCompleja(f, pt) {
  var d = document.createCosa("div", "class", "lower");
  var t = document.createCosa("TABLE");
  var tr1 = document.createElement("TR");
  var tr2 = document.createElement("TR");
  var td1 = document.createCosa("TD", "style", "padding-left:" + pt.C + "px");
  var td2 = document.createCosa(
    "TD",
    "style",
    //"padding-left:" + pt.A + "px",
    "text-align: center;",
    "ondblclick",
    "deshacerPrueba(" + f.idx + ")"
  );
  var td3 = document.createCosa(
    "TD",
    "class",
    "just",
    "style",
    // largo de: nombre de regla + número cancelador
    "width:" + justSize[f.just + "(00)"] + "px",
    "ondblclick",
    "colapsarPrueba(" + f.idx + ")"
  );
  t.appendChildren(tr1, tr2);
  tr1.appendChildren(td1, td3);
  tr2.appendChild(td2);
  td2.appendChild(document.createTextNode(`\\( ${f.conclusion.toStr()} \\)`));
  td1.appendChild(
    document.createCosa("HR", "style", "width:" + (pt.D - pt.C) + "px")
  );

  // regla aplicada: nombre + número
  td3.appendChild(document.createTextNode(`${just2Str[f.just]} (${f.idx})`));
  d.appendChild(t);
  return d;
}

function puntosInvisible(ans) {
  ans.A = 0;
  ans.B = widthCollapsed;
  ans.C = 0;
  ans.D = 0;
  ans.E = ans.B;
  ans.X = ans.A;
  ans.Z = ans.B;
}

function cajaInvisible(f) {
  var ans = document.createCosa(
    "TABLE",
    "ondblclick",
    "colapsarPrueba(" + f.idx + ")"
  );
  var tr = document.createElement("TR");
  var td1 = document.createCosa("TD", "class", "pruebaOculta");
  td1.appendChild(document.createTextNode("..."));
  tr.appendChildren(td1);
  ans.appendChild(tr);
  return ans;
}

function dispPruebaHTML(f, lst) {
  var i,
    ans = {};
  ans.div = document.createCosa("DIV", "class", "siblings");
  var fSize = f.conclusion.size();

  if (!f.visible) {
    puntosInvisible(ans);
    ans.div.appendChild(cajaInvisible(f));
  } else if (lst.length == 0) {
    switch (f.just) {
      case "?":
        puntosIncompleta(ans, fSize);
        ans.div.appendChild(cajaIncompleta(f));
        break;
      case "Hip":
      // intentando cancelar hipotesis
      case "Pre":
      case "RI1":
        puntosTrivial(ans, fSize);
        ans.div.appendChild(cajaTrivial(f));
        break;
      default:
        if (f.just.startsWith("Hip")) {
          puntosTrivial(ans, fSize);
          ans.div.appendChild(cajaTrivial(f));
        }
    }
  } else {
    var acum3 = 0,
      acum = 0,
      acum2 = 0;
    for (i = 0; i + 1 < lst.length; i++) {
      acum3 = acum3 + lst[i].Z;
    }
    acum = acum3 + lst[lst.length - 1].Z;
    acum2 = acum3 + lst[lst.length - 1].B - lst[0].A;

    if (acum2 >= fSize)
      puntosComplejaConcMuyCorta(ans, fSize, lst, acum2, f.just);
    else if (centrado(acum2, fSize) > lst[0].A)
      puntosComplejaConcMuyLarga(ans, fSize, lst, acum2, f.just);
    else puntosComplejaConclusion(ans, fSize, lst, acum2, f.just);

    var upper = document.createCosa(
      "div",
      "class",
      "upper",
      "style",
      "padding-left:" + lst[0].X + "px",
      "padding-right: 50px"
    );
    for (i = 0; i < lst.length; i++) {
      upper.appendChild(lst[i].div);
    }
    var lower = cajaCompleja(f, ans);
    ans.div.appendChildren(upper, lower);
  }
  return ans;
}
