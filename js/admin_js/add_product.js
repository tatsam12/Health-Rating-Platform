document.addEventListener("DOMContentLoaded", () => {
    // Check if user is admin
    checkAdminAuth()
  
    // Load form data
    loadCategories()
    loadBrands()
    loadNutrients()
    loadCertifications()
  
    // Tab navigation
    const tabButtons = document.querySelectorAll(".tab-btn")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")
        switchTab(tabId)
      })
    })
  
    // Next/Previous tab buttons
    const nextButtons = document.querySelectorAll(".next-tab")
    const prevButtons = document.querySelectorAll(".prev-tab")
  
    nextButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const nextTab = this.getAttribute("data-next")
        switchTab(nextTab)
      })
    })
  
    prevButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const prevTab = this.getAttribute("data-prev")
        switchTab(prevTab)
      })
    })
  
    // Add nutrient button
    const addNutrientBtn = document.getElementById("add-nutrient-btn")
  
    addNutrientBtn.addEventListener("click", () => {
      addNutrientField()
    })
  
    // Recommendation level change
    const recommendationLevel = document.getElementById("recommendation-level")
    const recommendationNeedle = document.getElementById("recommendation-needle")
  
    recommendationLevel.addEventListener("change", function () {
      updateRecommendationMeter(this.value)
    })
  
    // Form submission
    const addProductForm = document.getElementById("add-product-form")
  
    addProductForm.addEventListener("submit", (event) => {
      event.preventDefault()
      submitProductForm()
    })
  
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
  
  function loadCategories() {
    const categorySelect = document.getElementById("product-category")
  
    // Simulate API call
    setTimeout(() => {
      // Categories data
      const categories = [
        { id: 1, name: "Chocolates" },
        { id: 2, name: "Biscuits" },
        { id: 3, name: "Juices" },
        { id: 4, name: "Noodles" },
        { id: 5, name: "Cereals" },
        { id: 6, name: "Snacks" },
        { id: 7, name: "Dairy" },
        { id: 8, name: "Bread" },
        { id: 9, name: "Frozen Foods" },
        { id: 10, name: "Canned Foods" },
        { id: 11, name: "Beverages" },
        { id: 12, name: "Condiments" },
      ]
  
      // Add options to select
      categories.forEach((category) => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        categorySelect.appendChild(option)
      })
    }, 500)
  }
  
  function loadBrands() {
    const brandSelect = document.getElementById("product-brand")
  
    // Simulate API call
    setTimeout(() => {
      // Brands data
      const brands = [
        { id: 1, name: "Nature's Best" },
        { id: 2, name: "Healthy Bites" },
        { id: 3, name: "Pure Squeeze" },
        { id: 4, name: "Quick Meals" },
        { id: 5, name: "Morning Start" },
        { id: 6, name: "Nutty Goodness" },
        { id: 7, name: "Creamy Delights" },
        { id: 8, name: "Baker's Choice" },
        { id: 9, name: "Fresh Freeze" },
        { id: 10, name: "Homestyle" },
        { id: 11, name: "Tea Masters" },
        { id: 12, name: "Mediterranean" },
      ]
  
      // Add options to select
      brands.forEach((brand) => {
        const option = document.createElement("option")
        option.value = brand.id
        option.textContent = brand.name
        brandSelect.appendChild(option)
      })
    }, 500)
  }
  
  function loadNutrients() {
    const nutrientSelects = document.querySelectorAll('select[name^="nutrients"]')
  
    // Simulate API call
    setTimeout(() => {
      // Nutrients data
      const nutrients = [
        { id: 1, name: "Calories", unit: "kcal" },
        { id: 2, name: "Fat", unit: "g" },
        { id: 3, name: "Saturated Fat", unit: "g" },
        { id: 4, name: "Carbohydrates", unit: "g" },
        { id: 5, name: "Sugar", unit: "g" },
        { id: 6, name: "Fiber", unit: "g" },
        { id: 7, name: "Protein", unit: "g" },
        { id: 8, name: "Sodium", unit: "mg" },
      ]
  
      // Add options to all nutrient selects
      nutrientSelects.forEach((select) => {
        nutrients.forEach((nutrient) => {
          const option = document.createElement("option")
          option.value = nutrient.id
          option.textContent = `${nutrient.name} (${nutrient.unit})`
          select.appendChild(option)
        })
      })
    }, 500)
  }
  
  function loadCertifications() {
    const certificationsContainer = document.getElementById("certifications-list")
  
    // Simulate API call
    setTimeout(() => {
      // Clear loading spinner
      certificationsContainer.innerHTML = ""
  
      // Certifications data
      const certifications = [
        { id: 1, name: "Organic" },
        { id: 2, name: "Fair Trade" },
        { id: 3, name: "Non-GMO" },
        { id: 4, name: "Gluten-Free" },
        { id: 5, name: "Vegan" },
        { id: 6, name: "Kosher" },
        { id: 7, name: "Halal" },
        { id: 8, name: "Low Sodium" },
        { id: 9, name: "No Added Sugar" },
        { id: 10, name: "Sustainably Sourced" },
      ]
  
      // Create checkboxes
      certifications.forEach((cert) => {
        const checkboxItem = document.createElement("div")
        checkboxItem.className = "checkbox-item"
        checkboxItem.innerHTML = `
                  <input type="checkbox" id="cert-${cert.id}" name="certifications[]" value="${cert.id}">
                  <label for="cert-${cert.id}">${cert.name}</label>
              `
  
        certificationsContainer.appendChild(checkboxItem)
      })
    }, 500)
  }
  
  function addNutrientField() {
    const nutrientsList = document.getElementById("nutrients-list")
    const nutrientItems = nutrientsList.querySelectorAll(".nutrient-item")
    const index = nutrientItems.length
  
    // Create new nutrient item
    const nutrientItem = document.createElement("div")
    nutrientItem.className = "nutrient-item"
    nutrientItem.innerHTML = `
          <div class="form-row">
              <div class="form-group">
                  <label>Nutrient</label>
                  <select name="nutrients[${index}][id]" required>
                      <option value="">Select Nutrient</option>
                  </select>
              </div>
              
              <div class="form-group">
                  <label>Amount</label>
                  <input type="number" name="nutrients[${index}][amount]" step="0.01" min="0" required>
              </div>
              
              <div class="form-group">
                  <label>% Daily Value</label>
                  <input type="number" name="nutrients[${index}][daily_value]" step="0.1" min="0">
              </div>
              
              <button type="button" class="remove-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
          </div>
      `
  
    // Add to list
    nutrientsList.appendChild(nutrientItem)
  
    // Load nutrients for the new select
    const nutrientSelect = nutrientItem.querySelector("select")
  
    // Simulate API call
    setTimeout(() => {
      // Nutrients data
      const nutrients = [
        { id: 1, name: "Calories", unit: "kcal" },
        { id: 2, name: "Fat", unit: "g" },
        { id: 3, name: "Saturated Fat", unit: "g" },
        { id: 4, name: "Carbohydrates", unit: "g" },
        { id: 5, name: "Sugar", unit: "g" },
        { id: 6, name: "Fiber", unit: "g" },
        { id: 7, name: "Protein", unit: "g" },
        { id: 8, name: "Sodium", unit: "mg" },
      ]
  
      // Add options to select
      nutrients.forEach((nutrient) => {
        const option = document.createElement("option")
        option.value = nutrient.id
        option.textContent = `${nutrient.name} (${nutrient.unit})`
        nutrientSelect.appendChild(option)
      })
    }, 100)
  
    // Enable remove button for first item if there are now multiple items
    if (index === 0) {
      const firstRemoveBtn = nutrientsList.querySelector(".remove-btn")
      firstRemoveBtn.disabled = false
    }
  
    // Add remove event
    const removeBtn = nutrientItem.querySelector(".remove-btn")
    removeBtn.addEventListener("click", () => {
      nutrientItem.remove()
  
      // If only one item left, disable its remove button
      const remainingItems = nutrientsList.querySelectorAll(".nutrient-item")
      if (remainingItems.length === 1) {
        const lastRemoveBtn = remainingItems[0].querySelector(".remove-btn")
        lastRemoveBtn.disabled = true
      }
    })
  }
  
  function updateRecommendationMeter(level) {
    const needle = document.getElementById("recommendation-needle")
  
    switch (level) {
      case "Highly Recommended":
        needle.style.left = "10%"
        break
      case "Recommended":
        needle.style.left = "30%"
        break
      case "Moderate":
        needle.style.left = "50%"
        break
      case "Limited":
        needle.style.left = "70%"
        break
      case "Not Recommended":
        needle.style.left = "90%"
        break
      default:
        needle.style.left = "50%"
    }
  }
  
  function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.classList.remove("active")
    })
  
    // Remove active class from all tab buttons
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
  
    // Show selected tab
    document.getElementById(tabId + "-tab").classList.add("active")
  
    // Add active class to selected tab button
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add("active")
  
    // Scroll to top of form
    document.querySelector(".admin-form").scrollIntoView({ behavior: "smooth" })
  }
  
  function submitProductForm() {
    // Get form data
    const form = document.getElementById("add-product-form")
    const formData = new FormData(form)
  
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.disabled = true
    submitBtn.textContent = "Saving..."
  
    // Simulate API call
    setTimeout(() => {
      // Success message
      alert("Product saved successfully!")
  
      // Reset form
      form.reset()
  
      // Reset to first tab
      switchTab("basic-info")
  
      // Reset recommendation meter
      document.getElementById("recommendation-needle").style.left = "50%"
  
      // Reset submit button
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }, 1500)
  }
  
  function logout() {
    // Clear admin status
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("userName")
  
    // Redirect to login
    window.location.href = "../index.html"
  }
  
  