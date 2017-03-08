/* WORD CHAIN */
const fs = require('fs');

//test inputs
const inputs = [
  //{start: 'ape', end: 'man'},
  //{start: 'cat', end: 'dog'},
  //{start: 'lead', end: 'gold'},
  //{start: 'take', end: 'fort'},
  //{start: 'poor', end: 'rich'},
  //{start: 'might', end: 'teeth'},
  {start: 'flower', end: 'gloden'},
];

let allwords;

//load dictionary
fs.readFile('websters-dictionary', 'utf8', (err, contents) => {
    allwords = contents.split(/\r?\n/);
    init();
});

function init() {
  inputs.forEach(ele => {
    console.time('timecheck');
    const inputlen = ele.start.length;
    const wordsOfSameLen = allwords.filter(ele => ele.length === inputlen);
    compute(ele.start, ele.end, wordsOfSameLen);
    console.timeEnd('timecheck');
  })
}

function compute(start, end, words) {

  const rootnode = new Node(null ,start);
  const itrateArray = [rootnode];

  loop1:
  while(itrateArray.length) {

    const curNode = itrateArray.shift();
    const nextlevelwords = findSubnodesAlt(curNode.data, words);

    loop2:
    for(let ele of nextlevelwords) {
      if(ele === end) {
        console.log(`${curNode.printPath()},${end}`);
        break loop1;
      }
      else {
        const newNode = new Node(curNode,ele);
        curNode.pushChild(newNode);
        itrateArray.push(newNode);
      }
    };
  }

}

let lookupalt = {}; //local cache
function findSubnodesAlt(par, words) {
  if(lookupalt[par]) {
    return lookupalt[par];
  }
  let retArray = [];
  let charArray = par.split('');
  for (let ch = 97; ch <= 122; ch++) {
    for(let i = 0; i < charArray.length; i++) {
      const cha = String.fromCharCode(ch);
      if (charArray[i] == cha) continue;
      const old_ch = charArray[i];
      charArray[i] = cha;
      if( words.indexOf(charArray.join('')) > -1 ) {
        retArray.push(charArray.join(''));
      }
      charArray[i] = old_ch;
    }
  };
  lookupalt[par] = retArray;
  return lookupalt[par];
}

let lookup = {}; //local cache
function findSubnodes(par, words) {
  if(lookup[par]) {
    return lookup[par];
  }
  else {
    lookup[par] = words.filter(ele => testword(ele, par));
  }
  return lookup[par];
}

//Hamming distance
function testword(main, target) {
  let misscount = 0;
  for(let i=0; i<main.length; i++) {
    if (main[i] != target[i]) {
      misscount++;
    }
  }
  return misscount === 1;
}


//Tree data
function Node(parent, data) {
  this.parent = parent;
  this.children = [];
  this.data = data;
}

Node.prototype.pushChild = function(node){
  this.children.push(node);
}

Node.prototype.printPath = function() {
  let outputName = [];
  let node = this;
  while (node.parent) {
    outputName.push(node.data);
    node = node.parent;
  }
  outputName.push(node.data);
  return outputName.reverse().join(',');
}
