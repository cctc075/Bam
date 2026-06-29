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

document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return; 

    const totalImages = 14;

    for (let i = 1; i <= totalImages; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'img-wrapper';
        wrapper.innerHTML = `<img src="images/${i}.jpg" loading="lazy" alt="Image ${i}">`;
        galleryGrid.appendChild(wrapper);
    }

    // ต้องใส่บรรทัดนี้หลังจาก loop สร้างรูปเสร็จ
    ScrollTrigger.refresh(); 
});

// เพิ่มตัวแปร global ไว้บนสุดของไฟล์ script.js
let currentPlayingBtn = null;

function playMusic(songName, btn) {
    const audio = document.getElementById('audio-player');
    
    // 1. ถ้ามีเพลงเล่นอยู่และกดปุ่มเดิม (เพลงเดิม) -> ให้หยุด
    if (!audio.paused && currentPlayingBtn === btn) {
        audio.pause();
        btn.innerText = '▶️ Play';
        currentPlayingBtn = null; // รีเซ็ตสถานะ
    } 
    // 2. ถ้ากดเพลงใหม่
    else {
        // หยุดเพลงเก่าก่อน (ถ้ามี)
        audio.pause();
        if (currentPlayingBtn) {
            currentPlayingBtn.innerText = '▶️ Play';
        }

        // เล่นเพลงใหม่
        audio.src = `song/${songName}`; 
        audio.play();
        
        // อัปเดตสถานะปุ่ม
        btn.innerText = '⏸️ Pause';
        currentPlayingBtn = btn;
    }
}

