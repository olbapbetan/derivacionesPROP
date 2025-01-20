const convertGreekToLaTeX = (str) => {
  const greekAlphabet = [
    "alpha",
    "beta",
    "gamma",
    "delta",
    "sigma",
    "varphi",
    "psi",
  ];

  greekAlphabet.forEach((e) => {
    str = str.replaceAll(e, `\\${e}`);
  });

  return str;
};
