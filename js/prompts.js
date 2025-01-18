function Prompt() {
  this.form = document.getElementById("prompt");
  this.msg = document.getElementById("promptMsg");
  this.span = document.getElementById("promptSpan");
  this.bOK = document.createCosa("button", "type", "button", "name", "btnOk");
  this.bOK.appendChild(document.createTextNode("Ok"));
  this.bCANCEL = document.createCosa(
    "button",
    "type",
    "button",
    "name",
    "btnCancel"
  );
  this.bCANCEL.appendChild(document.createTextNode("Cancelar"));
  this.bCANCEL.onclick = function onclick(e) {
    switchSelectOn();
    document.getElementById("prompt").off();
  };
  this.F = function (g, n) {
    var aux = this;
    return function () {
      if (g(n)) aux.form.off();
    };
  };
  this.form.appendChildren(this.bOK, this.bCANCEL);
}

Prompt.prototype.set = function (msg, inp) {
  this.msg.replaceChild(document.createTextNode(msg), this.msg.firstChild);
  this.span.replaceChildren(inp);
  this.form.on();
};

var pINP1 = document.createCosa("INPUT", "name", "f1", "id", "f1");
var pINP2 = document.createCosa("INPUT", "name", "f2", "id", "f2");
var pINP3 = document.createCosa("INPUT", "name", "t3", "id", "t3");
var pINP4 = document.createCosa("INPUT", "name", "v4", "id", "v4");
var pINP5 = document.createCosa("INPUT", "name", "lt5", "id", "lt5");
