//dependencies

const Wallet = require('./blockchain/wallet');
const Blockchain = require('./blockchain/blockchain');
const Block = require('./blockchain/block');
const sha256 = require('crypto-js/sha256');
//var fs = require('fs');

// important functions
function getCookie_(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return true;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


//wallet generation
const myW = new Wallet();
if (getCookie_("_pk") === false){
  document.cookie = `_pk=${myW.privateKey}`;
} else if (getCookie_("_pk")) {
  myW.import(getCookie("_pk"));
} else {
  document.cookie = `_pk=${myW.privateKey}; SameSite=None; secure`;
}
document.getElementById("address").innerText = myW.address;


//blockchain initalisation
const bl = new Blockchain;
//console.log(bl);


//variables
let i = 0;              //block nonce
var mining = true;      //mining check
let time = 5 * 1000;    //time to wait before mining next block

//home function
async function home() {

  document.getElementById('main').innerHTML = `<div id="bd" class="bd" style="font-family: spacemono;">MINING GENESIS BLOCK<div id="stop-mine"></div></div>`;

  document.getElementById("bd").innerHTML = 
  `<div>
    <p style="font-family: spacemono;"><b style="font-family: spacemonob;">CURRENT BLOCK :</b> ${JSON.stringify((bl.chain[i]).nonce)}</p>
    <p style="font-family: spacemono;"><b style="font-family: spacemonob;">CURRENT HASH :</b> ${JSON.stringify((bl.chain[i]).hash)}</p>
    <p style="font-family: spacemono;"><b style="font-family: spacemonob;">MINER :</b> ${JSON.stringify((bl.chain[i]).miner)}</p>
    <p style="font-family: spacemono;"><b style="font-family: spacemonob;">EXTRA DATA :</b> ${JSON.stringify((bl.chain[i]).data)}</p>
    <br><br><button id="mine" class="glow-on-hover" type="button" style="font-family: spacemono;">START MINING</button><div id="stop-mine"></div>
  </div>
  `;

  //mining function
  async function delayMine() {

    //initalisation text
    document.getElementById("bd").innerHTML = `<p style="font-family: spacemono;">MINING BLOCK -- ${i + 1}</p><p id='stop-mine'></p><p id="mine"></p>`

    console.log("MINING STARTED");

    //delay constant
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    //mining loop
    while (mining) {

      //click to stop mining
      document.getElementById('stop-mine').addEventListener("click", function() {mining=false});

      //wait 
      await delay(time);

      //mine block
      bl.mineBlock("node_miner OMCHAIN v0.0.1", myW);

      //reflect block details
      document.getElementById("bd").innerHTML = 
      `<div>
        <p style="font-family: spacemono;"><b style="font-family: spacemonob;">CURRENT BLOCK :</b> ${JSON.stringify((bl.chain[i+1]).nonce)}</p>
        <p style="font-family: spacemono;"><b style="font-family: spacemonob;">CURRENT HASH :</b> ${JSON.stringify((bl.chain[i+1]).hash)}</p>
        <p style="font-family: spacemono;"><b style="font-family: spacemonob;">PREVIOUS HASH :</b> ${JSON.stringify((bl.chain[i+1]).previousHash)}</p>
        <p style="font-family: spacemono;"><b style="font-family: spacemonob;">MINING TIME:</b> ${(parseInt(JSON.stringify((bl.chain[i+1]).timestamp))-parseInt(JSON.stringify((bl.chain[i]).timestamp)))/1000} secs</p>
        <p style="font-family: spacemono;"><b style="font-family: spacemonob;">MINER :</b> ${JSON.stringify((bl.chain[i+1]).miner)}</p>
        <p style="font-family: spacemono;"><b style="font-family: spacemonob;">EXTRA DATA :</b> ${JSON.stringify((bl.chain[i+1]).data)}</p>
        <p style="font-family: spacemono;"><b style="font-family: spacemonob;">MINER REWARD :</b> ${JSON.stringify((bl.chain[i+1]).reward)} MANTRAS</p>
        <br><br><button id="stop-mine" class="glow-on-hover" type="button" style="font-family: spacemono;">STOP MINING</button>
      </div>
      `;


      //check chain validity
      if (bl.isChainValid) {
        document.getElementById('chainValidity').innerText = `VALID BLOCK ${i+1}`
      } else {
        document.getElementById('bd').innerText = `<p style="font-family: spacemonob;">BLOCKCHAIN IS INVALID OR ENCOUNTERED SOME INTERNAL ERRORS</p>`
        document.getElementById('chainValidity').innerText = `INVALID BLOCK ${i+1}`
        break;
      }

      //increases block nonce by 1
      i ++;

      //logs mined block in console
      console.log("BLOCK NO." + (i) + " MINED");
      
      //checks mining status
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
    }

    //click to mine
    document.getElementById('mine').addEventListener("click", delayMine);
  }

  //click to mine
  document.getElementById('mine').addEventListener("click", delayMine);
}


//privatekey show function
async function revealPrivateKey() {
  document.getElementById('privKey').innerHTML=`<p>${getCookie('_pk')}</p><p id="revPrivateKey"></p>`
  return null;
}

//accountDetails function
async function accountDetails(address) {
  document.getElementById('bd').innerHTML = 
    `
    <h2 style="font-family: spacemonob;">MINING STOPS WHEN YOU OPEN THIS TAB :/<br>THIS WILL BE FIXED SOON ...</h2><br><br>
    <p style="font-family: spacemono;"><b style="font-family: spacemonob;">ADDRESS : </b>${myW.address}</p>
    <p style="font-family: spacemono;"><b style="font-family: spacemonob;">BALANCE : </b>${myW.balance} MANTRAS ≈ ₹${Math.round((myW.balance)*(1/100))*1/100}</p>
    <br><br><div id="privKey"><button id="revPrivateKey" class="revPrivateKey">REVEAL PRIVATE KEY</button></div>
    `
    document.getElementById('revPrivateKey').addEventListener('click', revealPrivateKey)
}

//blockexplorer function
async function blockExplorer() {

  //chainData table
  var chainData = '<tr><th>NONCE</th><th>HASH</th><th>TIMESTAMP</th></tr>';

  //making table responsive
  var tableScript = '';
  
  //loop for table
  for (var n = bl.chain.length - 1; n >= 0; n--) {
    chainData += `<tr><td id="d${bl.chain[n].nonce}">${bl.chain[n].nonce}</td><td>${bl.chain[n].hash}</td><td>${bl.chain[n].timestamp}</td></tr>`
    tableScript += `document.getElementById(d${bl.chain[n].nonce}).addEventListener("click", function(){getDataByBlockNumber(${bl.chain[n].nonce})});`
  }

  //get block data function by block number
  async function getDataByBlockNumber(blockNumber) {
    var data = bl.chain[blockNumber]
    return JSON.stringify(data);
  }
  //console.log(getDataByBlockNumber(10));
  document.getElementById('bd').innerHTML = 
    `
    <h2 style="font-family: spacemonob;">MINING STOPS WHEN YOU OPEN THIS TAB :/<br>THIS WILL BE FIXED SOON ...</h2><br><br>
    <div style="font-family: spacemono;"> AVERAGE MINING TIME -- [TO BE ADDED SOON]</div>
    <div style="font-family: spacemono;"> LAST BLOCK -- ${bl.chain[i].nonce}</div>
    <div style="font-family: spacemono;"> TOP MINER (last 100 blocks) -- ${bl.chain[(i)].miner} </div><br><br><br><br>
    <div style="font-family: spacemonob;overflow-x:auto;">
      <table>
        ${chainData}
      </table>
      <script>
        ${tableScript}
      </script>
    </div>
    `;
}


//button clicks
document.getElementById('home').addEventListener("click", function () {mining=true;home();});
document.getElementById('account').addEventListener("click", function () {mining=false;accountDetails();});
document.getElementById('explorer').addEventListener("click", function () {mining=false;blockExplorer();});


//home function initalisation by default
home();