// Animations JavaScript file for Lens & Light Photography Website

document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements when they come into view
  initScrollAnimations()

  // Initialize staggered animations
  initStaggeredAnimations()

  // Initialize text reveal animations
  initTextReveal()
})

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

// Staggered Animations
function initStaggeredAnimations() {
  const staggerContainers = document.querySelectorAll(".stagger-container")

  if (staggerContainers.length === 0) return

  staggerContainers.forEach((container) => {
    const staggerItems = container.querySelectorAll(".stagger-item")

    if (staggerItems.length === 0) return

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          staggerItems.forEach((item) => {
            item.classList.add("animate")
          })
        }
      },
      {
        threshold: 0.1,
      },
    )

    staggerObserver.observe(container)
  })
}

// Text Reveal Animations
function initTextReveal() {
  const textRevealElements = document.querySelectorAll(".text-reveal")

  if (textRevealElements.length === 0) return

  textRevealElements.forEach((element) => {
    // Split text into spans
    const text = element.textContent
    element.textContent = ""

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span")
      span.textContent = text[i]
      span.style.transitionDelay = `${i * 0.05}s`
      element.appendChild(span)
    }

    // Observe element
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          element.classList.add("animate")
        }
      },
      {
        threshold: 0.5,
      },
    )

    observer.observe(element)
  })
}

// Add parallax effect to elements
function parallaxEffect() {
  const parallaxElements = document.querySelectorAll(".parallax")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5
      element.style.transform = `translateY(${scrollTop * speed}px)`
    })
  })
}

// Add smooth scrolling to anchor links
function smoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })
}

// Add counter animation to numbers
function counterAnimation() {
  const counters = document.querySelectorAll(".counter")

  if (counters.length === 0) return

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-target"))
          const duration = Number.parseInt(counter.getAttribute("data-duration")) || 2000
          let start = 0
          const increment = target / (duration / 16)

          const updateCounter = () => {
            start += increment
            counter.textContent = Math.floor(start)

            if (start < target) {
              requestAnimationFrame(updateCounter)
            } else {
              counter.textContent = target
            }
          }

          updateCounter()
          counterObserver.unobserve(counter)
        }
      })
    },
    {
      threshold: 0.5,
    },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Initialize animations on page load
window.addEventListener("load", () => {
  // Add any additional animations that should run on page load
  parallaxEffect()
  smoothScroll()
  counterAnimation()
})
