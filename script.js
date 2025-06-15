let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// إغلاق القائمة عند النقر على رابط
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

/// كود التمرير المعدل
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90, // تعديل دقيق للمسافة
                behavior: 'smooth'
            });
            
            // تحديث حالة الرابط النشط
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // إعادة تعيين رسائل الخطأ
  document.getElementById('formErrors').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'none';
  
  // التحقق من الصحة
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  let errors = [];
  
  if (!fullName) errors.push('Full name is required');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!phone || !/^[0-9]{10,15}$/.test(phone)) errors.push('Valid phone number (10-15 digits) is required');
  if (!subject) errors.push('Subject is required');
  if (!message) errors.push('Message is required');
  
  if (errors.length > 0) {
    const errorElement = document.getElementById('formErrors');
    errorElement.innerHTML = errors.join('<br>');
    errorElement.style.display = 'block';
    return;
  }
  
  // إرسال النموذج باستخدام Formspree
  const form = e.target;
  const formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('formSuccess').textContent = 'Message sent successfully!';
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    document.getElementById('formErrors').textContent = 'There was a problem sending your message. Please try again later.';
    document.getElementById('formErrors').style.display = 'block';
  });
});
// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-icon');
const body = document.body;

// التحقق من تفضيلات المستخدم للنظام
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
  body.setAttribute('data-theme', 'light');
  themeToggle.classList.replace('bx-moon', 'bx-sun');
}

// تبديل الثيم عند النقر
themeToggle.addEventListener('click', () => {
  if (body.getAttribute('data-theme') === 'light') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.classList.replace('bx-sun', 'bx-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
    themeToggle.classList.replace('bx-moon', 'bx-sun');
    localStorage.setItem('theme', 'light');
  }
});

// بقية الـ JavaScript كما هي