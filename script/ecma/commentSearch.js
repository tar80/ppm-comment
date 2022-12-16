//!*script
/**
 * Search for search terms in comments
 *
 * @arg {number} 0 If nonzero use regexp
 * @arg {string} 1 Search-bar title
 * @arg {string} 2 history to refer
 * @arg {string} 3 Complete-list path
 * NOTE:
 *  And-search, if it contains whitespace
 *  Minus-search, if it contains a space and ends with "-"
 *  OR-search, if no whitespace is included and "|" is included
 */

'use strict';

/* Import modules */
const st = PPx.CreateObject('ADODB.stream');
let module = function (filepath) {
  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(filepath);
  const data = st.ReadText(-1);
  st.Close;

  return Function(' return ' + data)();
};

// Load modules
const input = module(PPx.Extract('%*getcust(S_ppm#global:module)\\input.js'));
module = null;

const g_args = ((args = PPx.Arguments) => {
  const arr = ['0', 'Search comments..', 'e', ''];

  for (let i = 0, l = args.length; i < l; i++) {
    arr[i] = args.Item(i);
  }

  return {
    uniq: arr[0] !== '0',
    title: arr[1],
    refer: arr[2],
    complist: arr[3]
  };
})();

const input_term = (args = g_args) => {
  const msg = args.uniq ? '    [And: {a.b}, Minus: {a.b-}, Or: {a|b}]' : '';
  let terms = input.lied.call({
    title: args.title + msg,
    mode: args.refer,
    select: 'l',
    k: '-detail:"user1"',
    listname: args.complist
  });

  if (!args.uniq) {
    return terms;
  }

  terms = (() => {
    if (~terms.indexOf('-')) {
      return ~terms.indexOf('.')
        ? terms.replace(/^([^\.]+)\.([^-]+)-/, '(?=.*$1)(?!.*$2)')
        : terms.replace(/^([^-]+)-/, '^(?!$1)');
    }

    if (~terms.indexOf('.')) {
      return terms.replace(/([^\.]+)\.(.+)/, '(?=.*$1)(?=.*$2)');
    }

    return terms;
  })();

  return new RegExp(`(${terms})`, 'i');
};

const search_term = input_term();
const has_term = {
  true(c) {
    return !search_term.test(c);
  },
  false(c) {
    return !~c.toLowerCase().indexOf(search_term.toLowerCase());
  }
}[g_args.uniq];

for (let i = PPx.EntryDisplayCount; i--; ) {
  const thisEntry = PPx.Entry(i);
  if (has_term(thisEntry.Comment)) {
    thisEntry.Hide;
  }
}

PPx.Execute('*color back');
