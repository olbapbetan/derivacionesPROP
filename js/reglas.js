var msg1 = "Complete la fórmula a eliminar:";

/////////////////
// Utilitaria

function applyrule(rule, n) {
  rule.prueba = globalIdx[n];
  if (!rule.aplicable()) alert(rule.MSGnoaplicable);
  else {
    if (rule.conPrompt) {
      switchSelectOff();
      rule.prompt(n);
    } else rule.post(n);
  }
}

// DEFINICION DE LAS REGLAS
// cuando es aplicable
// exige datos adicionales
// los datos dados son adecuados
// cual es la aplicacion

R_AndI.aplicable = function () {
  return this.prueba.conclusion.tk == "land";
};
R_AndI.MSGnoaplicable = "Estrategia inadecuada: observe el conector principal.";
R_AndI.post = function (n) {
  var sp1 = new Prueba(this.prueba.conclusion.hijos[0]);
  var sp2 = new Prueba(this.prueba.conclusion.hijos[1]);
  this.prueba.colgarHijos(sp1, sp2);
  this.prueba.just = "landI";
  prueba2Html();
};

R_AndE1.conPrompt = true;
R_AndE1.prompt = function (n) {
  pFORM.bOK.onclick = pFORM.F(this.post, n);
  pFORM.set(msg1, [
    document.createTextNode(`\\( ${this.prueba.conclusion.toStr()} \\)`),
    document.createTextNode(` \\( ${tk2Char["land"]} \\) `),
    pINP1,
  ]);
  reloadLaTeX();
  pINP1.focus();
};
R_AndE1.post = function (dummy) {
  var newf = parse(
    "(" + R_AndE1.prueba.conclusion.toAscii() + ") & (" + pINP1.value + ")",
    parsePrincipal
  );
  if (newf !== null) {
    var sp1 = new Prueba(newf);
    R_AndE1.prueba.colgarHijos(sp1);
    R_AndE1.prueba.just = "landE1";
  }
  prueba2Html();
  return newf !== null;
};

R_AndE2.conPrompt = true;
R_AndE2.prompt = function (n) {
  pFORM.bOK.onclick = pFORM.F(this.post, n);
  pFORM.set(msg1, [
    pINP1,
    document.createTextNode(` \\( ${tk2Char["land"]} \\) `),
    document.createTextNode(`\\( ${this.prueba.conclusion.toStr()} \\)`),
  ]);
  reloadLaTeX();
  pINP1.focus();
};
R_AndE2.post = function (dummy) {
  var newf = parse(
    "(" + pINP1.value + ") & (" + R_AndE2.prueba.conclusion.toAscii() + ")",
    parsePrincipal
  );
  if (newf !== null) {
    var sp1 = new Prueba(newf);
    R_AndE2.prueba.colgarHijos(sp1);
    R_AndE2.prueba.just = "landE2";
  }
  prueba2Html();
  return newf !== null;
};

R_ThenI.aplicable = function () {
  return this.prueba.conclusion.tk == "lthen";
};
R_ThenI.MSGnoaplicable =
  "Estrategia inadecuada: observe el conector principal.";
R_ThenI.post = function (dummy) {
  var sp1 = new Prueba(R_ThenI.prueba.conclusion.hijos[1]);
  sp1.hips = [R_ThenI.prueba.conclusion.hijos[0]];
  R_ThenI.prueba.colgarHijos(sp1);
  R_ThenI.prueba.just = "lthenI";
  prueba2Html();
};

R_ThenE.conPrompt = true;
R_ThenE.prompt = function (n) {
  pFORM.bOK.onclick = pFORM.F(this.post, n);
  pFORM.set(msg1, [
    pINP1,
    document.createTextNode(
      ` \\( \\to ${this.prueba.conclusion.toStr()} \\)`
    ),
  ]);
  reloadLaTeX();
  pINP1.focus();
};
R_ThenE.post = function (n) {
  var newf = parse(
    "(" + pINP1.value + ") -> (" + R_ThenE.prueba.conclusion.toAscii() + ")",
    parsePrincipal
  );
  if (newf !== null) {
    var sp1 = new Prueba(newf.hijos[0]);
    var sp2 = new Prueba(newf);
    R_ThenE.prueba.colgarHijos(sp2, sp1);
    R_ThenE.prueba.just = "lthenE";
  }
  prueba2Html();
  return newf !== null;
};

R_OrI1.aplicable = function () {
  return this.prueba.conclusion.tk == "lor";
};
R_OrI1.MSGnoaplicable = "Estrategia inadecuada: observe el conector principal.";
R_OrI1.post = function (dummy) {
  var sp1 = new Prueba(R_OrI1.prueba.conclusion.hijos[0]);
  R_OrI1.prueba.colgarHijos(sp1);
  R_OrI1.prueba.just = "lorI1";
  prueba2Html();
};

R_OrI2.aplicable = function () {
  return this.prueba.conclusion.tk == "lor";
};
R_OrI2.MSGnoaplicable = "Estrategia inadecuada: observe el conector principal.";
R_OrI2.post = function (dummy) {
  var sp1 = new Prueba(R_OrI2.prueba.conclusion.hijos[1]);
  R_OrI2.prueba.colgarHijos(sp1);
  R_OrI2.prueba.just = "lorI2";
  prueba2Html();
};

