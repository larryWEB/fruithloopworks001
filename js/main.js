// Main JavaScript file for Lens & Light Photography Website

document.addEventListener("DOMContentLoaded", () => {
  // Initialize page loader
  initLoader()

  // Initialize custom cursor
  initCustomCursor()

  // Initialize header scroll effect
  initHeaderScroll()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize hero slider
  initHeroSlider()

  // Initialize testimonial slider
  initTestimonialSlider()

  // Initialize gallery filters
  initGalleryFilters()

  // Initialize lightbox
  initLightbox()

  // Initialize lazy loading
  initLazyLoading()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize parallax effect
  initParallax()

  // Initialize FAQ accordions
  initFaqAccordions()

  // Initialize contact form
  initContactForm()
})

// Page Loader
function initLoader() {
  const loader = document.querySelector(".loader")
  const loaderBar = document.querySelector(".loader-progress-bar")

  if (!loader || !loaderBar) return

  let width = 0
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        loader.style.opacity = "0"
        setTimeout(() => {
          loader.style.display = "none"
        }, 500)
      }, 500)
    } else {
      width++
      loaderBar.style.width = width + "%"
    }
  }, 20)
}

// Custom Cursor
function initCustomCursor() {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  if (!cursor || !cursorFollower) return

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1"
    cursorFollower.style.opacity = "1"
  })

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
    cursorFollower.style.opacity = "0"
  })

  // Change cursor style on links and buttons
  const links = document.querySelectorAll("a, button, .gallery-item, .instagram-item")
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "0"
      cursor.style.height = "0"
      cursorFollower.style.width = "60px"
      cursorFollower.style.height = "60px"
      cursorFollower.style.borderWidth = "2px"
      cursorFollower.style.backgroundColor = "rgba(230, 126, 34, 0.1)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
      cursorFollower.style.borderWidth = "1px"
      cursorFollower.style.backgroundColor = "transparent"
    })
  })
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector(".header")

  if (!header) return

  // Add transparent class if on homepage and at top
  if (window.location.pathname === "/" || window.location.pathname.includes("index")) {
    header.classList.add("transparent")
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
      header.classList.remove("transparent")
    } else {
      header.classList.remove("scrolled")
      if (window.location.pathname === "/" || window.location.pathname.includes("index")) {
        header.classList.add("transparent")
      }
    }
  })
}

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle")
  const header = document.querySelector(".header")
  const nav = document.querySelector(".nav")

  if (!menuToggle || !header || !nav) return

  menuToggle.addEventListener("click", () => {
    header.classList.toggle("menu-open")

    if (header.classList.contains("menu-open")) {
      nav.style.display = "block"
      setTimeout(() => {
        nav.style.opacity = "1"
        nav.style.transform = "translateY(0)"
      }, 10)
    } else {
      nav.style.opacity = "0"
      nav.style.transform = "translateY(-20px)"
      setTimeout(() => {
        nav.style.display = "none"
      }, 300)
    }
  })

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        header.classList.remove("menu-open")
        nav.style.opacity = "0"
        nav.style.transform = "translateY(-20px)"
        setTimeout(() => {
          nav.style.display = "none"
        }, 300)
      }
    })
  })

  // Adjust nav display on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      nav.style.display = "block"
      nav.style.opacity = "1"
      nav.style.transform = "translateY(0)"
    } else if (!header.classList.contains("menu-open")) {
      nav.style.display = "none"
    }
  })
}

// Hero Slider
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide")
  const dots = document.querySelectorAll(".hero-dot")
  const prevBtn = document.querySelector(".hero-prev")
  const nextBtn = document.querySelector(".hero-next")

  if (slides.length === 0) return

  let currentSlide = 0
  let slideInterval

  // Start automatic slideshow
  startSlideshow()

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(slideInterval)
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      updateSlider()
      startSlideshow()
    })
  }

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(slideInterval)
      currentSlide = (currentSlide + 1) % slides.length
      updateSlider()
      startSlideshow()
    })
  }

  // Dot navigation
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval)
        currentSlide = index
        updateSlider()
        startSlideshow()
      })
    })
  }

  function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
      slide.classList.remove("active")
      if (index === currentSlide) {
        slide.classList.add("active")
      }
    })

    // Update dots
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.classList.remove("active")
        if (index === currentSlide) {
          dot.classList.add("active")
        }
      })
    }
  }

  function startSlideshow() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length
      updateSlider()
    }, 5000)
  }
}

