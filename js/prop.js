///////////////////////
// Modulo Formula

Formula.prototype = new Arbol();
Formula.prototype.toAscii = function () {
  return this.fapply(dispFfAscii);
};
Formula.prototype.toStr = function () {
  return this.fapply(dispFf);
};
Formula.prototype.toTex = function () {
  return this.fapply(dispFfTex);
};

function Formula_eq(f2) {
  if (
    this.tk != f2.tk ||
    this.hijos.length != f2.hijos.length ||
    this.value !== f2.value
  )
    return false;
  for (var i = 0; i < this.hijos.length; i++) {
    if (!this.hijos[i].eq(f2.hijos[i])) return false;
  }
  for (i = 0; i < this.hijosT.length; i++) {
    if (!this.hijosT[i].eq(f2.hijosT[i])) return false;
  }
  return true;
}
Formula.prototype.eq = Formula_eq;

Formula.prototype.size = function () {
  var p = document.createCosa("SPAN", "class", "tree");
  p.appendChild(document.createTextNode("\\(" + this.toStr() + "\\)"));
  return checkSize(p);
};

function Form_colgarHijosT() {
  this.hijosT = [];
  for (var i = 0; i < arguments.length; i++) {
    this.hijosT.push(arguments[i]);
    arguments[i].padreF = this;
  }
}
Formula.prototype.colgarHijosT = Form_colgarHijosT;

function Form_colgarHijosTLST() {
  this.hijosT = arguments[0];
}
Formula.prototype.colgarHijosTLST = Form_colgarHijosTLST;

function Form_checkAridades(f, lst) {
  var ans = true,
    idx = 0;
  while (ans && idx < f.hijosT.length) ans = f.hijosT[idx++].checkAridades();
  idx = 0;
  while (ans && idx < lst.length) ans = lst[idx++];
  return (
    ans && (f.tk !== "id" || f.hijosT.length == gNombreRelaciones[f.value])
  );
}
Formula.prototype.checkAridades = function () {
  return this.fapply(Form_checkAridades);
};

///////////////////////
// Modulo Term

Term.prototype = new Arbol();

function Term_eq(f2) {
  if (
    this.tk != f2.tk ||
    this.hijos.length != f2.hijos.length ||
    this.value != f2.value
  )
    return false;
  for (var i = 0; i < this.hijos.length; i++)
    if (!this.hijos[i].eq(f2.hijos[i])) return false;
  return true;
}
Term.prototype.eq = Term_eq;

Term.prototype.size = function () {
  var p = document.createCosa("SPAN", "class", "tree");
  p.appendChild(document.createTextNode(this.toStr()));
  return checkSize(p);
};

function Term_disp(f, lst) {
  var ans = f.value;
  switch (f.tk) {
    case "vari":
    case "cons":
      break;
    case "func":
      if (lst.length == 0) ans = ans + "()";
      else {
        ans = ans + "(" + lst[0];
        for (var i = 1; i < lst.length; i++) ans = ans + "," + lst[i];
        ans = ans + ")";
      }
  }
  return ans;
}
Term.prototype.disp = function () {
  return this.fapply(Term_disp);
};

function Term_FV(t, lst) {
  var ans = [];
  switch (t.tk) {
    case "vari":
      ans.push(t.value);
      break;
    case "cons":
      break;
    case "func":
      for (var i = 0; i < lst.length; i++) ans.concat(lst[i]);
      break;
  }
  return ans;
}
Term.prototype.FV = function () {
  return this.fapply(Term_FV);
};

function Term_enFV(t, lst, xargs) {
  var x = xargs[0];
  switch (t.tk) {
    case "vari":
      return x == t.value;
    case "cons":
      return false;
    case "func":
      var i = 0;
      while (i < lst.length && !lst[i]) i++;
      return lst.length > 0 && lst[i];
  }
}
Term.prototype.enFV = function (x) {
  return this.fapply(Term_enFV, x);
};

function Term_sust(t, lst, xargs) {
  var u = xargs[0];
  var x = xargs[1];
  var ans;
  switch (t.tk) {
    case "vari":
      ans = (x == t.value ? u : t).dup();
      break;
    case "cons":
      ans = t.dup();
      break;
    case "func":
      ans = t.dup();
      ans.hijos = lst;
      break;
  }
  return ans;
}
Term.prototype.sust = function (x) {
  return this.fapply(Term_sust, x);
};

function sustMultiple(t, sigma) {
  for (var i = 0; i < sigma.length; i++) t = t.sust(sigma[i]);
  return t;
}

function matchHolesF(f1, f2) {
  var ans = null;
  if (f1.tk == f2.tk) {
    if (f1.value == f2.value) {
      ans = [];
      for (var i = 0; i < f1.hijos.length; i++) {
        var u = matchHolesF(f1.hijos[i], f2.hijos[i]);
        ans = ans.concat(u);
      }
      for (i = 0; i < f1.hijosT.length; i++) {
        var u = matchHolesT(f1.hijosT[i], f2.hijosT[i]);
        ans = ans.concat(u);
      }
    }
  }
  return ans;
}

