document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Background Image Rotator
    const heroBg = document.getElementById('heroBg');
    const heroImages = [
        'radial-gradient(circle at 70% 30%, #1a1a1a 0%, #050505 100%)',
        'radial-gradient(circle at 30% 70%, #1a1a1a 0%, #050505 100%)',
        'radial-gradient(circle at 80% 50%, #1a1a1a 0%, #050505 100%)'
    ];
    let bgIndex = 0;
    
    setInterval(() => {
        bgIndex = (bgIndex + 1) % heroImages.length;
        if (heroBg) {
            heroBg.style.background = heroImages[bgIndex];
        }
    }, 5000);
    
    // Smooth Scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========== ACTIVE NAVIGATION LINK INDICATOR ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    
    // ========== NAVIGATION BACKGROUND CHANGE ON SCROLL ==========
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });
    
    updateActiveNavLink();
    
    // Typed Text Animation
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const originalText = typedTextElement.textContent;
        typedTextElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                typedTextElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        typeWriter();
    }
    
    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkills() {
        if (skillsAnimated) return;
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-skill');
            bar.style.width = percentage + '%';
        });
        skillsAnimated = true;
    }
    
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        skillsObserver.observe(skillsSection);
    }
    
    // Slideshow Functionality
    function initSlideshows() {
        const slideshows = document.querySelectorAll('.slideshow-container');
        
        slideshows.forEach(container => {
            const slides = container.querySelectorAll('.slide');
            const prevBtn = container.querySelector('.slideshow-prev');
            const nextBtn = container.querySelector('.slideshow-next');
            const dotsContainer = container.querySelector('.slideshow-dots');
            let currentIndex = 0;
            
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                
                slides.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => showSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }
            
            function showSlide(index) {
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;
                
                slides.forEach(slide => slide.classList.remove('active'));
                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.dot');
                    dots.forEach(dot => dot.classList.remove('active'));
                    if (dots[index]) dots[index].classList.add('active');
                }
                
                slides[index].classList.add('active');
                currentIndex = index;
            }
            
            function nextSlide() {
                showSlide(currentIndex + 1);
            }
            
            function prevSlide() {
                showSlide(currentIndex - 1);
            }
            
            if (prevBtn) {
                prevBtn.removeEventListener('click', prevSlide);
                prevBtn.addEventListener('click', prevSlide);
            }
            if (nextBtn) {
                nextBtn.removeEventListener('click', nextSlide);
                nextBtn.addEventListener('click', nextSlide);
            }
            
            if (container.slideInterval) {
                clearInterval(container.slideInterval);
            }
            
            container.slideInterval = setInterval(nextSlide, 4000);
            
            container.addEventListener('mouseenter', () => clearInterval(container.slideInterval));
            container.addEventListener('mouseleave', () => {
                container.slideInterval = setInterval(nextSlide, 4000);
            });
            
            if (slides.length > 0) showSlide(0);
        });
    }
    
    initSlideshows();
    
    // Project Details Data
    const projectData = {
        ecommerce: {
            title: 'Enterprise Java Application',
            image: 'https://via.placeholder.com/800x500/2a2a2a/666666?text=Java+Enterprise+App',
            description: 'A comprehensive enterprise-level Java application built with Spring Boot, featuring RESTful APIs, microservices architecture, and integration with modern frontend frameworks.',
            tools: ['Java 17', 'Spring Boot', 'Spring Security', 'Hibernate', 'JWT', 'Maven'],
            github: 'https://github.com/alexander-perez/java-enterprise-app',
            demo: 'https://youtu.be/demo1',
            liveSite: 'https://java-enterprise-demo.com'
        },
        banking: {
            title: 'Python Data Analytics Platform',
            image: 'https://via.placeholder.com/800x500/2a2a2a/666666?text=Python+Analytics',
            description: 'Powerful data processing and visualization platform using Python, Pandas, and NumPy. Provides real-time data analysis, automated reporting, and interactive dashboards.',
            tools: ['Python 3.11', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
            github: 'https://github.com/alexander-perez/python-analytics',
            demo: 'https://youtu.be/demo2',
            liveSite: 'https://python-analytics-demo.com'
        },
        dataanalysis: {
            title: 'Full Stack Web Application',
            image: 'https://via.placeholder.com/800x500/2a2a2a/666666?text=Full+Stack+App',
            description: 'Modern full-stack web application with React frontend, Node.js backend, and PostgreSQL database. Features user authentication, real-time updates, and responsive design.',
            tools: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'JWT'],
            github: 'https://github.com/alexander-perez/fullstack-app',
            demo: 'https://youtu.be/demo3',
            liveSite: 'https://fullstack-demo.com'
        }
    };
    
    // Project Details Modal
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectDetailsContent');
    const closeModal = document.querySelector('.close-modal');
    
    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                modalContent.innerHTML = `
                    <div class="project-detail">
                        <img src="${project.image}" alt="${project.title}" class="project-detail-image">
                        <h2 class="project-detail-title">${project.title}</h2>
                        <div class="project-detail-description">
                            <p>${project.description}</p>
                        </div>
                        <div class="project-detail-tools">
                            <h3><i class="bi bi-tools"></i> Technologies Used</h3>
                            <div class="tools-list">
                                ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                            </div>
                        </div>
                        <div class="project-detail-links">
                            <h3><i class="bi bi-link-45deg"></i> Resources</h3>
                            <div class="link-buttons">
                                <a href="${project.github}" target="_blank" class="detail-link github-link">
                                    <i class="bi bi-github"></i>
                                    GitHub Repository
                                    <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                                <a href="${project.demo}" target="_blank" class="detail-link demo-link">
                                    <i class="bi bi-play-circle-fill"></i>
                                    Watch Demo Video
                                    <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                                <a href="${project.liveSite}" target="_blank" class="detail-link live-link">
                                    <i class="bi bi-globe2"></i>
                                    Live Demo
                                    <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function closeModalFunc() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    if (closeModal) closeModal.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModalFunc();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Explore Button (My Work)
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const projectsSection = document.getElementById('projects');
            projectsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Scroll Reveal
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .cert-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
});