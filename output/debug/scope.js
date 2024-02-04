function a(d, b, x) {
  let l = "";
  for (let v = 0; v < d.length; v++) l += String.fromCharCode(d.charCodeAt(v) ^ b + v + x);
  return l;
}
const w = (d, b) => a(d, b, 5176121559162428);
var f, g, z; // Declare 3 variables
f = 5; // Assign the value 5 to x
g = 6; // Assign the value 6 to y
z = f + g; // Assign the sum of x and y to z

function p(f, g) {
  return f + g;
}
{
  const o = (d, b) => a(d, b, 8892431720434384);
  const f = 1;
  console[o("\u3C80\u3C82\u3C89", 17265180)](f, z, f + z);
}
console[w("\uC6AF\uC6AB\uC6A2", 23505031)](f, g, z);
console[w("\u7F25\u7F25\u7F2C", 15884557)](p(1, 2));