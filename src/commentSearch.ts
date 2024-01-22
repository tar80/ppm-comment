/* @file Search for string in comments
 * @arg 0 {number} - If non-zero, use RegExp
 * @arg 1 {string} - Title of comment search
 * @arg 2 {string} - Reference history of comment search
 * @arg 3 {string} - Path to comment completion list
 *
 * NOTE: Comment search rules.
 *  And search    If it contains a "."
 *  Minus search  If it contains a "." and ends with "-"
 *  OR search     If it does not contain "." and contains "|"
 */

import {useLanguage} from '@ppmdev/modules/data.ts';
import fso from '@ppmdev/modules/filesystem.ts';
import {ppm} from '@ppmdev/modules/ppm.ts';
import {getRgx} from './mod/core.ts';
import {langCommentSearch} from './mod/language.ts';

const SEARCH_RULES = '([AND]: a.b, [MINUS]: a.b-, [OR]: a|b)';
const lang = langCommentSearch[useLanguage()];

const main = (): void => {
  const args = adjustArgs();
  const title = `${args.title} ${SEARCH_RULES}`;
  const postcmd = [`-detail:"user1"%%:*comletelist match:6 -module:off`];

  if (fso.FileExists(args.complist)) {
    postcmd.push(`-file:"${args.complist}"`);
  }

  const [exitcode, input] = ppm.getinput({title, mode: args.mode, leavecancel: true, k: postcmd.join(' ')});

  exitcode !== 0 && PPx.Quit(-1);

  const containsWord = searchSyntax(input, args.useRgx);

  for (let i = PPx.EntryDisplayCount; i--; ) {
    const thisEntry = PPx.Entry.Item(i);
    if (containsWord(thisEntry.Comment)) {
      thisEntry.Hide();
    }
  }

  // PPx.Execute('*color back');
};

const adjustArgs = (args = PPx.Arguments): {useRgx: boolean; title: string; mode: string; complist: string} => {
  const arr = ['0', lang.title, 'e', ''];

  for (let i = 0, k = args.length; i < k; i++) {
    arr[i] = args.Item(i);
  }

  return {useRgx: arr[0] !== '0', title: arr[1], mode: arr[2], complist: arr[3]};
};

const searchSyntax = (input: string, useRgx: boolean): Function => {
  if (!useRgx) {
    return (comment: string): boolean => !~comment.toLowerCase().indexOf(input.toLowerCase());
  }

  const rgx = getRgx(input);
  return (comment: string): boolean => !rgx.test(comment);
};

main();
