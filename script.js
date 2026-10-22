```javascript
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Footer year
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Profile picture error handling
  const profileImage = document.getElementById("profileImage");

  if (profileImage) {
    profileImage.addEventListener("error", () => {
      console.error(
        "Profile picture could not be loaded. Check public/Sanjana.jpg."
      );
      profileImage.alt = "Sanjana's profile picture is unavailable";
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      const formData = {
        name: contactForm.elements.name.value.trim(),
        email: contactForm.elements.email.value.trim(),
        message: contactForm.elements.message.value.trim()
      };

      if (!formData.name || !formData.email || !formData.message) {
        formStatus.textContent = "Please fill in all fields.";
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      formStatus.textContent = "";

      try {
        const response = await fetch("/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.message || "Unable to send your message.");
        }

        formStatus.textContent =
          result.message || "Your message was submitted successfully.";
        contactForm.reset();
      } catch (error) {
        console.error("Contact form error:", error);
        formStatus.textContent =
          "The message could not be submitted. Please try again later.";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send message ↗";
      }
    });
  }
});
```