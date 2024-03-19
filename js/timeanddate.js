function display_c() {
    mytime = setTimeout('display_ct()', 1e3)
}
function display_ct() {
    var n = new Date()
    ;(document.getElementById('ct').innerHTML = n), display_c()
}
