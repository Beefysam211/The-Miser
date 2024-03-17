let nextPages = [
    '/pages/page2',
    '/pages/page3',
  ];
  
$('.collumns').infiniteScroll({
  // options
  path: function() {
    return nextPages[ this.loadCount ] + '.html';
  },
  append: '.collumn',
  status: '.page-load-status',
  hideNav: '.pagination',
  history: 'push',
});