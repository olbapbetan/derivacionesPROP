var parsePrincipal = __parseP;

function selectinapplication(nregla) {
  var sel = document.createCosa(
    "SELECT",
    "class",
    "selectRule",
    "name",
    "selectRule",
    "onChange",
    "applyRule(this," + nregla + ")"
  );
  var ogin = document.createCosa("OPTGROUP", "label", "Introducción");
  var ogeli = document.createCosa("OPTGROUP", "label", "Eliminación");
  var ogpre = document.createCosa("OPTGROUP", "label", "Premisas");
  var oghip = document.createCosa("OPTGROUP", "label", "Hipótesis");
  var ogid = document.createCosa("OPTGROUP", "label", "Identidad");
  var nota = document.createElement("OPTION");
  nota.text = "Ingrese acción";
  sel.appendChild(nota);

  var p = globalIdx[nregla];
  if (p !== undefined) {
    var hips = p.getHips();
    //	var hips = p.hips;
    for (var i = 0; i < hips.length; i++) {
      var obj = createOption(hips[i][0].toStr() + " [" + hips[i][1] + "]");
      //	    var obj = createOption (hips[i].toStr());
      oghip.appendChild(obj);
    }

    for (var i = 0; i < premisas.length; i++) {
      var obj = createOption(premisas[i].toStr());
      ogpre.appendChild(obj);
    }
  }

  ogin.appendChildren(
    createOption("IConjuncion"),
    createOption("IDisyuncion1"),
    createOption("IDisyuncion2"),
    createOption("IFlecha"),
    createOption("ISii"),
    createOption("INegacion")
  );
  ogeli.appendChildren(
    createOption("EConjuncion1"),
    createOption("EConjuncion2"),
    createOption("EDisyuncion"),
    createOption("EFlecha"),
    createOption("ESii1"),
    createOption("ESii2"),
    createOption("ENegacion"),
    createOption("EBottom"),
    createOption("RAA")
  );
  sel.appendChildren(ogpre, oghip, ogin, ogeli);
  return sel;
}
