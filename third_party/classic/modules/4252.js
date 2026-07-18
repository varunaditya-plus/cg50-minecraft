e.exports = function (e, t, n, r) {
  return (
    (e[0] = t[0] + n[0] * r),
    (e[1] = t[1] + n[1] * r),
    (e[2] = t[2] + n[2] * r),
    e
  );
};
