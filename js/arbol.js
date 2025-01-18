// Modificaciones
// Eliminada Arbol_show
// Eliminada Arbol_colgarHijo
// Eliminada Arbol_colgarHijoLST

////////////////
// Modulo Arbol
// new Arbol ();
////////////////

////////////////////
// Generadora
function Arbol_colgarHijos() {
  for (var i = 0; i < arguments.length; i++) {
    this.hijos.push(arguments[i]);
    arguments[i].padre = this;
  }
}
Arbol.prototype.colgarHijos = Arbol_colgarHijos;

function Arbol_colgarHijosLST() {
  for (var i = 0; i < arguments[0].length; i++) {
    this.hijos.push(arguments[0][i]);
    arguments[0][i].padre = this;
  }
}
Arbol.prototype.colgarHijosLST = Arbol_colgarHijosLST;

////////////////////
// Recursion
function Arbol_fapply(f, xargs) {
  var evalhijos = [];
  for (var i = 0; i < this.hijos.length; i++)
    evalhijos.push(this.hijos[i].fapply(f, xargs));
  return f(this, evalhijos, xargs);
}
Arbol.prototype.fapply = Arbol_fapply;

// function Arbol_dup (f, lst, xargs)
// {
//     var a = new Arbol;
//     for (var i = 0; i < lst.length; i++)
//     {
// 	a.hijos.push (lst[i]);
// 	lst[i].padre = a;
//     }
//     a.padre = null;
//     for (i = 0; i < xargs.length; i++) {
// 	a[xargs[i]] = f[xargs[i]];
//     }
//     return a;
// }
// Arbol.prototype.dup = function (fs) {return this.fapply (Arbol_dup, fs);};
