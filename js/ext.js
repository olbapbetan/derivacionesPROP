////////////////////////////////////////////
// Modificaciones a nodos del Core DOM y de Javascript
// Se modifican los nodos Document y Element y String
/////////////////////////////////////////////

////////////////////////////////////////////
// Modificaciones a Document

// Creación de nodos con atributos
Document.prototype.createCosa = function () {
  var cosa = arguments.length > 0 ? this.createElement(arguments[0]) : null;
  for (var i = 1; i + 1 < arguments.length; i += 2)
    cosa.setAttribute(arguments[i], arguments[i + 1]);
  return cosa;
};

////////////////////////////////////////////
// Modificaciones a Element

// Inserción de muchos hijos
Element.prototype.appendChildren = function () {
  for (var i = 0; i < arguments.length; i++) this.appendChild(arguments[i]);
};

// Reemplazo de hijos. Usado por el prompt.
Element.prototype.replaceChildren = function (lst) {
  if (this.parentNode) {
    while (this.firstChild) this.removeChild(this.firstChild);
    for (var i = 0; i < lst.length; i++) this.appendChild(lst[i]);
  }
};

// Switch para el despliegue
Element.prototype.onoff = function (b) {
  this.setAttribute("style", "visibility: " + (b ? "visible" : "hidden"));
  //    this.setAttribute ("style", "display: " + (b ? "block" : "none"));
};

Element.prototype.on = function () {
  this.onoff(true);
};

Element.prototype.off = function () {
  this.onoff(false);
};

////////////////////////////////////////
// Modificaciones a String

// intersperse
String.prototype.intersperse = function () {
  var ans = arguments[0][0];
  for (var i = 1; i < arguments[0].length; i++)
    ans = ans + this + arguments[0][i];
  return ans;
};

////////////////////////////////////////
