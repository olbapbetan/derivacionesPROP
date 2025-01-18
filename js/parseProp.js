function __lexP(info) {
  var state = 0;
  var match = -1;
  var match_pos = 0;
  var start = 0;
  var pos = info.offset + 1;

  do {
    pos--;
    state = 0;
    match = -2;
    start = pos;

    if (info.src.length <= start) return 13;

    do {
      switch (state) {
        case 0:
          if (info.src.charCodeAt(pos) == 9 || info.src.charCodeAt(pos) == 32)
            state = 1;
          else if (info.src.charCodeAt(pos) == 38) state = 2;
          else if (info.src.charCodeAt(pos) == 40) state = 3;
          else if (info.src.charCodeAt(pos) == 41) state = 4;
          else if (info.src.charCodeAt(pos) == 45) state = 5;
          else if (
            info.src.charCodeAt(pos) >= 97 &&
            info.src.charCodeAt(pos) <= 122
          )
            state = 6;
          else if (info.src.charCodeAt(pos) == 60) state = 11;
          else if (info.src.charCodeAt(pos) == 70) state = 12;
          else if (info.src.charCodeAt(pos) == 92) state = 13;
          else state = -1;
          break;

        case 1:
          state = -1;
          match = 1;
          match_pos = pos;
          break;

        case 2:
          state = -1;
          match = 9;
          match_pos = pos;
          break;

        case 3:
          state = -1;
          match = 2;
          match_pos = pos;
          break;

        case 4:
          state = -1;
          match = 3;
          match_pos = pos;
          break;

        case 5:
          if (info.src.charCodeAt(pos) == 62) state = 7;
          else state = -1;
          match = 10;
          match_pos = pos;
          break;

        case 6:
          if (
            (info.src.charCodeAt(pos) >= 48 &&
              info.src.charCodeAt(pos) <= 57) ||
            (info.src.charCodeAt(pos) >= 65 &&
              info.src.charCodeAt(pos) <= 90) ||
            (info.src.charCodeAt(pos) >= 97 && info.src.charCodeAt(pos) <= 122)
          )
            state = 6;
          else state = -1;
          match = 5;
          match_pos = pos;
          break;

        case 7:
          state = -1;
          match = 6;
          match_pos = pos;
          break;

        case 8:
          state = -1;
          match = 8;
          match_pos = pos;
          break;

        case 9:
          state = -1;
          match = 7;
          match_pos = pos;
          break;

        case 10:
          state = -1;
          match = 4;
          match_pos = pos;
          break;

        case 11:
          if (info.src.charCodeAt(pos) == 45) state = 14;
          else state = -1;
          break;

        case 12:
          if (info.src.charCodeAt(pos) == 97) state = 15;
          else state = -1;
          break;

        case 13:
          if (info.src.charCodeAt(pos) == 47) state = 8;
          else state = -1;
          break;

        case 14:
          if (info.src.charCodeAt(pos) == 62) state = 9;
          else state = -1;
          break;

        case 15:
          if (info.src.charCodeAt(pos) == 108) state = 16;
          else state = -1;
          break;

        case 16:
          if (info.src.charCodeAt(pos) == 115) state = 17;
          else state = -1;
          break;

        case 17:
          if (info.src.charCodeAt(pos) == 101) state = 10;
          else state = -1;
          break;
      }

      pos++;
    } while (state > -1);
  } while (1 > -1 && match == 1);

  if (match > -1) {
    info.att = info.src.substr(start, match_pos - start);
    info.offset = match_pos;
  } else {
    info.att = new String();
    match = -1;
  }

  return match;
}

