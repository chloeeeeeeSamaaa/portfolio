const text = document.getElementById('animated-text');

function gradientWave() {
  if (!text) return;

  const time = Date.now() * 0.001;
  const pos = (Math.sin(time) + 1) * 50;

  text.style.background = `
    linear-gradient(
      270deg,
      #ffffff ${pos - 30}%,
      #c4b5fd ${pos}%,
      #8b5cf6 ${pos + 30}%
    )
  `;
  text.style.backgroundSize = "400% 400%";
  text.style.webkitBackgroundClip = "text";
  text.style.webkitTextFillColor = "transparent";

  requestAnimationFrame(gradientWave);
}

gradientWave();


/* =========================================
   2. READ MORE / READ LESS LOGIC
   ========================================= */
const readMoreBtn = document.querySelector('.about-content .btn');
const animatedText = document.getElementById('animated-text');

if (readMoreBtn && animatedText) {
    const fullText = animatedText.textContent.trim();
    const shortText = fullText.slice(0, 280) + '...';
    let expanded = false;

    // init
    animatedText.textContent = shortText;

    readMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      animatedText.classList.add('text-animate');

      setTimeout(() => {
        if (!expanded) {
          animatedText.textContent = fullText;
          readMoreBtn.textContent = 'Read Less';
        } else {
          animatedText.textContent = shortText;
          readMoreBtn.textContent = 'Read More';
        }
        expanded = !expanded;
        animatedText.classList.remove('text-animate');
      }, 250);
    });
}

/* =========================================
   3. PROJECT MODAL LOGIC
   ========================================= */
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');
const projectCards = document.querySelectorAll('.project-card');

if (modal) {
    projectCards.forEach(card => {
      const img = card.querySelector('img');
      const btn = card.querySelector('.btn');

      const openModal = () => {
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;

        modalImage.src = imgSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = desc;
        modal.style.display = 'flex';
      };

      if(img) img.addEventListener('click', openModal);
      if(btn) btn.addEventListener('click', openModal);
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
}

/* =========================================
   4. MOBILE MENU TOGGLE
   ========================================= */
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
}

/* =========================================
   5. FADE IN ON SCROLL (ANIMATIONS)
   ========================================= */
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

/* =========================================
   ACTIVE NAV LINK HIGHLIGHTER (FINAL)
   ========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  let headerHeight = header.offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 50;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollY >= sectionTop &&
      scrollY < sectionTop + sectionHeight
    ) {
      navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

var typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'UI/UX Designer', 'Backend Coder'],
    typeSpeed: 110,
    backSpeed: 70,
    startDelay: 500,
    backDelay: 2000,
    smartBackspace: true,
    loop: true
});

/* =========================================
   CONTACT FORM VALIDATION
   ========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Name validation
    if (name.length < 3) {
      alert("Please enter your full name (at least 3 characters).");
      return;
    }

    // Email validation (regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Message validation
    if (message.length < 10) {
      alert("Your message must be at least 10 characters long.");
      return;
    }

    // Success (placeholder)
    alert("Message sent successfully! 🚀");

    // Reset form
    contactForm.reset();
  });
}
