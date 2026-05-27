(function () {
  'use strict';

  /* --------- Intro Loader --------- */
  const intro = document.getElementById('intro');
  function hideIntro() {
    if (!intro) return;
    intro.classList.add('hide');
    sessionStorage.setItem('aube_intro_seen', '1');
  }
  if (intro) {
    // skip on second nav within the same session
    if (sessionStorage.getItem('aube_intro_seen') === '1') {
      intro.style.transition = 'none';
      hideIntro();
    } else {
      const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 400 : 1200;
      setTimeout(hideIntro, delay);
      intro.addEventListener('click', hideIntro);
    }
  }

  /* --------- Hero rolling slideshow --------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    const dotsWrap = document.querySelector('.hero-dots');
    let dots = [];
    if (dotsWrap) {
      heroSlides.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('is-active');
        dotsWrap.appendChild(dot);
      });
      dots = dotsWrap.querySelectorAll('span');
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      let idx = 0;
      setInterval(() => {
        heroSlides[idx].classList.remove('is-active');
        if (dots[idx]) dots[idx].classList.remove('is-active');
        idx = (idx + 1) % heroSlides.length;
        heroSlides[idx].classList.add('is-active');
        if (dots[idx]) dots[idx].classList.add('is-active');
      }, 4000);
    }
  }

  /* --------- Nav (scroll state + mobile toggle) --------- */
  const nav = document.getElementById('nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* --------- Menu Tabs --------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach((card) => {
        if (card.dataset.cat === cat) card.classList.remove('hide');
        else card.classList.add('hide');
      });
    });
  });
  // initial filter — show only brunch
  cards.forEach((card) => {
    if (card.dataset.cat !== 'brunch') card.classList.add('hide');
  });

  /* --------- Reveal on scroll --------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* --------- Hero → Bottom CTA / Float buttons reveal --------- */
  const hero = document.querySelector('.hero');
  const banner = document.getElementById('bottomBanner');
  const float = document.querySelector('.float-cta');

  if (hero && 'IntersectionObserver' in window) {
    const heroIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const passed = !entry.isIntersecting;
          if (banner) banner.classList.toggle('show', passed);
          if (float) float.classList.toggle('show', passed);
          document.body.classList.toggle('bb-active', passed);
        });
      },
      { threshold: 0.1 }
    );
    heroIO.observe(hero);
  } else {
    banner && banner.classList.add('show');
    float && float.classList.add('show');
    document.body.classList.add('bb-active');
  }

  /* --------- Parallax for mood bg --------- */
  const moodImg = document.querySelector('.mood-bg img');
  if (moodImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const mood = document.querySelector('.mood');
    const onParallax = () => {
      const rect = mood.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = (rect.top - window.innerHeight) * 0.08;
      moodImg.style.transform = `translateY(${offset * -1}px)`;
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    onParallax();
  }

  /* --------- Footer year --------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* --------- Instagram feed (Behold.so) ---------
   * behold.so 에 가입하고 @aube_2024 계정을 연결한 뒤,
   * 발급받은 Feed ID 를 아래 BEHOLD_FEED_ID 에 입력하세요.
   * 비워두면 위의 자리표시자 이미지가 그대로 표시됩니다.
   */
  const BEHOLD_FEED_ID = ''; // 예: 'AbCdEf12345'
  const grid = document.getElementById('instaGrid');
  if (grid && BEHOLD_FEED_ID) {
    fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const posts = (data && data.posts ? data.posts : []).slice(0, 6);
        if (!posts.length) return;
        grid.innerHTML = posts
          .map((p, i) => {
            const src = p.sizes && p.sizes.medium ? p.sizes.medium.mediaUrl : p.mediaUrl;
            const url = p.permalink || 'https://instagram.com/aube_2024';
            const cap = (p.caption || `AUBE 인스타그램 피드 ${i + 1}`).slice(0, 80);
            return `<a href="${url}" target="_blank" rel="noopener" class="in"><img src="${src}" alt="${cap.replace(/"/g, '&quot;')}" loading="lazy" /></a>`;
          })
          .join('');
      })
      .catch(() => {
        /* keep placeholder grid on error */
      });
  }
})();