R_OrE.conPrompt = true;
R_OrE.prompt = function (n) {
  pFORM.bOK.onclick = pFORM.F(this.post, n);
  pFORM.set(msg1, [pINP1, document.createTextNode(` \\( ${tk2Char["lor"]} \\) `), pINP2]);
  reloadLaTeX();
  pINP1.focus();
};
R_OrE.post = function (n) {
  var newf = parse(
    "(" + pINP1.value + ") \\/ (" + pINP2.value + ")",
    parsePrincipal
  );
  if (newf !== null) {
    var sp0 = new Prueba(newf);
    var sp1 = new Prueba(R_OrE.prueba.conclusion);
    var sp2 = new Prueba(R_OrE.prueba.conclusion);
    sp1.hips = [newf.hijos[0]];
    sp2.hips = [newf.hijos[1]];
    R_OrE.prueba.colgarHijos(sp0, sp1, sp2);
    R_OrE.prueba.just = "lorE";
  }
  prueba2Html();
  return newf !== null;
};

R_IffI.aplicable = function () {
  return this.prueba.conclusion.tk == "liff";
};
R_IffI.MSGnoaplicable = "Estrategia inadecuada: observe el conector principal.";
R_IffI.post = function (n) {
  var sp1 = new Prueba(this.prueba.conclusion.hijos[1]);
  var sp2 = new Prueba(this.prueba.conclusion.hijos[0]);
  sp1.hips = [this.prueba.conclusion.hijos[0]];
  sp2.hips = [this.prueba.conclusion.hijos[1]];
  this.prueba.colgarHijos(sp1, sp2);
  this.prueba.just = "liffI";
  prueba2Html();
};

R_IffE1.conPrompt = true;
R_IffE1.prompt = function (n) {
  pFORM.bOK.onclick = pFORM.F(this.post, n);
  pFORM.set(msg1, [
    pINP1,
    document.createTextNode(` \\( ${tk2Char["liff"]} \\) `),
    document.createTextNode(`\\( ${this.prueba.conclusion.toStr()} \\)`),
  ]);
  reloadLaTeX();
  pINP1.focus();
};
R_IffE1.post = function (n) {
  var newf = parse(
    "(" + pINP1.value + ") <-> (" + R_IffE1.prueba.conclusion.toAscii() + ")",
    parsePrincipal
  );
  if (newf !== null) {
    var sp1 = new Prueba(newf.hijos[0]);
    var sp2 = new Prueba(newf);
    R_IffE1.prueba.colgarHijos(sp1, sp2);
    R_IffE1.prueba.just = "liffE1";
  }
  prueba2Html();
  return newf !== null;
};

R_IffE2.conPrompt = true;
R_IffE2.prompt = function (n) {
  pFORM.bOK.onclick = pFORM.F(this.post, n);
  pFORM.set(msg1, [
    document.createTextNode(`\\( ${this.prueba.conclusion.toStr()} \\)`),
    document.createTextNode(` \\( ${tk2Char["liff"]} \\) `),
    pINP1,
  ]);
  reloadLaTeX();
  pINP1.focus();
};
R_IffE2.post = function (n) {
  var newf = parse(
    "(" + R_IffE2.prueba.conclusion.toAscii() + ") <-> (" + pINP1.value + ")",
    parsePrincipal
  );
  if (newf !== null) {
    var sp1 = new Prueba(newf.hijos[1]);
    var sp2 = new Prueba(newf);
    R_IffE2.prueba.colgarHijos(sp1, sp2);
    R_IffE2.prueba.just = "liffE1";
  }
  prueba2Html();
  return newf !== null;
};

R_NegI.aplicable = function () {
  return this.prueba.conclusion.tk == "lnot";
};
R_NegI.MSGnoaplicable = "Estrategia inadecuada: observe el conector principal.";
R_NegI.post = function (n) {
  var sp1 = new Prueba(parse("False", parsePrincipal));
  sp1.hips = [R_NegI.prueba.conclusion.hijos[0]];
  R_NegI.prueba.colgarHijos(sp1);
  R_NegI.prueba.just = "lnotI";
  prueba2Html();
};

R_NegE.aplicable = function () {
  return this.prueba.conclusion.tk == "bottom";
};
R_NegE.MSGnoaplicable = "Estrategia inadecuada: observe el conector principal.";
R_NegE.conPrompt = true;
R_NegE.prompt = function (n) {
  pFORM.bOK.onclick = pFORM.F(this.post, n);
  pFORM.set(msg1, [
    document.createTextNode(` \\( ${tk2Char["lnot"]} \\) `),
    pINP1,
  ]);
  reloadLaTeX();
  pINP1.focus();
};
R_NegE.post = function (n) {
  var newf = parse("- (" + pINP1.value + ")", parsePrincipal);
  if (newf !== null) {
    var sp1 = new Prueba(newf.hijos[0]);
    var sp2 = new Prueba(newf);
    R_NegE.prueba.colgarHijos(sp2, sp1);
    R_NegE.prueba.just = "lnotE";
  }
  prueba2Html();
  return newf !== null;
};

R_BotE.post = function (n) {
  var sp1 = new Prueba(parse("False", parsePrincipal));
  R_BotE.prueba.colgarHijos(sp1);
  R_BotE.prueba.just = "bottomE";
  prueba2Html();
};

R_RAA.post = function (n) {
  var hip = parse(
    "- (" + R_RAA.prueba.conclusion.toAscii() + ")",
    parsePrincipal
  );
  var sp1 = new Prueba(parse("False", parsePrincipal));
  sp1.hips = [hip];
  R_RAA.prueba.colgarHijos(sp1);
  R_RAA.prueba.just = "RAA";
  prueba2Html();
};
