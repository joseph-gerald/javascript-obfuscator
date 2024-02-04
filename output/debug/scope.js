const b = [47507840, 73926222, 8844447418326777, "멑멑멘", 0, "ꜵ", "汏汍", "蠕蠕蠜", 60635189, "ꕰ", "�", "ꜧꜥ", 73657685, "휟휛", 84987269, 70645929, 53789923, "谢谠谷", "", "揮揭", 49612820, "┥", "鞑鞕", 80807963, 35593028, "㩮㩕", 40451267, 16489318, 62686748];
function d(f, w, h) {
  let j = b[18];
  for (let a = b[4]; a < f.length; a++) j += String.fromCharCode(f.charCodeAt(a) ^ w + a + h);
  return j;
}
const c = (f, w) => d(f, w, b[2]);
var o, y, u;
o = c(b[19], b[16]) - c(b[25], b[27]);
y = c(b[22], b[15]) - c(b[11], b[23]);
u = o + y;
function r(o, y) {
  return o + y;
}
{
  const c = (f, w) => d(f, w, b[2]);
  const o = c(b[5], b[20]) - c(b[9], b[1]);
  console[c(b[17], b[12])](o, u, o + u);
}
console[c(b[7], b[b[4]])](o, y, u);
console[c(b[3], b[24])](r(c(b[10], b[26]) - c(b[21], b[28]), c(b[13], b[8]) - c(b[6], b[14])));