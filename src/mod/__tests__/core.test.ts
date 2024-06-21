import PPx from '@ppmdev/modules/ppx.ts';
global.PPx = Object.create(PPx)
import {getRgx} from '../core.ts'


describe('getRgx()', function () {
  it('pattern without conditions', () => {
    let input = '.*abc.*';
    let rgx = /.*abc.*/i;
    expect(getRgx(input)).toEqual(rgx);
    input = 'abc|123';
    rgx = /abc|123/i;
    expect(getRgx(input)).toEqual(rgx);
  });
  it('pattern containing AND conditions', () => {
    const input = 'abc.123';
    const rgx = /(?=.*abc)(?=.*123)/i;
    expect(getRgx(input)).toEqual(rgx);
  });
  it('pattern containing NOT conditions', () => {
    let input = 'abc-';
    let rgx = /(?!abc)/i;
    expect(getRgx(input)).toEqual(rgx);
    input = 'abc.def-';
    rgx = /(?=.*abc)(?!.*def)/i;
    expect(getRgx(input)).toEqual(rgx);
  });
});
