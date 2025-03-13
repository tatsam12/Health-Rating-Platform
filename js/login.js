document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-error");

  // Check if user is already logged in
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "dashboard.html";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Basic validation
      if (!email || !password) {
        showMessage("Please fill in all fields", "error");
        return;
      }

      // Show loading state
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Logging in...";
      submitButton.disabled = true;

      // Send login request to API
      fetch("api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Store token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Show success message and redirect
            showMessage("Login successful! Redirecting...", "success");
            setTimeout(() => {
              window.location.href = "dashboard.html";
            }, 1000);
          } else {
            showMessage(data.message || "Login failed. Please check your credentials.", "error");
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showMessage("An error occurred. Please try again later.", "error");
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }

  function showMessage(message, type) {
    if (loginMessage) {
      loginMessage.textContent = message;
      loginMessage.className = "error-message " + type;
    }
  }
});
