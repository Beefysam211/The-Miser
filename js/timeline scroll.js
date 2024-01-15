$(document).ready(function() {
  var navbar = null;
  var main = null;
  
  // SMOOTH SCROLLING SECTIONS
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
      || location.hostname == this.hostname) {
  
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
  
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
  
    //return ((elementBottom > viewportTop && elementTop < viewportBottom) || {dTop:(viewportTop-elementBottom), dBottom:(elementTop - viewportBottom)} );
    if(((elementTop > viewportTop) && (elementTop < (viewportBottom-200)))) return true;
    return {dTop:(elementTop-viewportTop), dBottom:((viewportBottom-200) - elementTop)};
  };
  
  $.fn.scrollStopped = function(callback) {
    var that = this, $this = $(that);
    $this.scroll(function(ev) {
      clearTimeout($this.data('scrollTimeout'));
      $this.data('scrollTimeout', setTimeout(callback.bind(that), 500, ev));
    });
  };
  
  var longScroll = false;
  
  $(window).scrollStopped(function(ev) {
    adjustNav();
    //unfadeMain();
    // main.classList.remove('faded');
    // navbar.classList.add('faded'); 
    // longScroll = false;
    // console.log(longScroll);
  });  
  
  $(window).resize(function() {
    adjustNav();
  });
  
  // $(window).scroll(function() {
  //   if(!longScroll) {
  
  //     //start timing
  //     setTimeout(function() {
  //           longScroll=true;
  //       //if scroll stop hasnt ended long scroll
  //       console.log(longScroll);
  //       if(longScroll) {
  //         fadeMain();      
  //       }
  //     }, 2000)
  //   }
    
  //   // main.classList.add('faded');
  //   // navbar.classList.remove('faded');
  // });
  
  
  
  
  function adjustNav() {
    var result = $('li.active').isInViewport();
    //var result = document.querySelector('li.active').isInViewport();
      if (result === true) {
        // do nothing
      } else {
        if(result.dBottom < 0) {
          //var old = parseInt($('#navbar').css('top'));
          var curr = parseInt(navbar.style.top);
          var newTop = curr+Math.round(result.dBottom*1)+'px';
          //$('#navbar').css('top', newTop);
          navbar.style.top = newTop;
        }
        else if(result.dTop < 0) {
          var curr = parseInt($('#navbar').css('top'));
          var newTop = curr+Math.round(result.dTop*-1)+'px';
          $('#navbar').css('top', newTop);          
        }
      }
  
  
  }
  
  function fadeMain() {
      //if small viewport fade main text & show sidebar for 2s or so
      // $('#main').addClass('faded');
      // $('#navbar').removeClass('faded');
      main.classList.add('faded');
      navbar.classList.remove('faded');
  }
  
  function unfadeMain() {
      main.classList.remove('faded');
      navbar.classList.add('faded');
  }
  
  $(document).ready(function() {
    console.log('x');
    main = document.getElementById('main');
    navbar = document.getElementById('navbar');
    navbar.style.top = '0px';
  });
  
  });
  
  