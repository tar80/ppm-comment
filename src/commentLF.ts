/* @file Open comments as virtual entries
 * @arg 0 {string} - Specify the format of *viewstyle
 * @arg 1 {string} - Specify the encoding of ListFile. 'sjis' | 'utf8' | 'utf16le'
 */

import type {FileEncode} from '@ppmdev/modules/types.ts';
import {createLfMeta, createLfItems} from '@ppmdev/parsers/listfile.ts';
import {useLanguage, tmp} from '@ppmdev/modules/data.ts';
import fso from '@ppmdev/modules/filesystem.ts';
import {readLines, writeLines} from '@ppmdev/modules/io.ts';
import {pathSelf} from '@ppmdev/modules/path.ts';
import {msgBox} from '@ppmdev/modules/ppm.ts';
import {langCommentLF} from './mod/language.ts';
import {safeArgs} from '@ppmdev/modules/argument.ts';

const COMMENT_KEY_ID = 'K_ppmComment';
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

  const [error, data] = readLines({path: commentPath, enc: INDEX_ENCODE});

  if (error) {
    msgBox(scriptName, data);
    PPx.Quit(1);
  }

  const [vsFormat, enc] = safeArgs('M wF20 S1 C13 s1', 'utf16le');
  const fileEncode: FileEncode = /^(sjis|utf8)$/.test(enc) ? enc as FileEncode : 'utf16le';
  const templistPath = tmp().lf;
  const metadata = [`;cmd=*viewstyle -temp format "${vsFormat}"`, ';ppm=comment', `;mapkey=${COMMENT_KEY_ID}`];
  const basepath = PPx.Extract('%FD');
  const dirtype = '4';
  const charset = fileEncode;
  const goBack = `\u23CE\t${basepath}\t2010`;
  const rgx = /^([^\t]*)\t([^\t]+)(\t(\d+))?$/;
  const rep = '{"name":"$1","att":"$4","comment":"$2"}';
  const lfMeta = createLfMeta({charset, basepath, dirtype, opts: metadata});
  const lfLines = createLfItems({lines: [goBack, ...data.lines], rgx, rep, virtualEntry: true});
  const [error2, data2] = writeLines({path: templistPath, data: [...lfMeta, ...lfLines], enc: charset, overwrite: true});

  if (error2) {
    msgBox(scriptName, data2);
    PPx.Quit(1);
  }

  PPx.Execute(`*jumppath ${templistPath}`);
};

main();
