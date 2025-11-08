document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const numImages = 25; // At least 20+ images as requested

    // Create placeholder images with Pakistan-themed colors
    const imageThemes = [
        'Pakistan+Flag', 'Independence+Day', 'Green+White', 'School+Event',
        'Celebration', 'Students', 'Assembly', 'Flag+Hoisting',
        'Cultural+Show', 'Patriotic+Song', 'National+Dress', 'Unity',
        'Freedom', 'August+14', 'Pakistan+Zindabad', 'School+Pride',
        'Graduation', 'Memories', 'Friends', 'Teachers', 'Achievement',
        'Success', 'Future', 'Dreams', 'Hope'
    ];

    for (let i = 1; i <= numImages; i++) {
        const img = document.createElement('img');
        const theme = imageThemes[i - 1] || `Event+${i}`;
        // Using placeholder service with Pakistan flag colors
        img.src = `https://via.placeholder.com/300x200/006400/FFFFFF?text=${theme}`;
        img.alt = `Celebration Image ${i}`;
        img.loading = 'lazy'; // Lazy loading for better performance
        
        // Add staggered animation delay
        img.style.animationDelay = `${i * 0.1}s`;
        
        galleryGrid.appendChild(img);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced scroll animation with intersection observer
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Audio controls enhancement
    const audio = document.getElementById('national-anthem');
    if (audio) {
        // Add custom play/pause functionality
        audio.addEventListener('loadstart', () => {
            console.log('National anthem loading...');
        });
        
        audio.addEventListener('canplay', () => {
            console.log('National anthem ready to play');
        });
        
        // Optional: Auto-play after user interaction (respecting browser policies)
        document.addEventListener('click', () => {
            if (audio.paused) {
                // Only auto-play once and with user consent
                const shouldAutoPlay = confirm('Would you like to play the National Anthem?');
                if (shouldAutoPlay) {
                    audio.play().catch(e => console.log('Auto-play prevented by browser'));
                }
            }
        }, { once: true });
    }

    // Add floating animation to gallery images
    const images = document.querySelectorAll('#gallery img');
    images.forEach((img, index) => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.08) rotate(2deg) translateY(-5px)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) rotate(0deg) translateY(0px)';
        });
    });

    // Add typing effect to memory message
    const memoryText = document.querySelector('#memory-message p');
    if (memoryText) {
        const originalText = memoryText.textContent;
        memoryText.textContent = '';
        
        const typeWriter = (text, element, speed = 50) => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        };

        // Start typing effect when section becomes visible
        const memorySection = document.getElementById('memory-message');
        const memoryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typeWriter(originalText, memoryText, 30);
                    }, 500);
                    memoryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        memoryObserver.observe(memorySection);
    }
});

