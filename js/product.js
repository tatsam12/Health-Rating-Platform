document.addEventListener("DOMContentLoaded", () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get("id")
  
    if (!productId) {
      // Redirect to dashboard if no product ID
      window.location.href = "dashboard.html"
      return
    }
  
    // Load product details
    loadProductDetails(productId)
  
    // Tab functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all tabs
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))
  
        // Add active class to clicked tab
        this.classList.add("active")
        const tabId = this.getAttribute("data-tab") + "-tab"
        document.getElementById(tabId).classList.add("active")
      })
    })
  })
  
  function loadProductDetails(productId) {
    // Simulate API call to get product details
    setTimeout(() => {
      // Product data (in a real app, this would come from the server)
      const product = {
        id: productId,
        name: "Organic Dark Chocolate",
        brand: "Nature's Best",
        description: "Premium organic dark chocolate made with 70% cocoa. Rich in antioxidants and low in sugar.",
        price: "$3.99",
        rating: 4.8,
        healthScore: 85,
        category: "Chocolates",
        servingSize: "30g",
        nutrients: [
          { name: "Calories", amount: "170", unit: "kcal", percentage: 8.5 },
          { name: "Fat", amount: "12", unit: "g", percentage: 18.5 },
          { name: "Saturated Fat", amount: "7", unit: "g", percentage: 35 },
          { name: "Carbohydrates", amount: "13", unit: "g", percentage: 4.3 },
          { name: "Sugar", amount: "9", unit: "g", percentage: 10 },
          { name: "Fiber", amount: "3", unit: "g", percentage: 12 },
          { name: "Protein", amount: "2", unit: "g", percentage: 4 },
          { name: "Sodium", amount: "5", unit: "mg", percentage: 0.2 },
        ],
        ingredients: "Organic cocoa mass, organic cocoa butter, organic cane sugar, organic vanilla extract.",
        allergens: "May contain traces of milk, nuts, and soy.",
        certifications: ["Organic", "Fair Trade", "Non-GMO"],
        reviews: [
          { user: "John D.", rating: 5, comment: "Excellent dark chocolate with rich flavor and not too bitter." },
          { user: "Sarah M.", rating: 4, comment: "Good quality chocolate, but a bit pricey." },
          { user: "Michael R.", rating: 5, comment: "Perfect balance of sweetness and cocoa flavor." },
        ],
        similarProducts: [
          { id: 7, name: "Milk Chocolate", brand: "Nature's Best", rating: 4.5, price: "$3.49" },
          { id: 8, name: "White Chocolate", brand: "Sweet Delights", rating: 4.2, price: "$3.79" },
          { id: 9, name: "Hazelnut Chocolate", brand: "Nutty Treats", rating: 4.7, price: "$4.29" },
        ],
        serving_recommendation: {
          recommended_serving: 40,
          level: "Recommended",
          notes: "Enjoy one serving daily as part of a balanced diet.",
        },
      }
  
      // Update product details
      document.getElementById("product-name").textContent = product.name
      document.getElementById("product-brand").textContent = product.brand
      document.getElementById("product-rating").textContent = product.rating
      document.getElementById("product-description").textContent = product.description
      document.getElementById("product-category").textContent = product.category
      document.getElementById("product-price").textContent = product.price
      document.getElementById("health-score-value").textContent = `${product.healthScore}/100`
      document.getElementById("health-score-progress").style.width = `${product.healthScore}%`
  
      // Update nutrition facts
      document.getElementById("serving-size").textContent = `Serving Size: ${product.servingSize}`
  
      const nutrientsList = document.getElementById("nutrients-list")
      nutrientsList.innerHTML = ""
  
      product.nutrients.forEach((nutrient) => {
        const nutrientItem = document.createElement("div")
        nutrientItem.className = "nutrient-item"
        nutrientItem.innerHTML = `
                  <div class="nutrient-header">
                      <span class="nutrient-name">${nutrient.name}</span>
                      <div class="nutrient-value">
                          <span>${nutrient.amount}${nutrient.unit}</span>
                          <span class="nutrient-percentage">${nutrient.percentage}%</span>
                      </div>
                  </div>
                  <div class="progress-bar">
                      <div class="progress-bar-fill" style="width: ${nutrient.percentage}%;"></div>
                  </div>
              `
  
        nutrientsList.appendChild(nutrientItem)
      })
  
      // Update ingredients
      document.getElementById("ingredients-list").textContent = product.ingredients
      document.getElementById("allergens-list").textContent = product.allergens
  
      const certificationsList = document.getElementById("certifications-list")
      certificationsList.innerHTML = ""
  
      product.certifications.forEach((certification) => {
        const certTag = document.createElement("span")
        certTag.className = "certification-tag"
        certTag.textContent = certification
        certificationsList.appendChild(certTag)
      })
  
      // Update reviews
      const reviewsList = document.getElementById("reviews-list")
      reviewsList.innerHTML = ""
  
      product.reviews.forEach((review) => {
        const reviewItem = document.createElement("div")
        reviewItem.className = "review-item"
  
        let starsHtml = ""
        for (let i = 1; i <= 5; i++) {
          starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${i <= review.rating ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        }
  
        reviewItem.innerHTML = `
                  <div class="review-header">
                      <span class="reviewer-name">${review.user}</span>
                      <div class="star-rating">
                          ${starsHtml}
                      </div>
                  </div>
                  <p class="review-text">${review.comment}</p>
              `
  
        reviewsList.appendChild(reviewItem)
      })
  
      // Update similar products
      const similarProducts = document.getElementById("similar-products")
      similarProducts.innerHTML = ""
  
      product.similarProducts.forEach((item) => {
        const productCard = document.createElement("div")
        productCard.className = "card product-card"
        productCard.innerHTML = `
                  <div class="product-image">
                      <img src="assets/placeholder-product.jpg" alt="${item.name}">
                  </div>
                  <div class="card-content">
                      <div class="product-info">
                          <div>
                              <h3 class="product-name">${item.name}</h3>
                              <p class="product-brand">${item.brand}</p>
                          </div>
                          <div class="product-rating">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                              <span>${item.rating}</span>
                          </div>
                      </div>
                      <div class="product-meta">
                          <span class="product-category">Chocolates</span>
                          <span class="product-price">${item.price}</span>
                      </div>
                  </div>
              `
  
        // Add click event
        productCard.addEventListener("click", () => {
          window.location.href = `product.html?id=${item.id}`
        })
  
        similarProducts.appendChild(productCard)
      })
  
      // Add this to the loadProductDetails function after loading the product data
      // Update serving recommendation
      const recommendationLevel = product.serving_recommendation.level
      document.getElementById("recommended-serving").textContent =
        product.serving_recommendation.recommended_serving + "g"
      document.getElementById("recommendation-level").textContent = recommendationLevel
  
      if (product.serving_recommendation.notes) {
        document.getElementById("serving-notes").textContent = product.serving_recommendation.notes
      }
  
      // Update recommendation meter
      const needle = document.getElementById("product-recommendation-needle")
      switch (recommendationLevel) {
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
    }, 1000)
  }
  
  