document.addEventListener("DOMContentLoaded", () => {
  // Check if user is admin
  checkAdminAuth()

  // Load dashboard data
  loadDashboardStats()
  loadRecentActivity()

  // Logout button
  const logoutBtn = document.getElementById("logout-btn")

  logoutBtn.addEventListener("click", () => {
    logout()
  })
})

function checkAdminAuth() {
  // In a real app, this would check the session or token
  // For demo purposes, we'll just redirect to login if not admin
  const isAdmin = localStorage.getItem("isAdmin") === "true"

  if (!isAdmin) {
    window.location.href = "../index.html"
  }

  // Set admin name
  const adminName = document.getElementById("admin-name")
  adminName.textContent = localStorage.getItem("userName") || "Admin User"
}

function loadDashboardStats() {
  // Simulate API call
  setTimeout(() => {
    // Update stats
    document.getElementById("total-products").textContent = "124"
    document.getElementById("total-categories").textContent = "12"
    document.getElementById("total-brands").textContent = "18"
    document.getElementById("total-users").textContent = "356"
  }, 500)
}

function loadRecentActivity() {
  const activityTable = document.getElementById("activity-table")

  // Simulate API call
  setTimeout(() => {
    // Clear loading message
    activityTable.innerHTML = ""

    // Activity data
    const activities = [
      { action: "Added Product", item: "Organic Dark Chocolate", date: "2023-11-10 14:32" },
      { action: "Updated Product", item: "Whole Grain Crackers", date: "2023-11-10 11:15" },
      { action: "Added Category", item: "Protein Bars", date: "2023-11-09 16:45" },
      { action: "Added Brand", item: "Green Harvest", date: "2023-11-09 10:20" },
      { action: "Updated Product", item: "Fresh Orange Juice", date: "2023-11-08 15:30" },
    ]

    // Create table rows
    activities.forEach((activity) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>${activity.action}</td>
                <td>${activity.item}</td>
                <td>${activity.date}</td>
            `

      activityTable.appendChild(row)
    })
  }, 800)
}

function logout() {
  // Clear admin status
  localStorage.removeItem("isAdmin")
  localStorage.removeItem("userName")

  // Redirect to login
  window.location.href = "../index.html"
}

