//!*script
// deno-lint-ignore-file no-var
/**
 * Search comments
 *
 * @arg 0 If nonzero search by unique specifications
 * @arg 1 Search-bar title
 * @arg 2 Reference history
 * NOTE:
 *  And-search, if it contains whitespace
 *  Minus-search, if it contains a space and ends with "-"
 *  OR-search, if no whitespace is included and "|" is included
 */

var g_args = (function (args) {
  var len = args.Length;
  return {
    uniq: len && args.Item(0) !== '0',
    title: len >= 2 ? args.Item(1) : 'Search comments..',
    ref: len >= 3 ? args.Item(2) : 'e'
  };
})(PPx.Arguments);

var reg_terms = (function (args) {
  var msg = args.uniq ? '    And:[a b]  Minus:[a b-]  Or:[a|b]' : '';
  var compList = PPx.Extract('%*getcust(S_ppm#user:taglist)')
    ? ' %%%%: *completelist -set -file:%%su""taglist"" -detail:""user1""'
    : '';
  var minus = '';
  var a = [1, '', args.title, msg, args.ref, 'l', compList];
  var input =
    PPx.Extract('%*script(%*getcust(S_ppm#global:lib)\\input.js,' + a.join(',') + ')') ||
    PPx.Quit(-1);

  if (args.uniq) {
    input = (function () {
      if (~input.indexOf('|') || !~input.indexOf(' ')) {
        return input;
      }

      return input.replace(/([^\s-]*)(.)/g, function (_p0, p1, p2) {
        var fmt = {
          ' ': '(?=.*' + p1 + ')',
          '-': '(?!.*' + p1 + ')'
        };

        if (p2 === '-') {
          minus = '(?!' + p1 + ')';
        }

        return fmt[p2] || fmt[' '];
      });
    })();
  }

  return new RegExp(minus + input, 'i');
})(g_args);

for (var i = PPx.EntryDisplayCount; i--; ) {
  var thisEntry = PPx.Entry(i);
  if (!reg_terms.test(thisEntry.Comment)) {
    thisEntry.Hide;
  }
}

PPx.Execute('*color back');
