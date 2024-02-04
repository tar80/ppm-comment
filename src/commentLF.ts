/* @file Open comments as virtual entries
 * @arg 0 {string} - Specifies the format of *viewstyle
 * @arg 1 {string} - Specifies the encoding of ListFile. 'sjis' | 'utf8' | 'utf16le'
 */

import type {FileEncode} from '@ppmdev/modules/types.ts';
import {createLfMeta, createLfItems} from '@ppmdev/parsers/listfile.ts';
import {useLanguage, tmp} from '@ppmdev/modules/data.ts';
import {isError} from '@ppmdev/modules/guard.ts';
import fso from '@ppmdev/modules/filesystem.ts';
import {readLines, writeLines} from '@ppmdev/modules/io.ts';
import {pathSelf} from '@ppmdev/modules/path.ts';
import {msgBox} from '@ppmdev/modules/ppm.ts';
import {langCommentLF} from './mod/language.ts';

const COMMENT_KEY_ID = 'K_ppmComment'
const COMMENT_FILENAME = '00_INDEX.TXT';
const INDEX_ENCODE = 'utf16le';
const {scriptName} = pathSelf();
const lang = langCommentLF[useLanguage()];

const main = () => {
  const commentPath = PPx.Extract(`%FD\\${COMMENT_FILENAME}`);

  if (!fso.FileExists(commentPath)) {
    msgBox(scriptName, lang.notExists);
    PPx.Quit(1);
  }

  let [error, data] = readLines({path: commentPath, enc: INDEX_ENCODE});

  if (isError(error, data)) {
    msgBox(scriptName, data);
    PPx.Quit(1);
  }

  const args = adjustArgs();
  const templistPath = tmp().lf;
  const metadata = [`;cmd=*viewstyle -temp format "${args.fmt}"`, ';ppm=comment', `;mapkey=${COMMENT_KEY_ID}`];
  const basepath = PPx.Extract('%FD');
  const dirtype = '4';
  const charset = args.enc as FileEncode;
  const goBack = `\u23CE\t${basepath}\t2010`;
  const rgx = /^([^\t]*)\t([^\t]+)(\t(\d+))?$/;
  const rep = '{"name":"$1","att":"$4","comment":"$2"}';
  const lfMeta = createLfMeta({charset, basepath, dirtype, opts: metadata});
  const lfLines = createLfItems({lines: [goBack, ...data.lines], rgx, rep, virtualEntry: true});
  [error, data] = writeLines({
    path: templistPath,
    data: [...lfMeta, ...lfLines],
    enc: charset,
    overwrite: true
  });

  if (error) {
    msgBox(scriptName, data);
    PPx.Quit(1);
  }

  PPx.Execute(`*jumppath ${templistPath}`);
};

const adjustArgs = (args = PPx.Arguments): {fmt: string; enc: FileEncode} => {
  const arr: string[] = ['M wF20 S1 C13 s1', 'utf16le'];

  for (let i = 0, k = args.length; i < k; i++) {
    arr[i] = args.Item(i);
  }

  if (!/^(sjis|utf8|utf16le)$/.test(arr[1])) {
    arr[1] = 'utf16le';
  }

  return {fmt: arr[0], enc: arr[1] as FileEncode};
};

main();
