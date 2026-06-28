const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

gsap.to('.progress-bar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

if (window.innerWidth > 768) {
    gsap.to('[data-speed]', {
        y: (i, el) => (1 - parseFloat(el.dataset.speed)) * ScrollTrigger.maxScroll(window),
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

gsap.utils.toArray('.img-wrapper').forEach((wrapper) => {
    const img = wrapper.querySelector('img');
    const isMobile = window.innerWidth <= 768;

    gsap.to(img, {
        y: isMobile ? '12%' : '30%',
        ease: 'none',
        scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

gsap.utils.toArray('.text-reveal').forEach((text) => {
    gsap.from(text, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

function toggleMusic() {
    const audio = document.getElementById('myAudio');
    const icon = document.getElementById('musicIcon');

    if (audio.paused) {
        audio.play();
        icon.innerHTML = '⏸️';
    } else {
        audio.pause();
        icon.innerHTML = '🎶';
    }
}
