e.exports = function (e, t, n) {
  var r = t[0],
    i = t[1],
    o = t[2],
    a = n[3] * r + n[7] * i + n[11] * o + n[15];
  return (
    (a = a || 1),
    (e[0] = (n[0] * r + n[4] * i + n[8] * o + n[12]) / a),
    (e[1] = (n[1] * r + n[5] * i + n[9] * o + n[13]) / a),
    (e[2] = (n[2] * r + n[6] * i + n[10] * o + n[14]) / a),
    e
  );
};
