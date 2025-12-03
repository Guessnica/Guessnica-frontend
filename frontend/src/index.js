// document.addEventListener("DOMContentLoaded", () => {
//   const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
//   dropdownToggles.forEach((toggle) => {
//     toggle.addEventListener("click", () => {
//       const dropdownMenu = toggle.nextElementSibling
//       if (dropdownMenu.classList.contains("hidden")) {
//         document.querySelectorAll(".dropdown-menu").forEach((menu) => {
//           menu.classList.add("hidden")
//         })

//         dropdownMenu.classList.remove("hidden")
//       } else {
//         dropdownMenu.classList.add("hidden")
//       }
//     })
//   })
//   window.addEventListener("click", function (e) {
//     if (!e.target.matches(".dropdown-toggle")) {document.addEventListener("DOMContentLoaded", () => {
//   const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
//   dropdownToggles.forEach((toggle) => {
//     toggle.addEventListener("click", () => {
//       const dropdownMenu = toggle.nextElementSibling
//       if (dropdownMenu.classList.contains("hidden")) {
//         document.querySelectorAll(".dropdown-menu").forEach((menu) => {
//           menu.classList.add("hidden")
//         })

//         dropdownMenu.classList.remove("hidden")
//       } else {
//         dropdownMenu.classList.add("hidden")
//       }
//     })
//   })
//   window.addEventListener("click", function (e) {
//     if (!e.target.matches(".dropdown-toggle")) {
//       document.querySelectorAll(".dropdown-menu").forEach((menu) => {
//         if (!menu.contains(e.target)) {
//           menu.classList.add("hidden")
//         }
//       })
//     }
//   })

//   /*Menu */
//   const mobileMenuButton = document.querySelector('.mobile-menu-button')
//   const mobileMenu = document.querySelector('.navigation-menu')
//   mobileMenuButton.addEventListener('click', () => {
//     mobileMenu.classList.toggle('hidden')
//     // mobileMenuButton.classList.toggle("bg-sky-200")
//     mobileMenuButton.classList.toggle('is-open');
//   })
  
  
// })


//       document.querySelectorAll(".dropdown-menu").forEach((menu) => {
//         if (!menu.contains(e.target)) {
//           menu.classList.add("hidden")
//         }
//       })
//     }
//   })

//   /*Menu */
//   const mobileMenuButton = document.querySelector('.mobile-menu-button')
//   const mobileMenu = document.querySelector('.navigation-menu')
//   mobileMenuButton.addEventListener('click', () => {
//     mobileMenu.classList.toggle('hidden')
//     // mobileMenuButton.classList.toggle("bg-sky-200")
//     mobileMenuButton.classList.toggle('is-open');
//   })
  
  
// })

document.addEventListener("DOMContentLoaded", () => {
  /* Dropdown Logic (Original) */
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const dropdownMenu = toggle.nextElementSibling
      if (dropdownMenu.classList.contains("hidden")) {
        // Close all other dropdowns
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.classList.add("hidden")
        })

        // Open the clicked dropdown
        dropdownMenu.classList.remove("hidden")
      } else {
        // Close the clicked dropdown
        dropdownMenu.classList.add("hidden")
      }
    })
  })
  
  // Close dropdowns when clicking outside
  window.addEventListener("click", function (e) {
    if (!e.target.matches(".dropdown-toggle")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        // Only close if the click wasn't inside the menu itself
        if (!menu.contains(e.target)) {
          menu.classList.add("hidden")
        }
      })
    }
  })

  /* Mobile Menu Slide-Down Logic (Updated) */
  const mobileMenuButton = document.querySelector('.mobile-menu-button')
  const mobileMenu = document.querySelector('.navigation-menu')
  
  mobileMenuButton.addEventListener('click', () => {
    // 1. Toggle `max-h-0` to `max-h-screen` (or vice-versa) to trigger the slide animation.
    mobileMenu.classList.toggle('max-h-0');
    mobileMenu.classList.toggle('max-h-screen');
    
    // 2. Toggle the class on the button for visual state change
    mobileMenuButton.classList.toggle('is-open');
  })
  
  
})