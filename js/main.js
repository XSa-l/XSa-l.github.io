// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果和活动链接高亮
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');

function updateNavigation() {
    const scrollY = window.pageYOffset;
    
    // 导航栏滚动效果
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 活动导航链接高亮
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件处理
const optimizedScrollHandler = debounce(updateNavigation, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// 滚动动画 - 使用Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // 观察一次后不再观察，减少性能消耗
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.fade-in, .zoom-in, .slide-in-left, .slide-in-right, .project-card, .skill-item, .about-content, .footer-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// 项目详情模态框功能
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const projectLinks = document.querySelectorAll('.project-link');

if (modalOverlay && modalClose && projectLinks.length > 0) {
    // 打开模态框
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // 关闭模态框
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(projectId) {
    const allProjects = document.querySelectorAll('.modal-project');
    allProjects.forEach(project => {
        project.classList.remove('active');
    });

    const targetProject = document.getElementById(`${projectId}-modal`);
    if (targetProject) {
        targetProject.classList.add('active');
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}