function __parseP(src, err_off, err_la) {
  var sstack = new Array();
  var vstack = new Array();
  var err_cnt = 0;
  var act;
  var go;
  var la;
  var rval;
  var parseinfo = new Function("", "var offset; var src; var att;");
  var info = new parseinfo();

  /* Pop-Table */
  var pop_tab = new Array(
    new Array(0 /* p' */, 1),
    new Array(12 /* p */, 1),
    new Array(11 /* e */, 3),
    new Array(11 /* e */, 3),
    new Array(11 /* e */, 3),
    new Array(11 /* e */, 3),
    new Array(11 /* e */, 2),
    new Array(11 /* e */, 3),
    new Array(11 /* e */, 1),
    new Array(11 /* e */, 1)
  );

  /* Action-Table */
  var act_tab = new Array(
    /* State 0 */ new Array(
      10 /* "NOT" */,
      3,
      2 /* "(" */,
      4,
      5 /* "ID" */,
      5,
      4 /* "BOT" */,
      6
    ),
    /* State 1 */ new Array(13 /* "$" */, 0),
    /* State 2 */ new Array(
      7 /* "IFF" */,
      7,
      6 /* "THEN" */,
      8,
      9 /* "AND" */,
      9,
      8 /* "OR" */,
      10,
      13 /* "$" */,
      -1
    ),
    /* State 3 */ new Array(
      10 /* "NOT" */,
      3,
      2 /* "(" */,
      4,
      5 /* "ID" */,
      5,
      4 /* "BOT" */,
      6
    ),
    /* State 4 */ new Array(
      10 /* "NOT" */,
      3,
      2 /* "(" */,
      4,
      5 /* "ID" */,
      5,
      4 /* "BOT" */,
      6
    ),
    /* State 5 */ new Array(
      13 /* "$" */,
      -8,
      8 /* "OR" */,
      -8,
      9 /* "AND" */,
      -8,
      6 /* "THEN" */,
      -8,
      7 /* "IFF" */,
      -8,
      3 /* ")" */,
      -8
    ),
    /* State 6 */ new Array(
      13 /* "$" */,
      -9,
      8 /* "OR" */,
      -9,
      9 /* "AND" */,
      -9,
      6 /* "THEN" */,
      -9,
      7 /* "IFF" */,
      -9,
      3 /* ")" */,
      -9
    ),
    /* State 7 */ new Array(
      10 /* "NOT" */,
      3,
      2 /* "(" */,
      4,
      5 /* "ID" */,
      5,
      4 /* "BOT" */,
      6
    ),
    /* State 8 */ new Array(
      10 /* "NOT" */,
      3,
      2 /* "(" */,
      4,
      5 /* "ID" */,
      5,
      4 /* "BOT" */,
      6
    ),
    /* State 9 */ new Array(
      10 /* "NOT" */,
      3,
      2 /* "(" */,
      4,
      5 /* "ID" */,
      5,
      4 /* "BOT" */,
      6
    ),
    /* State 10 */ new Array(
      10 /* "NOT" */,
      3,
      2 /* "(" */,
      4,
      5 /* "ID" */,
      5,
      4 /* "BOT" */,
      6
    ),
    /* State 11 */ new Array(
      7 /* "IFF" */,
      -6,
      6 /* "THEN" */,
      -6,
      9 /* "AND" */,
      -6,
      8 /* "OR" */,
      -6,
      13 /* "$" */,
      -6,
      3 /* ")" */,
      -6
    ),
    /* State 12 */ new Array(
      7 /* "IFF" */,
      7,
      6 /* "THEN" */,
      8,
      9 /* "AND" */,
      9,
      8 /* "OR" */,
      10,
      3 /* ")" */,
      17
    ),
    /* State 13 */ new Array(
      7 /* "IFF" */,
      7,
      6 /* "THEN" */,
      8,
      9 /* "AND" */,
      9,
      8 /* "OR" */,
      10,
      13 /* "$" */,
      -5,
      3 /* ")" */,
      -5
    ),
    /* State 14 */ new Array(
      7 /* "IFF" */,
      7,
      6 /* "THEN" */,
      8,
      9 /* "AND" */,
      9,
      8 /* "OR" */,
      10,
      13 /* "$" */,
      -4,
      3 /* ")" */,
      -4
    ),
    /* State 15 */ new Array(
      7 /* "IFF" */,
      -3,
      6 /* "THEN" */,
      -3,
      9 /* "AND" */,
      9,
      8 /* "OR" */,
      10,
      13 /* "$" */,
      -3,
      3 /* ")" */,
      -3
    ),
    /* State 16 */ new Array(
      7 /* "IFF" */,
      -2,
      6 /* "THEN" */,
      -2,
      9 /* "AND" */,
      9,
      8 /* "OR" */,
      10,
      13 /* "$" */,
      -2,
      3 /* ")" */,
      -2
    ),
    /* State 17 */ new Array(
      13 /* "$" */,
      -7,
      8 /* "OR" */,
      -7,
      9 /* "AND" */,
      -7,
      6 /* "THEN" */,
      -7,
      7 /* "IFF" */,
      -7,
      3 /* ")" */,
      -7
    )
  );

  /* Goto-Table */
  var goto_tab = new Array(
    /* State 0 */ new Array(12 /* p */, 1, 11 /* e */, 2),
    /* State 1 */ new Array(),
    /* State 2 */ new Array(),
    /* State 3 */ new Array(11 /* e */, 11),
    /* State 4 */ new Array(11 /* e */, 12),
    /* State 5 */ new Array(),
    /* State 6 */ new Array(),
    /* State 7 */ new Array(11 /* e */, 13),
    /* State 8 */ new Array(11 /* e */, 14),
    /* State 9 */ new Array(11 /* e */, 15),
    /* State 10 */ new Array(11 /* e */, 16),
    /* State 11 */ new Array(),
    /* State 12 */ new Array(),
    /* State 13 */ new Array(),
    /* State 14 */ new Array(),
    /* State 15 */ new Array(),
    /* State 16 */ new Array(),
    /* State 17 */ new Array()
  );

  /* Symbol labels */
  var labels = new Array(
    "p'" /* Non-terminal symbol */,
    "WHITESPACE" /* Terminal symbol */,
    "(" /* Terminal symbol */,
    ")" /* Terminal symbol */,
    "BOT" /* Terminal symbol */,
    "ID" /* Terminal symbol */,
    "THEN" /* Terminal symbol */,
    "IFF" /* Terminal symbol */,
    "OR" /* Terminal symbol */,
    "AND" /* Terminal symbol */,
    "NOT" /* Terminal symbol */,
    "e" /* Non-terminal symbol */,
    "p" /* Non-terminal symbol */,
    "$" /* Terminal symbol */
  );

  info.offset = 0;
  info.src = src;
  info.att = new String();

  if (!err_off) err_off = new Array();
  if (!err_la) err_la = new Array();

  sstack.push(0);
  vstack.push(0);

  la = __lexP(info);

  while (true) {
    act = 19;
    for (var i = 0; i < act_tab[sstack[sstack.length - 1]].length; i += 2) {
      if (act_tab[sstack[sstack.length - 1]][i] == la) {
        act = act_tab[sstack[sstack.length - 1]][i + 1];
        break;
      }
    }

    if (_dbg_withtrace && sstack.length > 0) {
      __dbg_print(
        "\nState " +
          sstack[sstack.length - 1] +
          "\n" +
          "\tLookahead: " +
          labels[la] +
          ' ("' +
          info.att +
          '")\n' +
          "\tAction: " +
          act +
          "\n" +
          '\tSource: "' +
          info.src.substr(info.offset, 30) +
          (info.offset + 30 < info.src.length ? "..." : "") +
          '"\n' +
          "\tStack: " +
          sstack.join() +
          "\n" +
          "\tValue stack: " +
          vstack.join() +
          "\n"
      );
    }

    //Panic-mode: Try recovery when parse-error occurs!
    if (act == 19) {
      if (_dbg_withtrace)
        __dbg_print(
          "Error detected: There is no reduce or shift on the symbol " +
            labels[la]
        );

      err_cnt++;
      err_off.push(info.offset - info.att.length);
      err_la.push(new Array());
      for (var i = 0; i < act_tab[sstack[sstack.length - 1]].length; i += 2)
        err_la[err_la.length - 1].push(
          labels[act_tab[sstack[sstack.length - 1]][i]]
        );

      //Remember the original stack!
      var rsstack = new Array();
      var rvstack = new Array();
      for (var i = 0; i < sstack.length; i++) {
        rsstack[i] = sstack[i];
        rvstack[i] = vstack[i];
      }

      while (act == 19 && la != 13) {
        if (_dbg_withtrace)
          __dbg_print(
            "\tError recovery\n" +
              "Current lookahead: " +
              labels[la] +
              " (" +
              info.att +
              ")\n" +
              "Action: " +
              act +
              "\n\n"
          );
        if (la == -1) info.offset++;

        while (act == 19 && sstack.length > 0) {
          sstack.pop();
          vstack.pop();

          if (sstack.length == 0) break;

          act = 19;
          for (
            var i = 0;
            i < act_tab[sstack[sstack.length - 1]].length;
            i += 2
          ) {
            if (act_tab[sstack[sstack.length - 1]][i] == la) {
              act = act_tab[sstack[sstack.length - 1]][i + 1];
              break;
            }
          }
        }

        if (act != 19) break;

        for (var i = 0; i < rsstack.length; i++) {
          sstack.push(rsstack[i]);
          vstack.push(rvstack[i]);
        }

        la = __lexP(info);
      }

      if (act == 19) {
        if (_dbg_withtrace)
          __dbg_print("\tError recovery failed, terminating parse process...");
        break;
      }

      if (_dbg_withtrace) __dbg_print("\tError recovery succeeded, continuing");
    }

    /*
        if( act == 19 )
            break;
        */

    //Shift
    if (act > 0) {
      if (_dbg_withtrace)
        __dbg_print("Shifting symbol: " + labels[la] + " (" + info.att + ")");

      sstack.push(act);
      vstack.push(info.att);

      la = __lexP(info);

      if (_dbg_withtrace)
        __dbg_print(
          "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")"
        );
    }
    //Reduce
    else {
      act *= -1;

      if (_dbg_withtrace) __dbg_print("Reducing by producution: " + act);

      rval = void 0;

      if (_dbg_withtrace) __dbg_print("\tPerforming semantic action...");

      switch (act) {
        case 0:
          {
            rval = vstack[vstack.length - 1];
          }
          break;
        case 1:
          {
            SALIDA = vstack[vstack.length - 1];
          }
          break;
        case 2:
          {
            rval = new Formula({ tk: "lor" });
            rval.colgarHijos(
              vstack[vstack.length - 3],
              vstack[vstack.length - 1]
            );
          }
          break;
        case 3:
          {
            rval = new Formula({ tk: "land" });
            rval.colgarHijos(
              vstack[vstack.length - 3],
              vstack[vstack.length - 1]
            );
          }
          break;
        case 4:
          {
            rval = new Formula({ tk: "lthen" });
            rval.colgarHijos(
              vstack[vstack.length - 3],
              vstack[vstack.length - 1]
            );
          }
          break;
        case 5:
          {
            rval = new Formula({ tk: "liff" });
            rval.colgarHijos(
              vstack[vstack.length - 3],
              vstack[vstack.length - 1]
            );
          }
          break;
        case 6:
          {
            rval = new Formula({ tk: "lnot" });
            rval.colgarHijos(vstack[vstack.length - 1]);
          }
          break;
        case 7:
          {
            rval = vstack[vstack.length - 2];
          }
          break;
        case 8:
          {
            rval = new Formula({ tk: "id", value: vstack[vstack.length - 1] });
          }
          break;
        case 9:
          {
            rval = new Formula({ tk: "bottom" });
          }
          break;
      }

      if (_dbg_withtrace)
        __dbg_print("\tPopping " + pop_tab[act][1] + " off the stack...");

      for (var i = 0; i < pop_tab[act][1]; i++) {
        sstack.pop();
        vstack.pop();
      }

      go = -1;
      for (var i = 0; i < goto_tab[sstack[sstack.length - 1]].length; i += 2) {
        if (goto_tab[sstack[sstack.length - 1]][i] == pop_tab[act][0]) {
          go = goto_tab[sstack[sstack.length - 1]][i + 1];
          break;
        }
      }

      if (act == 0) break;

      if (_dbg_withtrace)
        __dbg_print("\tPushing non-terminal " + labels[pop_tab[act][0]]);

      sstack.push(go);
      vstack.push(rval);
    }

    if (_dbg_withtrace) {
      alert(_dbg_string);
      _dbg_string = new String();
    }
  }

  if (_dbg_withtrace) {
    __dbg_print("\nParse complete.");
    alert(_dbg_string);
  }

  return err_cnt;
}
