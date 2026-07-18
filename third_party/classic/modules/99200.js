e.exports = function (e, t, n) {
  return (
    (e[0] = Math.max(t[0], n[0])),
    (e[1] = Math.max(t[1], n[1])),
    (e[2] = Math.max(t[2], n[2])),
    e
  );
};
