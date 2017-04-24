/*

Hallelujah! Your keyword is: count-to-the-errr
In the next challenge you'll get a random string in DevChallenge.data
Your task is to answer how many at least two character long substrings does it contain which has maximum two different letters.

Example:
    'aabaccb'
        ['aa', 'aab', 'ab', 'aaba', 'aba', 'ba', 'ac', 'acc', 'cc', 'ccb', 'cb'] -> 11
    'abcabc'
        ['ab', 'bc', 'ca', 'ab', 'bc'] -> 5

Your string is: cbdebcadeb

*/

function findSubStr(str) {

  var resultarray = [];
  var teststr = '';
  var numberOfDiffChar = 0;

  if(!str.length) return [];

  for (char of str) {
    if(teststr.indexOf(char) < 0) {
      numberOfDiffChar++;
    }
    teststr += char;
    if(teststr.length === 2) {
      resultarray.push(teststr);
    }
    else if(teststr.length > 2 && numberOfDiffChar <= 2) {
      resultarray.push(teststr);
    }
    else if(numberOfDiffChar > 2){
      break;
    }
  }

  return resultarray.concat( findSubStr(str.slice(1)) );
}

findSubStr('aabaccb').length;
findSubStr('abcabc').length;
findSubStr('cbdebcadeb').length;