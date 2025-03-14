document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form")
    const registerButton = document.getElementById("register-button")
    const buttonText = registerButton.querySelector(".button-text")
    const spinner = registerButton.querySelector(".spinner")
    const registerError = document.getElementById("register-error")
  
    const fullnameInput = document.getElementById("fullname")
    const emailInput = document.getElementById("register-email")
    const passwordInput = document.getElementById("register-password")
    const confirmPasswordInput = document.getElementById("confirm-password")
  
    const fullnameError = document.getElementById("fullname-error")
    const emailError = document.getElementById("register-email-error")
    const passwordError = document.getElementById("register-password-error")
    const confirmPasswordError = document.getElementById("confirm-password-error")
  
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault()
  
      // Reset errors
      registerError.classList.add("hidden")
      fullnameError.textContent = ""
      emailError.textContent = ""
      passwordError.textContent = ""
      confirmPasswordError.textContent = ""
  
      // Get form values
      const fullname = fullnameInput.value.trim()
      const email = emailInput.value.trim()
      const password = passwordInput.value
      const confirmPassword = confirmPasswordInput.value
  
      // Validate form
      let isValid = true
  
      if (!fullname) {
        fullnameError.textContent = "Full name is required"
        isValid = false
      }
  
      if (!email) {
        emailError.textContent = "Email is required"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.textContent = "Email is invalid"
        isValid = false
      }
  
      if (!password) {
        passwordError.textContent = "Password is required"
        isValid = false
      } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters"
        isValid = false
      }
  
      if (!confirmPassword) {
        confirmPasswordError.textContent = "Please confirm your password"
        isValid = false
      } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match"
        isValid = false
      }
  
      if (!isValid) return
  
      // Show loading state
      registerButton.disabled = true
      buttonText.textContent = "Creating account..."
      spinner.classList.remove("hidden")

      // Make API call to register.php
      fetch('api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          fullname: fullname,
          email: email,
          password: password,
          confirm_password: confirmPassword
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = "main.html";
        } else {
          registerError.textContent = data.message;
          registerError.classList.remove("hidden");
        }
      })
      .catch(error => {
        registerError.textContent = "An error occurred. Please try again.";
        registerError.classList.remove("hidden");
      })
      .finally(() => {
        // Reset loading state
        registerButton.disabled = false;
        buttonText.textContent = "Register";
        spinner.classList.add("hidden");
      });
    })
  })
  
  