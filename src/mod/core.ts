export const getRgx = (input: string): RegExp => {
  let rgx = input;

  if (~input.indexOf('-')) {
    rgx = ~input.indexOf('.') ? input.replace(/^([^\.]+)\.([^-]+)-/, '(?=.*$1)(?!.*$2)') : input.replace(/^([^-]+)-/, '(?!$1)');
  } else if (input.indexOf('.')) {
    rgx = input.replace(/([^\.]+)\.(.+)/, '(?=.*$1)(?=.*$2)');
  }

  return new RegExp(rgx, 'i');
};

