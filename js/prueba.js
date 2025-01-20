/////////////////////////
//Modulo Prueba

Prueba.prototype = new Arbol();
function Prueba_getHips() {
  var ans = [];
  if (this.padre !== null) {
    ans = this.padre.getHips();
    for (var j = 0; j < this.hips.length; j++)
      ans.push([this.hips[j], this.padre.idx]);
  }
  return ans;
}
Prueba.prototype.getHips = Prueba_getHips;

function Prueba_ForbiddenVars(q) {
  var ans = [];
  var p = this;
  var fin = false;
  while (p !== null && !fin) {
    if (p.varsIndeseables !== null) ans.push(p.varsIndeseables);
    for (var i = 0; i < p.hips.length; i++) {
      fin = fin || q.eq(p.hips[i]);
    }
    p = p.padre;
  }
  return ans;
}
Prueba.prototype.ForbiddenVars = Prueba_ForbiddenVars;

function Prueba_ExceptionForms() {
  var ans = [];
  var p = this;
  while (p !== null) {
    if (p.formsException !== null) ans.push(p.formsException);
    p = p.padre;
  }
  return ans;
}
Prueba.prototype.ExceptionForms = Prueba_ExceptionForms;

// Utilizado para exportar a LaTeX
function Prueba_disp(node, lst) {
  var concl = node.conclusion.toTex();
  switch (node.just) {
    case "Pre":
      return concl;
    case "Hip": // no funciona más
      return "[" + concl + "]";
    case "?":
      return "\\infer*[???]" + "\n {" + concl + "}" + "\n {???}";
    default:
      if (node.just.startsWith("Hip-")) {
        hipotesisCanceladas.add(`(${node.just.slice(4)})`);

        return `[${concl}]^{${node.just.slice(4)}}`;
      } else {
        return (
          `\\infer[${just2Tex[node.just]} (${node.idx})]` +
          "\n {" +
          concl +
          "}" +
          "\n {" +
          " & ".intersperse(lst) + // acá se hace la recursión
          "}"
        );
      }
  }
}

Prueba.prototype.disp = function () {
  return this.fapply(Prueba_disp);
};
