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

/* Import modules */
var st = PPx.CreateObject('ADODB.stream');
var module = function (filepath) {
  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(filepath);
  const data = st.ReadText(-1);
  st.Close;

  return Function(' return ' + data)();
};

// Load modules
var input = module(PPx.Extract('%*getcust(S_ppm#global:module)\\input.js'));
module = null;

var g_args = (function (args) {
  var arr = ['0', 'Search comments..', 'e', ''];

  for (var i = 0, l = args.length; i < l; i++) {
    arr[i] = args.Item(i);
  }

  return {
    uniq: arr[0] !== '0',
    title: arr[1],
    refer: arr[2],
    complist: arr[3]
  };
})(PPx.Arguments);

var input_term = function (args) {
  var msg = args.uniq ? '    [And:{a.b}  Minus:{a.b-}  Or:{a|b}]' : '';
  var terms = input.lied.call({
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

  return new RegExp('(' + terms + ')', 'i');
};

var search_term = input_term(g_args);
var has_term = {
  true: function (c) {
    return !search_term.test(c);
  },
  false: function (c) {
    return !~c.toLowerCase().indexOf(search_term.toLowerCase());
  }
}[g_args.uniq];

for (var i = PPx.EntryDisplayCount; i--; ) {
  var thisEntry = PPx.Entry(i);
  if (has_term(thisEntry.Comment)) {
    thisEntry.Hide;
  }
}

PPx.Execute('*color back');
