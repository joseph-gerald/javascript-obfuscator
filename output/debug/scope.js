function _xor(str, key) {
  let _893584 = "";
  for (let _48737280 = 0; _48737280 < str["length"]; _48737280++) {
    _893584 += String["fromCharCode"](str["charCodeAt"](_48737280) ^ key);
  }
  return _893584;
}
var _98156464, _145983776, _195401936; // Declare 3 variables
_98156464 = 5; // Assign the value 5 to x
_145983776 = 6; // Assign the value 6 to y
_195401936 = _98156464 + _145983776; // Assign the sum of x and y to z

{
  function _xor(str, key) {
    let _893584 = "";
    for (let _48737280 = 0; _48737280 < str["length"]; _48737280++) {
      _893584 += String["fromCharCode"](str["charCodeAt"](_48737280) ^ key);
    }
    return _893584;
  }
  const _98156464 = 1;
  console[_xor("\u04C5\u04C6\u04CE", 1193)](_98156464, _195401936, _98156464 + _195401936);
}
console[_xor("\u24DD\u24DE\u24D6", 9393)](_98156464, _145983776, _195401936);