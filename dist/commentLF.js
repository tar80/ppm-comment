﻿function _construct(t,e,r){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var n=[null];n.push.apply(n,e);var u=new(t.bind.apply(t,n));return r&&_setPrototypeOf(u,r.prototype),u}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_setPrototypeOf(t,e)}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function(){return!!t})()}var isEmptyStr=function(t){return""===t},isEmptyObj=function(t){if(t===undefined)return!1;if(null===t)return!0;for(var e in t)return!1;return!0};Array.prototype.removeEmpty||(Array.prototype.removeEmpty=function(){for(var t=[],e=0,r=this.length;e<r;e++){var n=this[e];null!=n&&""!==n&&(n instanceof Array&&0===n.length||n instanceof Object&&isEmptyObj(n)||t.push(n))}return t}),function(){if("object"!=typeof JSON){JSON={};var t,e,r,n,u=/^[\],:{}\s]*$/,i=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,o=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,a=/(?:^|:|,)(?:\s*\[)+/g,l=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":"Invalid Date"}),"function"!=typeof JSON.stringify&&(r={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(r,u,i){var o;if(t="",e="","number"==typeof i)for(o=0;o<i;o+=1)e+=" ";else"string"==typeof i&&(e=i);if(n=u,u&&"function"!=typeof u&&("object"!=typeof u||"number"!=typeof u.length))throw new Error("JSON.stringify");return str("",{"":r})}),"function"!=typeof JSON.parse&&(JSON.parse=function(t,e){var r;function walk(t,r){var n,u,i=t[r];if(i&&"object"==typeof i)for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&((u=walk(i,n))!==undefined?i[n]=u:delete i[n]);return e.call(t,r,i)}if(t=String(t),c.lastIndex=0,c.test(t)&&(t=t.replace(c,(function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))),u.test(t.replace(i,"@").replace(o,"]").replace(a,"")))return r=Function("return ("+t+")")(),"function"==typeof e?walk({"":r},""):r;throw new Error("JSON.parse")})}function f(t){return t<10?"0"+t:t}function quote(t){return l.lastIndex=0,l.test(t)?'"'+t.replace(l,(function(t){var e=r[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+t+'"'}function str(r,u){var i,o,a,l,c,s=t,p=u[r];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(r)),"function"==typeof n&&(p=n.call(u,r,p)),typeof p){case"string":return quote(p);case"number":return isFinite(p)?String(p):"null";case"boolean":return String(p);case"object":if(!p)return"null";if(t+=e,c=[],"[object Array]"===Object.prototype.toString.apply(p)){for(l=p.length,i=0;i<l;i+=1)c[i]=str(String(i),p)||"null";return a=0===c.length?"[]":t?"[\n"+t+c.join(",\n"+t)+"\n"+s+"]":"["+c.join(",")+"]",t=s,a}if(n&&"object"==typeof n)for(l=n.length,i=0;i<l;i+=1)"string"==typeof n[i]&&(a=str(o=String(n[i]),p))&&c.push(quote(o)+(t?": ":":")+a);else for(o in p)Object.prototype.hasOwnProperty.call(p,o)&&(a=str(o,p))&&c.push(quote(o)+(t?": ":":")+a);return a=0===c.length?"{}":t?"{\n"+t+c.join(",\n"+t)+"\n"+s+"}":"{"+c.join(",")+"}",t=s,a}return"null"}}();var t=";ListFile",e=";charset",r=";Base",dateToBit=function(){for(var t,e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];if(1===r.length)t=r[0];else{var u=r[0],i=r[1],o=r.slice(2);t=_construct(Date,[u,i-1].concat(o)).getTime()}var a=(.001*t+11644473600)/1e-7/Math.pow(2,32),l=Math.floor(a);return{high:l,low:(a-l)*Math.pow(2,32)}},getFiletime=function(t){for(var e,r=[],n=null!=(e=t.split(","))?e:[0],u=0;u<n.length;u++){var i=n[u];r.push(Number(i))}var o=dateToBit.apply(void 0,r);return o.high+"."+o.low},formLfData=function(t,e,r,n){var u,i,o,a;void 0===n&&(n=!1);var l=undefined;~(t=t.replace(e,r)).indexOf(',"comment":')&&(t=t.replace(/,"comment":\s?"(.*)"/,(function(t,e){return l=""+e.replace(/""/g,"`"),""})));var c=function(){t=t.replace(/\\/g,"\\\\");try{return JSON.parse(t)}catch(e){return l=t,{name:"---",sname:"-",att:"264"}}}(),s=c.att!=undefined&&""!==c.att?c.att:"0",p=c.ext!=undefined?"X:"+c.ext:undefined,d=c.hl?"H:"+c.hl:undefined,v=c.mark?"M:"+c.mark:undefined,m=c.oid&&c.ovalue?"O"+c.oid+':"'+c.ovalue+'"':undefined,h=null!=(u=c.name)?u:"",y=[],x=y[0],g=y[1],P=y[2];if(n){var b="-"===h?["-","---"]:[l,h];h=b[0],l=b[1]}return c.date?(g=x=getFiletime(c.date),P=x):(x=c.create?getFiletime(c.create):"0.0",g=c.access?getFiletime(c.access):"0.0",P=c.write?getFiletime(c.write):"0.0"),l&&(l='T:"'+l+'"'),['"'+h+'"','"'+(null!=(i=c.sname)?i:"")+'"',"A:H"+s,"C:"+x,"L:"+g,"W:"+P,"S:"+(null!=(o=c.size)?o:"0.0"),"R:"+(null!=(a=c.reparse)?a:"0.0"),p,d,v,m,l].removeEmpty().join(",")},createLfItems=function(t){for(var e=t.lines,r=t.rgx,n=t.rep,u=t.virtualEntry,i=void 0!==u&&u,o=[],a=0;a<e.length;a++){var l=e[a];o.push(formLfData(l,r,n,i))}return o},createLfMeta=function(n){var u=n.charset,i=void 0===u?"utf16le":u,o=n.basepath,a=n.dirtype,l=void 0===a?"0":a,c=n.opts,s=[t];if("utf16le"!==i&&s.push(e+"="+i),""!==o&&s.push(r+"="+o+"|"+l),c&&c.length>0)for(var p=0;p<c.length;p++){var d=c[p];s.push(d)}return s},n={ppmName:"ppx-plugin-manager",ppmVersion:.95,language:"ja",nlcode:"\r\n",nltype:"crlf",ppmID:"P",ppmSubID:"Q"},useLanguage=function(){var t=PPx.Extract("%*getcust(S_ppm#global:lang)");return"en"===t||"ja"===t?t:n.language},tmp=function(){var t=PPx.Extract('%*extract(C,"%%*temp()")');return{dir:t,file:t+"_ppmtemp",lf:t+"_temp.xlf",stdout:t+"_stdout",stderr:t+"_stderr",ppmDir:function(){var t=PPx.Extract("%'temp'%\\ppm");return PPx.Execute("*makedir "+t),t}}},u=PPx.CreateObject("Scripting.FileSystemObject"),expandNlCode=function(t){var e="\n",r=t.indexOf("\r");return~r&&(e="\r\n"==t.substring(r,r+2)?"\r\n":"\r"),e},isCV8=function(){return"ClearScriptV8"===PPx.ScriptEngineName},i={TypeToCode:{crlf:"\r\n",cr:"\r",lf:"\n"},CodeToType:{"\r\n":"crlf","\r":"cr","\n":"lf"},Ppx:{lf:"%%bl",cr:"%%br",crlf:"%%bn",unix:"%%bl",mac:"%%br",dos:"%%bn","\n":"%%bl","\r":"%%br","\r\n":"%%bn"},Ascii:{lf:"10",cr:"13",crlf:"-1",unix:"10",mac:"13",dos:"-1","\n":"10","\r":"13","\r\n":"-1"}},exec=function(t,e){try{var r;return[!1,null!=(r=e())?r:""]}catch(n){return[!0,""]}finally{t.Close()}},read=function(t){var e=t.path,r=t.enc,n=void 0===r?"utf8":r;if(!u.FileExists(e))return[!0,e+" not found"];var i=u.GetFile(e);if(0===i.Size)return[!0,e+" has no data"];var o=!1,a="";if("utf8"===n){var l=PPx.CreateObject("ADODB.Stream"),c=exec(l,(function(){return l.Open(),l.Charset="UTF-8",l.LoadFromFile(e),l.ReadText(-1)}));o=c[0],a=c[1]}else{var s="utf16le"===n?-1:0,p=i.OpenAsTextStream(1,s),d=exec(p,(function(){return p.ReadAll()}));o=d[0],a=d[1]}return o?[!0,"Unable to read "+e]:[!1,a]},readLines=function(t){var e,r=t.path,n=t.enc,u=void 0===n?"utf8":n,i=t.linefeed,o=read({path:r,enc:u}),a=o[0],l=o[1];if(a)return[!0,l];i=null!=(e=i)?e:expandNlCode(l.slice(0,1e3));var c=l.split(i);return isEmptyStr(c[c.length-1])&&c.pop(),[!1,{lines:c,nl:i}]},writeLines=function(t){var e=t.path,r=t.data,o=t.enc,a=void 0===o?"utf8":o,l=t.append,c=void 0!==l&&l,s=t.overwrite,p=void 0!==s&&s,d=t.linefeed,v=void 0===d?n.nlcode:d;if(!p&&!c&&u.FileExists(e))return[!0,e+" already exists"];var m,h=u.GetParentFolderName(e);if(u.FolderExists(h)||PPx.Execute("*makedir "+h),"utf8"===a){if(isCV8()){var y=r.join(v),x=c?"AppendAllText":"WriteAllText";return[!1,NETAPI.System.IO.File[x](e,y)]}var g=p||c?2:1,P=PPx.CreateObject("ADODB.Stream");m=exec(P,(function(){P.Open(),P.Charset="UTF-8",P.LineSeparator=Number(i.Ascii[v]),c?(P.LoadFromFile(e),P.Position=P.Size,P.SetEOS):P.Position=0,P.WriteText(r.join(v),1),P.SaveToFile(e,g)}))[0]}else{var b=c?8:p?2:1;u.FileExists(e)||PPx.Execute("%Osq *makefile "+e);var O="utf16le"===a?-1:0,S=u.GetFile(e).OpenAsTextStream(b,O);m=exec(S,(function(){S.Write(r.join(v)+v)}))[0]}return m?[!0,"Could not write to "+e]:[!1,""]},pathSelf=function(){var t,e,r=PPx.ScriptName;return~r.indexOf("\\")?(t=r.replace(/^.*\\/,""),e=PPx.Extract("%*name(DKN,"+r+")")):(t=r,e=PPx.Extract("%FDN")),{scriptName:t,parentDir:e.replace(/\\$/,"")}},dialog=function(t,e,r){return void 0===e&&(e=""),e=isEmptyStr(e)?"":"/"+e,0===PPx.Execute('%"ppm'+e+'" %OC %'+t+'"'+r+'"')},msgBox=function(t,e){dialog("I",""+t,""+e)},o={en:{notExists:"Comment file does not exist"},ja:{notExists:"コメントファイルがありません"}},validArgs=function(){for(var t=[],e=PPx.Arguments;!e.atEnd();e.moveNext())t.push(e.value);return t},safeArgs=function(){for(var t=[],e=validArgs(),r=0,n=arguments.length;r<n;r++)t.push(_valueConverter(r<0||arguments.length<=r?undefined:arguments[r],e[r]));return t},_valueConverter=function(t,e){if(null==e||""===e)return null!=t?t:undefined;switch(typeof t){case"number":var r=Number(e);return isNaN(r)?t:r;case"boolean":return"false"!==e&&"0"!==e&&null!=e;default:return e}},a="K_ppmComment",l="00_INDEX.TXT",c="utf16le",s=pathSelf().scriptName,p=o[useLanguage()];(function(){var t=PPx.Extract("%FD\\"+l);u.FileExists(t)||(msgBox(s,p.notExists),PPx.Quit(1));var e=readLines({path:t,enc:c}),r=e[0],n=e[1];r&&(msgBox(s,n),PPx.Quit(1));var i=safeArgs("M wF20 S1 C13 s1","utf16le"),o=i[0],d=i[1],v=/^(sjis|utf8)$/.test(d)?d:"utf16le",m=tmp().lf,h=[';cmd=*viewstyle -temp format "'+o+'"',";ppm=comment",";mapkey="+a],y=PPx.Extract("%FD"),x=v,g="⏎\t"+y+"\t2010",P=/^([^\t]*)\t([^\t]+)(\t(\d+))?$/,b='{"name":"$1","att":"$4","comment":"$2"}',O=createLfMeta({charset:x,basepath:y,dirtype:"4",opts:h}),S=createLfItems({lines:[g].concat(n.lines),rgx:P,rep:b,virtualEntry:!0}),E=writeLines({path:m,data:[].concat(O,S),enc:x,overwrite:!0}),N=E[0],j=E[1];N&&(msgBox(s,j),PPx.Quit(1)),PPx.Execute("*jumppath "+m)})();
