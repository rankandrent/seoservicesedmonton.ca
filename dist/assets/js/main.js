(function(){
  var header=document.querySelector('.site-header');
  var onScroll=function(){if(header){header.classList.toggle('scrolled',window.scrollY>8)}};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var burger=document.querySelector('.burger');
  if(burger){burger.addEventListener('click',function(){
    var open=document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded',open?'true':'false');
  })}

  document.querySelectorAll('.has-drop>button').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.preventDefault();
      var li=btn.parentElement;var open=li.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      document.querySelectorAll('.has-drop').forEach(function(o){if(o!==li){o.classList.remove('open');o.querySelector('button').setAttribute('aria-expanded','false')}});
    });
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.has-drop')){document.querySelectorAll('.has-drop.open').forEach(function(o){o.classList.remove('open')})}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.has-drop.open').forEach(function(o){o.classList.remove('open')});document.body.classList.remove('nav-open')}});

  document.querySelectorAll('.card.linked').forEach(function(card){
    var a=card.querySelector('a');if(!a)return;
    card.addEventListener('click',function(e){if(e.target.closest('a'))return;a.click()});
  });

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}

  // Hero video: only shown if assets/video/hero.mp4 exists; otherwise the hero photo stays.
  var v=document.querySelector('.media-frame video[data-src]');
  if(v&&window.fetch){fetch(v.getAttribute('data-src'),{method:'HEAD'}).then(function(r){
    if(r.ok){v.src=v.getAttribute('data-src');v.style.display='block';v.style.position='absolute';v.style.inset='0';v.style.width='100%';v.style.height='100%';v.style.objectFit='cover';v.play&&v.play().catch(function(){})}
  }).catch(function(){})}

  // Contact form errors come back from /api/contact as ?error=invalid|send
  var fe=document.querySelector('.form-error');var err=(location.search.match(/[?&]error=(\w+)/)||[])[1];
  if(fe&&err){fe.textContent=err==='invalid'?'Please enter your name and a valid email address.':'Sorry, your message could not be sent. Please try again or contact us by phone or email.';fe.hidden=false}

  var y=document.getElementById('year');if(y){y.textContent=new Date().getFullYear()}
})();
