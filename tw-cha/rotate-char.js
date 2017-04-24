/*

Julius Caesar protected his confidential information from his enemies by encrypting it. 
Caesar rotated every letter in the string by a fixed number K. 
This made the string unreadable by the enemy.
You are given a string S and the number K. What is the enrcypted string?
K: 55
S: Caesar salad - aka Et tu, Brute?

Example:
If the string is 'BAZ-zeg' and K=2, the encoded string is 'DCB-bgi'. Note that only the letters are encrypted while symbols like '-' are untouched.
'B' becomes 'D' when rotated twice,
'Z' becomes 'B',
'-' remains the same because only letters are encoded,
'z' becomes 'b' when rotated twice.


*/

function decode(str, k) {
  var charCodeArray = [];
  for(char of str) {

    var charcode = char.charCodeAt(0);
    var normilizeK = k%26;
    var newCharcode = charcode;

    if(charcode >= 65 && charcode <= 90) {
      newCharcode = charcode + normilizeK;
      if(newCharcode > 90) {
        newCharcode = 64 + (newCharcode - 90);
      }
    }

    if(charcode >= 97 && charcode <= 122) {
      newCharcode = charcode + normilizeK;
      if(newCharcode > 122) {
        newCharcode = 96 + (newCharcode - 122);
      }
    }

    charCodeArray.push(newCharcode);
  }
  return String.fromCharCode.apply(null, charCodeArray);
}


 decode('BAZ-zeg', 2) === 'DCB-bgi'
