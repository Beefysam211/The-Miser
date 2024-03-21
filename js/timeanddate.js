document.getElementById('timezone-info').textContent="Acquiring system timezone...";function display_c(){mytime=setTimeout(display_ct,1000)}
function display_ct(){var currentTime=new Date();document.getElementById('timezone-info').textContent=currentTime;display_c()}
display_c()