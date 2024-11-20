document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    try {
      const response = await fetch(
        "http://localhost:5000/password/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          "Password reset successful! Please login with your new password."
        );
        window.location.href = "login.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error resetting password. Please try again.");
    }
  });
