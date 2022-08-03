let md5 = require("md5");
let fetch = require("node-fetch");
let jars = Object.create(null);
let contexts = Object.create(null);
let UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/501.12 (KHTML, like Gecko) Chrome/90 Safari/501.12";

module.exports = async function(stim, id){
  let context = id;
  if(!Array.isArray(id)){
    context = contexts[id] || (contexts[id]=[])
  }
	if(typeof id != 'string')id=''
  if(!jars[id])jars[id] = await fetch("https://www.cleverbot.com/extras/conversation-social-min.js",{headers:{"User-Agent":UA,Cookie:''}}).then(a => (a.headers.raw()['set-cookie']||[""])[0].split(";")[0]);
  var payload = "stimulus=" + escape(escape(stim)).replace(/%u/g, "|") + "&islearning=1&cb_settings_language=ru&icognocheck=";
  payload += md5(payload.substring(7, 33));
  while(context.length > 10)context.shift()
  let l = context.length - 1;
  for (let i = 0; i <= l; i++) {
    payload += `&vText${i + 2}=${escape(escape(context[l-i]).replace(/%u/g, "|"))}`;
  }
  let res = await fetch("https://www.cleverbot.com/webservicemin?uc=UseOfficialCleverbotAPI",{method:"POST",body:payload,headers:{"Content-Type":"text/plain","User-Agent":UA,Cookie:jars[id]}})
  .then(a=>a.text()).then(a=>a.split("\r")[0]);
	if(res=='<html>')throw new Error('Rate-limit or other authentification issue. If this persists, email me blob.kat@hotmail.com')
  if(id!=void 0)context.push(stim);
  if(id!=void 0)context.push(res);
  return res;
}