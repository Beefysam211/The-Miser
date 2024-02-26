$(document).ready(function () {
  var t = null;
  function o() {
    var o = $("li.active").isInViewport();
    if (!0 === o);
    else if (o.dBottom < 0) {
      var n = parseInt(t.style.top) + Math.round(1 * o.dBottom) + "px";
      t.style.top = n;
    } else if (o.dTop < 0) {
      n = parseInt($("#navbar").css("top")) + Math.round(-1 * o.dTop) + "px";
      $("#navbar").css("top", n);
    }
  }
  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") ||
      location.hostname == this.hostname
    ) {
      var t = $(this.hash);
      if ((t = t.length ? t : $("[name=" + this.hash.slice(1) + "]")).length)
        return $("html,body").animate({ scrollTop: t.offset().top }, 1e3), !1;
    }
  }),
    ($.fn.isInViewport = function () {
      var t = $(this).offset().top;
      $(this).outerHeight();
      var o = $(window).scrollTop(),
        n = o + $(window).height();
      return (t > o && t < n - 200) || { dTop: t - o, dBottom: n - 200 - t };
    }),
    ($.fn.scrollStopped = function (t) {
      var o = this,
        n = $(o);
      n.scroll(function (e) {
        clearTimeout(n.data("scrollTimeout")),
          n.data("scrollTimeout", setTimeout(t.bind(o), 500, e));
      });
    }),
    $(window).scrollStopped(function (t) {
      o();
    }),
    $(window).resize(function () {
      o();
    }),
    $(document).ready(function () {
      console.log("x"),
        document.getElementById("main"),
        ((t = document.getElementById("navbar")).style.top = "0px");
    });
});
