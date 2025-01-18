////////////////////////////
// Variables globales
////////////////////////////

///////////////////////////////
// Nombres usados como tokens en el parser
// o como justificaciones en .just
////////////////////////////////
var tk2Char = {};
var tk2Tex = {};
var tk2Ascii = {};
var justificaciones = [
  "liffE1",
  "lnotE",
  "landI",
  "liffE2",
  "liffI",
  "lthenE",
  "lorI1",
  "lorI2",
  "RAA",
  "lnotI",
  "landE1",
  "landE2",
  "lthenI",
  "bottomE",
  "lorE",
  "RI1",
  "RI2",
  "RI3",
  "RI4",
  "RI4*",
];
var just2Str = {};
var just2Tex = {};
var nm2Rule = {};

/////////////////////////////////////
// Elementos de la prueba
var globalIdx = [];
var premisas = [];
var conclusion;
var hipotesisId = 0
const getHypothesisId = () => {
  hipotesisId += 1;
  return hipotesisId - 1;
}

//////////////////////////////////
// Reglas a usar
var R_AndI = new Regla();
var R_OrI1 = new Regla();
var R_OrI2 = new Regla();
var R_ThenI = new Regla();
var R_IffI = new Regla();
var R_NegI = new Regla();
var R_AllI = new Regla();
var R_ExiI = new Regla();
var R_AndE1 = new Regla();
var R_AndE2 = new Regla();
var R_OrE = new Regla();
var R_ThenE = new Regla();
var R_IffE1 = new Regla();
var R_IffE2 = new Regla();
var R_NegE = new Regla();
var R_BotE = new Regla();
var R_AllE = new Regla();
var R_ExiE = new Regla();
var R_RAA = new Regla();
var R_I1 = new Regla();
var R_I2 = new Regla();
var R_I3 = new Regla();
var R_I4 = new Regla();
var R_I4x = new Regla();

//////////////////////////////
// Prompt
var pFORM;

/////////////////////////////
// Elementos no logicos del lenguaje
var gNombreConstantes = [];
var gNombreRelaciones = {};
var gNombreFunciones = {};

//////////////////////////
//////////////////////////
//
// FRAGMENTOS DEL PARSER

var SALIDA = {};

/*
    Default template driver for JS/CC generated parsers running as
    browser-based JavaScript/ECMAScript applications.
    
    WARNING:     This parser template will not run as console and has lesser
                features for debugging than the console derivates for the
                various JavaScript platforms.
    
    Features:
    - Parser trace messages
    - Integrated panic-mode error recovery
    
    Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
    
    This is in the public domain.
*/

var _dbg_withtrace = false;
var _dbg_string = new String();

function __dbg_print(text) {
  _dbg_string += text + "\n";
}
