// Interactivity: fixed nav color on scroll, hover effects, mobile menu, active link highlighting
(function(){
  const navbar = document.querySelector('.navbar');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const mobileLinks = Array.from(document.querySelectorAll('.mobile-overlay a'));
  const sections = Array.from(document.querySelectorAll('main section'));
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const SCROLL_THRESHOLD = 40;

  // Toggle scrolled class
  function onScroll(){
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    navbar.classList.toggle('scrolled', scrolled);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Smooth scroll with offset
  function offsetScrollTo(target){
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - navHeight - 12;
    window.scrollTo({top, behavior:'smooth'});
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href === '#' || href === '') return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if(el){ e.preventDefault(); offsetScrollTo(el); }
      // close mobile
      if(mobileOverlay.classList.contains('open')) toggleMobile(false);
    });
  });

  // Hamburger toggle
  function toggleMobile(force){
    const isOpen = typeof force === 'boolean' ? force : !mobileOverlay.classList.contains('open');
    mobileOverlay.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileOverlay.setAttribute('aria-hidden', String(!isOpen));
  }
  hamburger.addEventListener('click', ()=> toggleMobile());

  // Close mobile on link
  mobileLinks.forEach(a=> a.addEventListener('click', ()=> toggleMobile(false)));

  // Active link highlighting via IntersectionObserver
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const id = entry.target.id;
      const link = document.querySelector('.nav-links a[href="#'+id+'"]');
      if(entry.isIntersecting){
        document.querySelectorAll('.nav-links a').forEach(l=>l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  },{root:null,rootMargin:'-40% 0px -40% 0px',threshold:0});
  sections.forEach(s=> io.observe(s));

  // Hover/focus enhancement: add class for stronger style
  const allLinks = [...navLinks, ...mobileLinks];
  allLinks.forEach(link=>{
    link.addEventListener('mouseenter', ()=> link.classList.add('hover'));
    link.addEventListener('mouseleave', ()=> link.classList.remove('hover'));
    link.addEventListener('focus', ()=> link.classList.add('hover'));
    link.addEventListener('blur', ()=> link.classList.remove('hover'));
  });

  // Contact form demo handler (no real backend)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.disabled = true; btn.textContent = 'Sending...';
      setTimeout(()=>{ btn.disabled = false; btn.textContent = 'Send Message'; alert('Thanks! Message simulated (no backend).'); form.reset(); }, 900);
    });
  }

  // Accessibility: close mobile with Escape
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape') toggleMobile(false); });
})();
