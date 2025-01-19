///////////////////////////////
// Nombres usados como tokens en el parser
// o como justificaciones en .just
////////////////////////////////

//////////////////////////////
// Tokens usados por el parser
tk2Char["land"] = "\\wedge "; // "\u22c0";
tk2Char["lor"] = "\\vee ";
tk2Char["lthen"] = "\\to ";
tk2Char["liff"] = "\\leftrightarrow ";
tk2Char["lnot"] = "\\neg ";
tk2Char["bottom"] = "\\bot ";

//////////////////////////////////////////////
// Conversion de token a string
tk2Tex["land"] = " \\wedge ";
tk2Tex["lor"] = " \\vee ";
tk2Tex["lthen"] = " \\to ";
tk2Tex["liff"] = "\\leftrightarrow ";
tk2Tex["lnot"] = "\\neg ";
tk2Tex["bottom"] = " \\bot ";

//////////////////////////////////////////////
// Conversion de token a ASCII
tk2Ascii["land"] = "&";
tk2Ascii["lor"] = "\\/";
tk2Ascii["lthen"] = "->";
tk2Ascii["liff"] = "<->";
tk2Ascii["lnot"] = "-";
tk2Ascii["bottom"] = "False";

//////////////
// Nombres usados en las pruebas para las justificaciones (.just)

just2Str["landI"] = "I" + tk2Char["land"];
just2Str["landE1"] = "E" + tk2Char["land"] + 1;
just2Str["landE2"] = "E" + tk2Char["land"] + 2;
just2Str["lthenI"] = "I" + tk2Char["lthen"];
just2Str["lthenE"] = "E" + tk2Char["lthen"];
just2Str["bottomE"] = "E" + tk2Char["bottom"];
just2Str["RAA"] = "RAA";
just2Str["lorI1"] = "I" + tk2Char["lor"] + 1;
just2Str["lorI2"] = "I" + tk2Char["lor"] + 2;
just2Str["lorE"] = "E" + tk2Char["lor"];
just2Str["lnotI"] = "I" + tk2Char["lnot"];
just2Str["lnotE"] = "E" + tk2Char["lnot"];
just2Str["liffI"] = "I" + tk2Char["liff"];
just2Str["liffE1"] = "E" + tk2Char["liff"] + 1;
just2Str["liffE2"] = "E" + tk2Char["liff"] + 2;

for (e in just2Str) {
  just2Str[e] = "\\( " + just2Str[e] + " \\)";
}

just2Tex["landI"] = "I \\wedge";
// just2Tex["landE1"] = "E \\wedge_1";
just2Tex["landE1"] = "E \\wedge";
just2Tex["landE2"] = "E \\wedge";
just2Tex["lthenI"] = "I \\to";
just2Tex["lthenE"] = "E \\to";
just2Tex["bottomE"] = "E \\bot";
just2Tex["RAA"] = "RAA";
just2Tex["lorI1"] = "I \\vee";
just2Tex["lorI2"] = "I \\vee";
just2Tex["lorE"] = "E \\vee";
just2Tex["lnotI"] = "I \\neg";
just2Tex["lnotE"] = "E \\neg";
just2Tex["liffI"] = "I \\leftrightarrow";
just2Tex["liffE1"] = "E \\leftrightarrow";
just2Tex["liffE2"] = "E \\leftrightarrow";

/////////////////////////////
// Conversión de regla elegida en select a regla a ejecutar
nm2Rule["IConjuncion"] = R_AndI;
nm2Rule["IDisyuncion1"] = R_OrI1;
nm2Rule["IDisyuncion2"] = R_OrI2;
nm2Rule["IFlecha"] = R_ThenI;
nm2Rule["ISii"] = R_IffI;
nm2Rule["INegacion"] = R_NegI;
nm2Rule["EConjuncion1"] = R_AndE1;
nm2Rule["EConjuncion2"] = R_AndE2;
nm2Rule["EDisyuncion"] = R_OrE;
nm2Rule["EFlecha"] = R_ThenE;
nm2Rule["ESii1"] = R_IffE1;
nm2Rule["ESii2"] = R_IffE2;
nm2Rule["ENegacion"] = R_NegE;
nm2Rule["EBottom"] = R_BotE;
nm2Rule["RAA"] = R_RAA;
