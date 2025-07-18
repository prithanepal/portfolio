document.addEventListener("DOMContentLoaded", function () {
  // Only create toggle button if we're on mobile
  if (window.innerWidth <= 768) {
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-contacts";
    toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    document.body.appendChild(toggleBtn);

    // Toggle contact info visibility
    toggleBtn.addEventListener("click", function () {
      const contactInfo = document.querySelector(".contact-info");
      if (contactInfo.style.display === "block") {
        contactInfo.style.display = "none";
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
      } else {
        contactInfo.style.display = "block";
        toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
      }
    });
  }
  window.addEventListener("resize", function () {
    const toggleBtn = document.querySelector(".toggle-contacts");
    const contactInfo = document.querySelector(".contact-info");

    if (window.innerWidth > 768) {
      // On larger screens
      if (toggleBtn) {
        toggleBtn.remove();
      }
      contactInfo.style.display = "block";
    } else {
      // On smaller screens
      if (!toggleBtn) {
        const newToggleBtn = document.createElement("button");
        newToggleBtn.className = "toggle-contacts";
        newToggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        document.querySelector(".profile").appendChild(newToggleBtn);

        newToggleBtn.addEventListener("click", function () {
          if (contactInfo.style.display === "block") {
            contactInfo.style.display = "none";
            newToggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
          } else {
            contactInfo.style.display = "block";
            newToggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
          }
        });
      }
    }
  });
});
