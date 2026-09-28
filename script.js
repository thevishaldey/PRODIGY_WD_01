(function(){
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progress');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
  var sections = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });

  function onScroll(){
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // 1. Change nav style after scrolling past 40px
    nav.classList.toggle('scrolled', y > 40);

    // 2. Reading progress bar
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    // 3. Highlight the link for the section currently in view
    var pos = y + 120, current = 0;
    sections.forEach(function(s, i){ if (s && s.offsetTop <= pos) current = i; });
    if (max > 0 && y >= max - 4) current = sections.length - 1;
    links.forEach(function(a, i){ a.classList.toggle('active', i === current); });
  }

  var ticking = false;
  window.addEventListener('scroll', function(){
    if (!ticking){ requestAnimationFrame(function(){ onScroll(); ticking = false; }); ticking = true; }
  }, {passive:true});
  document.addEventListener('scroll', onScroll, {passive:true, capture:true}); // catches any scroll container
  window.addEventListener('resize', onScroll);
  setInterval(onScroll, 150); // safety net
  onScroll();

  // Mobile menu
  burger.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    if (open) nav.classList.add('scrolled');   // solid background so links stay readable
    else onScroll();
  });
  links.forEach(function(a){
    a.addEventListener('click', function(){
      menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); onScroll();
    });
  });
})();