// Testimonial Slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".testimonial-dot")

  if (slides.length === 0) return

  let currentSlide = 0
  let slideInterval

  // Start automatic slideshow
  startSlideshow()

  // Dot navigation
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval)
        currentSlide = index
        updateSlider()
        startSlideshow()
      })
    })
  }

  function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
      slide.classList.remove("active")
      if (index === currentSlide) {
        slide.classList.add("active")
      }
    })

    // Update dots
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.classList.remove("active")
        if (index === currentSlide) {
          dot.classList.add("active")
        }
      })
    }
  }

  function startSlideshow() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length
      updateSlider()
    }, 5000)
  }
}

// Gallery Filters
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-button")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterButtons.length === 0 || galleryItems.length === 0) return

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 50)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Lightbox
function initLightbox() {
  const lightbox = document.getElementById("lightbox")
  const lightboxImage = document.getElementById("lightbox-image")
  const lightboxTitle = document.getElementById("lightbox-title")
  const lightboxCategory = document.getElementById("lightbox-category")
  const lightboxClose = document.getElementById("lightbox-close")
  const lightboxPrev = document.getElementById("lightbox-prev")
  const lightboxNext = document.getElementById("lightbox-next")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (!lightbox || galleryItems.length === 0) return

  let currentIndex = 0

  // Open lightbox when clicking on gallery item
  galleryItems.forEach((item, index) => {
    const zoomButton = item.querySelector(".gallery-zoom")
    if (zoomButton) {
      zoomButton.addEventListener("click", (e) => {
        e.preventDefault()
        currentIndex = index
        openLightbox()
      })
    }
  })

  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox)
  }

  // Close lightbox with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox()
    }
  })

  // Previous image
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
      updateLightboxImage()
    })
  }

  // Next image
  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % galleryItems.length
      updateLightboxImage()
    })
  }

  // Navigate with arrow keys
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return

    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
      updateLightboxImage()
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryItems.length
      updateLightboxImage()
    }
  })

  function openLightbox() {
    updateLightboxImage()
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
  }

  function updateLightboxImage() {
    const item = galleryItems[currentIndex]
    const img = item.querySelector("img")
    const title = item.querySelector(".gallery-title")
    const category = item.querySelector(".gallery-category")

    lightboxImage.src = img.src
    lightboxImage.alt = img.alt

    if (title && lightboxTitle) {
      lightboxTitle.textContent = title.textContent
    }

    if (category && lightboxCategory) {
      lightboxCategory.textContent = category.textContent
    }
  }
}

// Lazy Loading
function initLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-image")

  if (lazyImages.length === 0) return

  const lazyLoadObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.classList.add("loaded")
          observer.unobserve(img)
        }
      })
    },
    {
      rootMargin: "100px 0px",
    },
  )

  lazyImages.forEach((image) => {
    lazyLoadObserver.observe(image)
  })
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  if (animatedElements.length === 0) return

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((element) => {
    scrollObserver.observe(element)
  })
}

// Parallax Effect
function initParallax() {
  const parallaxSections = document.querySelectorAll(".parallax-section")

  if (parallaxSections.length === 0) return

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset

    parallaxSections.forEach((section) => {
      const parallaxBg = section.querySelector(".parallax-bg")
      if (!parallaxBg) return

      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      // Check if section is in viewport
      if (scrollTop + window.innerHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
        const yPos = (scrollTop - sectionTop) * 0.5
        parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`
      }
    })
  })
}

// FAQ Accordions
function initFaqAccordions() {
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length === 0) return

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    if (!question) return

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active", !isActive)
    })
  })
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  const formSuccess = document.getElementById("form-success")
  const sendAnother = document.getElementById("send-another")

  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    setTimeout(() => {
      contactForm.style.display = "none"
      if (formSuccess) {
        formSuccess.classList.add("active")
      }
    }, 1000)
  })

  if (sendAnother) {
    sendAnother.addEventListener("click", () => {
      if (formSuccess) {
        formSuccess.classList.remove("active")
      }
      contactForm.style.display = "block"
      contactForm.reset()
    })
  }
}
