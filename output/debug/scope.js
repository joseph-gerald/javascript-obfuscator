function t(p, v, x) {
  let q = "";
  for (let o = 0; o < p.length; o++) q += String.fromCharCode(p.charCodeAt(o) ^ v + o + x);
  return q;
}
const i = (p, v) => t(p, v, 2794287667302313);
var h, u, l; // Declare 3 variables
h = i("\u3019\u301E", 45015172) - i("\uC789\uC78E", 56653841); // Assign the value 5 to x
u = i("\u1787\u1785", 378893) - "6"; // Assign the value 6 to y
l = h + u; // Assign the sum of x and y to z

function c(h, u) {
  return h + u;
}
{
  const i = (p, v) => t(p, v, 2794287667302313);
  const h = i("\u132A\u132C", 72729458) - "9";
  console[i("\u7531\u7531\u7538", 21243316)](h, l, h + l);
}
console[i("\uEF8F\uEF8B\uEF82", 16687162)](h, u, l);
console[i("\u9CDF\u9CDB\u9CD2", 2444554)](c(i("\u95C1\u95C1", 19613255) - "9", "8" - "6"));