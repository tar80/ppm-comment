/* @file Search for string in comments
 * @arg 0 {number} - If non-zero, use RegExp
 * @arg 1 {string} - Title of the comment search
 * @arg 2 {string} - A reference history of the comment search
 * @arg 3 {string} - Specify the path to comment completion list
 *
 * NOTE: Comment search rules.
 *  And search    If it contains a "."
 *  Minus search  If it contains a "." and ends with "-"
 *  OR search     If it does not contain "." and contains a "|"
 */

import {useLanguage} from '@ppmdev/modules/data.ts';
import fso from '@ppmdev/modules/filesystem.ts';
import {ppm} from '@ppmdev/modules/ppm.ts';
import {getRgx} from './mod/core.ts';
import {langCommentSearch} from './mod/language.ts';
import {safeArgs} from '@ppmdev/modules/argument.ts';

const SEARCH_RULES = '([AND]: ""word.word"", [MINUS]: ""word.ignoreword-"", [OR]: ""word|word"")';
const lang = langCommentSearch[useLanguage()];

const main = (): void => {
  const [useRgx, header, mode, compList] = safeArgs(false, lang.title, 'e', '');
  const title = `${header} ${SEARCH_RULES}`;
  const postcmd = [`-detail:"user1"%%:*comletelist match:6 -module:off`];

  if (fso.FileExists(compList)) {
    postcmd.push(`-file:"${compList}"`);
  }

  const [exitcode, input] = ppm.getinput({title, mode: mode, leavecancel: true, k: postcmd.join(' ')});

  exitcode !== 0 && PPx.Quit(-1);

  const containWords = searchSyntax(input, useRgx);

  for (let i = PPx.EntryDisplayCount; i--; ) {
    const thisEntry = PPx.Entry.Item(i);
    if (containWords(thisEntry.Comment)) {
      thisEntry.Hide();
    }
  }

  // PPx.Execute('*color back');
};

const searchSyntax = (input: string, useRgx: boolean): Function => {
  if (!useRgx) {
    return (comment: string): boolean => !~comment.toLowerCase().indexOf(input.toLowerCase());
  }

  const rgx = getRgx(input);
  return (comment: string): boolean => !rgx.test(comment);
};

main();
