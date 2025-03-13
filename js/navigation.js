document.addEventListener("DOMContentLoaded", () => {
  // Check authentication status
  const token = localStorage.getItem("token")
  const isLoggedIn = !!token

  // Update navigation based on auth status
  const userOnlyElements = document.querySelectorAll(".user-only")
  const guestOnlyElements = document.querySelectorAll(".guest-only")

  userOnlyElements.forEach((el) => {
    el.style.display = isLoggedIn ? "block" : "none"
  })

  guestOnlyElements.forEach((el) => {
    el.style.display = isLoggedIn ? "none" : "block"
  })

  // Handle logout
  const logoutLinks = document.querySelectorAll("#logout-link, #mobile-logout-link")

  logoutLinks.forEach((link) => {
    if (link) {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "index.html"
      })
    }
  })

  // Handle search from hero section
  const heroSearchBtn = document.getElementById("hero-search-btn")
  const heroSearchInput = document.getElementById("hero-search")

  if (heroSearchBtn && heroSearchInput) {
    heroSearchBtn.addEventListener("click", () => {
      const query = heroSearchInput.value.trim()
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`
      }
    })

    heroSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = heroSearchInput.value.trim()
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`
        }
      }
    })
  }
})

