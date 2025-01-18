///////////////////////////////
// Nombres usados como tokens en el parser 
// o como justificaciones en .just
////////////////////////////////

//////////////////////////////
// Tokens usados por el parser
tk2Char ["land"]   =  "&"; // "\u22c0";  
tk2Char ["lor"]    =  "\u22c1"; 
tk2Char ["lthen"]  =  "\u2192";
tk2Char ["liff"]   =  "\u2194"; 
tk2Char ["lnot"]   =  "\u00ac"; 
tk2Char ["lequ"]   =  "=";
tk2Char ["lall"]   =  "\u2200"; 
tk2Char ["lexi"]   =  "\u2203";
tk2Char ["bottom"] =  "\u22a5"; 

//////////////////////////////////////////////
// Conversion de token a string
tk2Tex ["land"]   = " \\land";
tk2Tex ["lor"]    = " \\lor";
tk2Tex ["lthen"]  = " \\lthen";
tk2Tex ["liff"]   =  "\\liff";  
tk2Tex ["lnot"]   =  "\\lnot";
tk2Tex ["lequ"]   =  " \dot= ";
tk2Tex ["lall"]   =  "\\lforall"; 
tk2Tex ["lexi"]   =  "\\lexists";
tk2Tex ["bottom"] = " \\bot";

//////////////////////////////////////////////
// Conversion de token a ASCII
tk2Ascii ["land"]   = "&";
tk2Ascii ["lor"]    = "\\/";
tk2Ascii ["lthen"]  = "->";
tk2Ascii ["liff"]   =  "<->";  
tk2Ascii ["lnot"]   =  "-";
tk2Ascii ["lequ"]   =  "=";
tk2Ascii ["lall"]   =  "All"; 
tk2Ascii ["lexi"]   =  "Exi";
tk2Ascii ["bottom"] = "False";


//////////////
// Nombres usados en las pruebas para las justificaciones (.just)

just2Str ["landI"]   = "I"+tk2Char["land"];
just2Str ["landE1"]  = "E"+tk2Char["land"]+1;
just2Str ["landE2"]  = "E"+tk2Char["land"]+2;
just2Str ["lthenI"]  = "I"+tk2Char["lthen"];
just2Str ["lthenE"]  = "E"+tk2Char["lthen"];
just2Str ["bottomE"] = "E"+tk2Char["bottom"];
just2Str ["RAA"]     = "RAA";
just2Str ["lorI1"]   = "I"+tk2Char["lor"]+1;
just2Str ["lorI2"]   = "I"+tk2Char["lor"]+2;
just2Str ["lorE"]    = "E"+tk2Char["lor"];
just2Str ["lnotI"]   = "I"+tk2Char["lnot"];
just2Str ["lnotE"]   = "E"+tk2Char["lnot"];
just2Str ["liffI"]   = "I"+tk2Char["liff"];
just2Str ["liffE1"]  = "E"+tk2Char["liff"]+1;
just2Str ["liffE2"]  = "E"+tk2Char["liff"]+2;
just2Str ["lallI"]   = "I"+tk2Char["lall"];
just2Str ["lallE"]   = "E"+tk2Char["lall"];
just2Str ["lexiI"]   = "I"+tk2Char["lexi"];
just2Str ["lexiE"]   = "E"+tk2Char["lexi"];
just2Str ["RI1"]     = "RI1";
just2Str ["RI2"]     = "RI2";
just2Str ["RI3"]     = "RI3";
just2Str ["RI4"]     = "RI4";
just2Str ["RI4*"]    = "RI4*";

just2Tex ["landI"]   = "I \\land";
just2Tex ["landE1"]  = "E \\land_1";
just2Tex ["landE2"]  = "E \\land_2";
just2Tex ["lthenI"]  = "I \\lthen";
just2Tex ["lthenE"]  = "E \\lthen";
just2Tex ["bottomE"] = "E \\bot";
just2Tex ["RAA"]     = "RAA";
just2Tex ["lorI1"]   = "I \\lor_1";
just2Tex ["lorI2"]   = "I \\lor_2";
just2Tex ["lorE"]    = "E \\lor";
just2Tex ["lnotI"]   = "I \\lnot";
just2Tex ["lnotE"]   = "E \\lnot";
just2Tex ["liffI"]   = "I \\liff";
just2Tex ["liffE1"]  = "E \\liff_1";
just2Tex ["liffE2"]  = "E \\liff_2";
just2Tex ["lallI"]   = "I \\lforall";
just2Tex ["lallE"]   = "E \\lforall";
just2Tex ["lexiI"]   = "I \\lexists";
just2Tex ["lexiE"]   = "E \\lexists";
just2Tex ["RI1"]     = "RI1";
just2Tex ["RI2"]     = "RI2";
just2Tex ["RI3"]     = "RI3";
just2Tex ["RI4"]     = "RI4";
just2Tex ["RI4*"]    = "RI4*";

/////////////////////////////
// Conversión de regla elegida en select a regla a ejecutar
nm2Rule ["IConjuncion"] = R_AndI;
nm2Rule ["IDisyuncion1"] = R_OrI1;
nm2Rule ["IDisyuncion2"] = R_OrI2;
nm2Rule ["IFlecha"] = R_ThenI;
nm2Rule ["ISii"] = R_IffI;
nm2Rule ["INegacion"] = R_NegI;
nm2Rule ["IUniversal"] = R_AllI;
nm2Rule ["IExistencial"] = R_ExiI;
nm2Rule ["EConjuncion1"] = R_AndE1;
nm2Rule ["EConjuncion2"] = R_AndE2;
nm2Rule ["EDisyuncion"] = R_OrE;
nm2Rule ["EFlecha"] = R_ThenE;
nm2Rule ["ESii1"] = R_IffE1;
nm2Rule ["ESii2"] = R_IffE2;
nm2Rule ["ENegacion"] = R_NegE;
nm2Rule ["EBottom"] = R_BotE;
nm2Rule ["EUniversal"] = R_AllE;
nm2Rule ["EExistencial"] = R_ExiE;
nm2Rule ["RAA"] = R_RAA;
nm2Rule ["RI1"] = R_I1;
nm2Rule ["RI2"] = R_I2;
nm2Rule ["RI3"] = R_I3;
nm2Rule ["RI4"] = R_I4;
nm2Rule ["RI4*"] = R_I4x;
