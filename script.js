function loadContent(file) {
  fetch(`content/${file}`)
    .then((response) => {
      if (!response.ok) throw new Error("Content load failed.");
      return response.text();
    })
    .then((html) => {
      document.getElementById("main-content").innerHTML = html;

      const links = document.querySelectorAll(".nav-link");
      links.forEach((link) => {
        const page = link.getAttribute("data-page");
        if (page === file) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Form validation
      if (
        file === "contact.html" &&
        typeof setupContactFormValidation === "function"
      ) {
        setupContactFormValidation();
      }
    })
    .catch((error) => {
      document.getElementById(
        "main-content"
      ).innerHTML = `<h2>Error loading content.</h2>`;
      console.error(error);
    });
}

// Load default content on first load
window.onload = () => loadContent("about.html");

function setupContactFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset errors
    [nameError, emailError, subjectError, messageError].forEach((el) => {
      el.style.display = "none";
    });
    formSuccess.style.display = "none";
    formSuccess.style.color = "green";

    let valid = true;

    if (!name.value.trim()) {
      nameError.style.display = "block";
      valid = false;
    }

    if (
      !email.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      emailError.style.display = "block";
      valid = false;
    }

    if (!subject.value.trim()) {
      subjectError.style.display = "block";
      valid = false;
    }

    if (!message.value.trim()) {
      messageError.style.display = "block";
      valid = false;
    }

    if (valid) {
      // EmailJS send
      const serviceID = "service_psxg1oo";
      const templateID = "template_ak9487k";

      const formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      };

      emailjs
        .send(serviceID, templateID, formData)
        .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);
          formSuccess.textContent = "Your message has been sent!";
          formSuccess.style.color = "green";
          formSuccess.style.display = "block";
          form.reset();
        })
        .catch(function (error) {
          console.error("FAILED...", error);
          formSuccess.textContent = "Something went wrong. Please try again.";
          formSuccess.style.color = "red";
          formSuccess.style.display = "block";
        });
    }
  });
}
