let e,
  t,
  o,
  n,
  d,
  a,
  c,
  i,
  r = 2,
  s = 2;
const l = [],
  m = document.getElementById("mode-toggle");
let g = !1;
function h() {
  n.save(),
    (n.fillStyle = g ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"),
    n.fillRect(0, 0, t, o),
    n.restore();
}
function u() {
  let e, m, h, u, k, w, y, M, L, b, v, E, S, I, z, p;
  n.save(),
    g
      ? ((n.fillStyle = "rgb(15, 15, 15)"), (n.strokeStyle = "rgb(249, 247, 241)"))
      : ((n.fillStyle = "rgb(249, 247, 241)"), (n.strokeStyle = "rgb(15, 15, 15))),
    n.fillRect(0, 0, t, o),
    n.restore(),
    (n.strokeStyle = g ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"),
    (r += 0.01 * (s - r));
  const x = 0.5 * Math.PI;
  n.beginPath();
  for (let t = 0; t < 400; t++)
    (e = l[t]),
      (e.pastZ = e.z),
      (e.z -= r),
      e.z <= 0
        ? f(e)
        : ((m = d - 1.25 * (c - d)),
          (h = a - 1.25 * (i - a)),
          (u = e.x - m),
          (k = e.y - h),
          (w = 500 / e.z),
          (y = m + u * w),
          (M = h + k * w),
          (L = 0.3 * w),
          (b = 500 / e.pastZ),
          (v = m + u * b),
          (E = h + k * b),
          (S = 0.3 * b),
          (I = Math.atan2(E - M, v - y)),
          (z = I + x),
          (p = I - x),
          n.moveTo(v + S * Math.cos(z), E + S * Math.sin(z)),
          n.arc(v, E, S, z, p, !0),
          n.lineTo(y + L * Math.cos(p), M + L * Math.sin(p)),
          n.arc(y, M, L, p, z, !0),
          n.closePath());
  n.fill(), n.stroke();
}
function f(e) {
  return (
    (e.x = Math.random() * t),
    (e.y = Math.random() * o),
    (e.z = 1500 * Math.random() + 500),
    e
  );
}
function k(e, t, n) {
  (this.x = e || 0), (this.y = t || 0), (this.z = n || 0), (this.pastZ = 0);
}
m.addEventListener("change", function () {
  (g = !g), h(), u();
}),
  window.addEventListener("load", function () {
    function r() {
      (t = e.width = 1.0 * window.innerWidth),
        (o = e.height = 1.1 * window.innerHeight),
        (d = 0.5 * t),
        (a = 0.5 * o),
        (n = e.getContext("2d")),
        h();
    }
    (e = document.getElementById("c")),
      window.addEventListener("resize", r),
      r(),
      (c = d),
      (i = a);
    for (let e = 0; e < 400; e++)
      (l[e] = f(new k())), (l[e].z -= 500 * Math.random());
    document.addEventListener("mousemove", function (e) {
      (c = e.clientX), (i = e.clientY);
    }),
      document.addEventListener("mousedown", function () {
        s = 200;
      }),
      document.addEventListener("mouseup", function () {
        s = 2;
      }),
      setInterval(u, 1e3 / 60);
  }),
  window.addEventListener("load", function () {
    "true" === localStorage.getItem("darkMode") && ((g = !0), (m.checked = !0)),
      document.body.classList.toggle("dark-mode", g),
      m.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode", m.checked),
          localStorage.setItem("darkMode", m.checked);
      });
  }),
  "true" === localStorage.getItem("darkMode") && ((g = !0), (m.checked = !0)),
  document.body.classList.toggle("dark-mode", g),
  m.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", m.checked),
      localStorage.setItem("darkMode", m.checked);
  }),
  window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    ((g = !0), document.body.classList.add("dark-mode"), (m.checked = !0)),
  window.addEventListener("load", function () {
    const e = localStorage.getItem("darkMode");
    "true" === e
      ? ((g = !0), (m.checked = !0))
      : "false" === e && ((g = !1), (m.checked = !1)),
      document.body.classList.toggle("dark-mode", g);
  });
