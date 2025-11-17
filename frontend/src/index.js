document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const dropdownMenu = toggle.nextElementSibling
      if (dropdownMenu.classList.contains("hidden")) {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.classList.add("hidden")
        })

        dropdownMenu.classList.remove("hidden")
      } else {
        dropdownMenu.classList.add("hidden")
      }
    })
  })
  window.addEventListener("click", function (e) {
    if (!e.target.matches(".dropdown-toggle")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (!menu.contains(e.target)) {
          menu.classList.add("hidden")
        }
      })
    }
  })
  const mobileMenuButton = document.querySelector('.mobile-menu-button')
  const mobileMenu = document.querySelector('.navigation-menu')
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })
  
  
})
