
/////////////////
// Arboles
function Arbol () // data)
{  
    this.padre = {};
    this.hijos = [];
}

function Formula (data)
{
    this.tk = data.tk;  
    this.value = data.value;
    this.hijos = [];
    this.hijosT = [];
}

function Term (data)
{
    this.tk = data.tk;  
    this.value = data.value;
    this.hijos = [];
}

function Regla () {
    this.aplicable = function () {return true;};
    this.MSGnoaplicable = "";
    this.conPrompt = false;
    this.prompt = function () {};
    this.post = function () {};
    this.prueba = null;
};

function Prueba (fml)
{
    this.conclusion = fml;
    this.just = "?";
    this.visible = true;
    this.hips = [];
    this.prems = [];
    this.varsIndeseables = null;
    this.formsException = null;
    this.idx = globalIdx.length;
    this.hijos = [];
    this.padre = null;
    globalIdx.push (this);
}
