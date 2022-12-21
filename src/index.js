const Wallet = require('./blockchain/wallet');
const Blockchain = require('./blockchain/blockchain');
const Block = require('./blockchain/block');
const sha256 = require('crypto-js/sha256');
var fs = require('fs');
function getCookie_(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return /*parts.pop().split(';').shift()*/ true;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const myW = new Wallet();
if (getCookie_("_pk") === false){
  document.cookie = `_pk=${myW.privateKey}`;
} else if (getCookie_("_pk")) {
  myW.import(getCookie("_pk"));
} else {
  document.cookie = `_pk=${myW.privateKey}`;
}
document.getElementById("address").innerText = myW.address;
const bl = new Blockchain;
console.log(bl);
document.getElementById("bd").innerHTML = 
`<div>
  <p style="font-family: spacemono;"><b>CURRENT BLOCK :</b> ${JSON.stringify((bl.chain[0]).nonce)}</p>
  <p style="font-family: spacemono;"><b>CURRENT HASH :</b> ${JSON.stringify((bl.chain[0]).hash)}</p>
  <p style="font-family: spacemono;"><b>MINER :</b> ${JSON.stringify((bl.chain[0]).miner)}</p>
  <p style="font-family: spacemono;"><b>EXTRA DATA :</b> ${JSON.stringify((bl.chain[0]).data)}</p>
  <br><br><button id="mine" class="glow-on-hover" type="button" style="font-family: spacemono;">START MINING</button><div id="stop-mine"></div>
</div>
`;
let i = 1;
async function delayMine() {
  document.getElementById("bd").innerHTML = `<p style="font-family: spacemono;">SETTING UP YOUR MINING RIGS<br>PLEASE WAIT ...</p><p id='stop-mine'></p>`
  let time = 5 * 1000;
  var mining = true;
  console.log("MINING STARTED");
  let diff = 1;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  while (mining) {
    document.getElementById('stop-mine').addEventListener("click", function() {mining=false})
    await delay(time);
    diff = Math.floor(bl.chain[i-1].nonce/50);
    bl.mineBlock("node_miner OMCHAIN v0.0.1", myW.address, diff);
    document.getElementById("bd").innerHTML = 
    `<div>
      <p style="font-family: spacemono;"><b>CURRENT BLOCK :</b> ${JSON.stringify((bl.chain[i]).nonce)}</p>
      <p style="font-family: spacemono;"><b>CURRENT HASH :</b> ${JSON.stringify((bl.chain[i]).hash)}</p>
      <p style="font-family: spacemono;"><b>PREVIOUS HASH :</b> ${JSON.stringify((bl.chain[i]).previousHash)}</p>
      <p style="font-family: spacemono;"><b>MINING TIME:</b> ${(parseInt(JSON.stringify((bl.chain[i]).timestamp))-parseInt(JSON.stringify((bl.chain[i-1]).timestamp)))/1000} secs</p>
      <p style="font-family: spacemono;"><b>MINER :</b> ${JSON.stringify((bl.chain[i]).miner)}</p>
      <p style="font-family: spacemono;"><b>EXTRA DATA :</b> ${JSON.stringify((bl.chain[i]).data)}</p>
      <br><br><button id="stop-mine" class="glow-on-hover" type="button" style="font-family: spacemono;">STOP MINING</button>
    </div>
    `;
    if (mining) {
      null;
    } else {
      document.getElementById("bd").innerHTML = 
        `<div style="font-family: spacemono;">
          MINING STOPPED :)
          <br><br><button id="mine" class="glow-on-hover" type="button" style="font-family: spacemono;">START MINING</button><div id="stop-mine"></div>
        </div>
        `;
      break;
    }
    i ++;
    console.log("BLOCK NO." + (i-1) + " MINED");
  }
  document.getElementById('mine').addEventListener("click", delayMine);
}
document.getElementById('mine').addEventListener("click", delayMine);