function matchHolesT(t1, t2) {
  var ans = null;
  if (t1.value.search(/\$[0-9]*/) >= 0) ans = [[t2, t1.value]];
  else {
    if (t1.tk == t2.tk && t1.value == t2.value) {
      ans = [];
      for (var i = 0; i < t1.hijos.length; i++) {
        var u = matchHolesT(t1.hijos[i], t2.hijos[i]);
        ans = ans.concat(u);
      }
    }
  }
  return ans;
}

function Form_enFV(t, lst, xargs) {
  var x = xargs[0];
  switch (t.tk) {
    case "id":
      var i = 0;
      while (i + 1 < t.hijosT.length && !t.hijosT[i].enFV(xargs)) i++;
      return t.hijosT.length > 0 && t.hijosT[i].enFV(xargs);
    case "lequ":
      return t.hijosT[0].enFV(xargs) || t.hijosT[1].enFV(xargs);
    case "land":
    case "lor":
    case "lthen":
    case "liff":
      return lst[0] || lst[1];
    case "lnot":
      return lst[0];
    case "lall":
    case "lexi":
      return t.value != x && lst[0];
  }
}
Formula.prototype.enFV = function (x) {
  return this.fapply(Form_enFV, x);
};

function Form_sust(t, lst, xargs) {
  var u = xargs[0];
  var x = xargs[1];
  var ans = t.dup();
  switch (t.tk) {
    case "id":
    case "lequ":
      ans.hijosT = [];
      for (var i = 0; i < t.hijosT.length; i++) {
        ans.hijosT.push(t.hijosT[i].sust(xargs));
      }
      break;
    case "land":
    case "lor":
    case "lthen":
    case "liff":
    case "lnot":
      ans.hijos = lst;
      break;
    case "lall":
    case "lexi":
      if (x != t.value) ans.hijos = lst;
      break;
    case "bottom":
      break;
  }
  return ans;
}
Formula.prototype.sust = function (x) {
  return this.fapply(Form_sust, x);
};

function Form_FV(t, lst) {
  var ans = [];
  switch (t.tk) {
    case "id":
      for (var i = 0; i < t.hijosT.length; i++) ans.concat(t.hijosT[i].FV());
      break;
    case "land":
    case "lor":
    case "lthen":
    case "liff":
      ans.concat(lst[0], lst[1]);
      break;
    case "lnot":
      ans.concat(lst[0]);
      break;
    case "lequ":
      ans.concat(t.hijosT[0].FV(), t.hijosT[1].FV());
      break;
    case "lall":
    case "lexi":
      for (var i = 0; i < lst[0].length; i++)
        if (lst[0][i] != t.value) ans.push(lst[0][i]);
      break;
    case "bottom":
      break;
  }
  return ans;
}
Formula.prototype.FV = function () {
  return this.fapply(Form_FV);
};

function Form_librepara(f, lst, xargs) {
  var t = xargs[0];
  var x = xargs[1];
  var ans = [];
  switch (f.tk) {
    case "id":
      return true;
    case "land":
    case "lor":
    case "lthen":
    case "liff":
      return lst[0] && lst[1];
    case "lnot":
      return lst[0];
    case "lequ":
      return true;
    case "lall":
    case "lexi":
      return x == f.value || (lst[0] && !t.enFV(f.value));
  }
}
Formula.prototype.librepara = function (t, x) {
  return this.fapply(Form_librepara, [t, x]);
};

function Term_dup(f, lst) {
  var ans = new Term({ tk: f.tk, value: f.value });
  switch (f.tk) {
    case "vari":
    case "cons":
      break;
    case "func":
      ans.hijos = lst;
      break;
  }
  return ans;
}
Term.prototype.dup = function () {
  return this.fapply(Term_dup);
};

function Form_dup(f, lst) {
  var ans = new Formula({ tk: f.tk, value: f.value });
  switch (f.tk) {
    case "id":
    case "lequ":
      ans.hijosT = [];
      for (var i = 0; i < f.hijosT.length; i++)
        ans.hijosT.push(f.hijosT[i].dup());
      break;
    case "land":
    case "lor":
    case "lthen":
    case "liff":
    case "lnot":
      ans.hijos = lst;
      break;
    case "lall":
    case "lexi":
      ans.hijos = lst;
      break;
  }
  return ans;
}
Formula.prototype.dup = function () {
  return this.fapply(Form_dup);
};

function Term_checkAridades(f, lst) {
  var ans = true,
    idx = 0;
  switch (f.tk) {
    case "vari":
      break;
    case "cons":
      var found = false;
      while (!found && idx < gNombreConstantes.length)
        found = gNombreConstantes[idx++] == f.value;
      ans = found;
      break;
    case "func":
      ans = lst.length == gNombreFunciones[f.value];
      while (ans && idx < lst.length) ans = lst[idx++];
      break;
  }
  return ans;
}
Term.prototype.checkAridades = function () {
  return this.fapply(Term_checkAridades);
};
