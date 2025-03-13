document.addEventListener("DOMContentLoaded", () => {
    // Load categories
    loadCategories()
  
    // Load products
    loadProducts()
  
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
  
        // Load products for the tab if not already loaded
        if (this.getAttribute("data-tab") !== "all") {
          const tabName = this.getAttribute("data-tab")
          loadTabProducts(tabName)
        }
      })
    })
  })
  
  function loadCategories() {
    const categoriesGrid = document.getElementById("categories-grid")
  
    // Simulate API call to get categories
    setTimeout(() => {
      // Clear loading spinner
      categoriesGrid.innerHTML = ""
  
      // Categories data
      const categories = [
        "Chocolates",
        "Biscuits",
        "Juices",
        "Noodles",
        "Cereals",
        "Snacks",
        "Dairy",
        "Bread",
        "Frozen Foods",
        "Canned Foods",
        "Beverages",
        "Condiments",
      ]
  
      // Create category cards
      categories.forEach((category) => {
        const categoryCard = document.createElement("div")
        categoryCard.className = "card category-card"
        categoryCard.innerHTML = `
                  <div class="card-content">
                      <div class="category-name">${category}</div>
                  </div>
              `
  
        // Add click event
        categoryCard.addEventListener("click", () => {
          window.location.href = `search.html?category=${encodeURIComponent(category)}`
        })
  
        categoriesGrid.appendChild(categoryCard)
      })
    }, 1000)
  }
  
  function loadProducts() {
    const productsGrid = document.getElementById("products-grid")
  
    // Simulate API call to get products
    setTimeout(() => {
      // Clear loading spinner
      productsGrid.innerHTML = ""
  
      // Products data
      const products = [
        {
          id: 1,
          name: "Organic Dark Chocolate",
          category: "Chocolates",
          rating: 4.8,
          price: 3.99,
          brand: "Nature's Best",
          healthScore: 85,
        },
        {
          id: 2,
          name: "Whole Grain Crackers",
          category: "Biscuits",
          rating: 4.5,
          price: 2.49,
          brand: "Healthy Bites",
          healthScore: 92,
        },
        {
          id: 3,
          name: "Fresh Orange Juice",
          category: "Juices",
          rating: 4.2,
          price: 4.99,
          brand: "Pure Squeeze",
          healthScore: 78,
        },
        {
          id: 4,
          name: "Vegetable Ramen",
          category: "Noodles",
          rating: 3.9,
          price: 1.99,
          brand: "Quick Meals",
          healthScore: 65,
        },
        {
          id: 5,
          name: "Granola Cereal",
          category: "Cereals",
          rating: 4.7,
          price: 5.49,
          brand: "Morning Start",
          healthScore: 88,
        },
        {
          id: 6,
          name: "Mixed Nuts",
          category: "Snacks",
          rating: 4.9,
          price: 6.99,
          brand: "Nutty Goodness",
          healthScore: 95,
        },
      ]
  
      // Create product cards
      products.forEach((product) => {
        const productCard = createProductCard(product)
        productsGrid.appendChild(productCard)
      })
    }, 1500)
  }
  
  function loadTabProducts(tabName) {
    const tabContentId = tabName + "-products"
    const tabContent = document.getElementById(tabContentId)
  
    // If already loaded, skip
    if (tabContent.children.length > 0) return
  
    // Add loading spinner
    tabContent.innerHTML = '<div class="loading-spinner"></div>'
  
    // Simulate API call to get filtered products
    setTimeout(() => {
      // Clear loading spinner
      tabContent.innerHTML = ""
  
      // Products data based on tab
      let products = []
  
      switch (tabName) {
        case "high-rated":
          products = [
            {
              id: 6,
              name: "Mixed Nuts",
              category: "Snacks",
              rating: 4.9,
              price: 6.99,
              brand: "Nutty Goodness",
              healthScore: 95,
            },
            {
              id: 1,
              name: "Organic Dark Chocolate",
              category: "Chocolates",
              rating: 4.8,
              price: 3.99,
              brand: "Nature's Best",
              healthScore: 85,
            },
            {
              id: 5,
              name: "Granola Cereal",
              category: "Cereals",
              rating: 4.7,
              price: 5.49,
              brand: "Morning Start",
              healthScore: 88,
            },
          ]
          break
        case "low-price":
          products = [
            {
              id: 4,
              name: "Vegetable Ramen",
              category: "Noodles",
              rating: 3.9,
              price: 1.99,
              brand: "Quick Meals",
              healthScore: 65,
            },
            {
              id: 2,
              name: "Whole Grain Crackers",
              category: "Biscuits",
              rating: 4.5,
              price: 2.49,
              brand: "Healthy Bites",
              healthScore: 92,
            },
            {
              id: 1,
              name: "Organic Dark Chocolate",
              category: "Chocolates",
              rating: 4.8,
              price: 3.99,
              brand: "Nature's Best",
              healthScore: 85,
            },
          ]
          break
        case "popular-brands":
          products = [
            {
              id: 1,
              name: "Organic Dark Chocolate",
              category: "Chocolates",
              rating: 4.8,
              price: 3.99,
              brand: "Nature's Best",
              healthScore: 85,
            },
            {
              id: 7,
              name: "Milk Chocolate",
              category: "Chocolates",
              rating: 4.5,
              price: 3.49,
              brand: "Nature's Best",
              healthScore: 70,
            },
            {
              id: 2,
              name: "Whole Grain Crackers",
              category: "Biscuits",
              rating: 4.5,
              price: 2.49,
              brand: "Healthy Bites",
              healthScore: 92,
            },
          ]
          break
      }
  
      // Create product cards
      products.forEach((product) => {
        const productCard = createProductCard(product)
        tabContent.appendChild(productCard)
      })
    }, 1000)
  }
  
  function createProductCard(product) {
    const productCard = document.createElement("div")
    productCard.className = "card product-card"
    productCard.innerHTML = `
          <div class="product-image">
              <img src="assets/placeholder-product.jpg" alt="${product.name}">
          </div>
          <div class="card-content">
              <div class="product-info">
                  <div>
                      <h3 class="product-name">${product.name}</h3>
                      <p class="product-brand">${product.brand}</p>
                  </div>
                  <div class="product-rating">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      <span>${product.rating}</span>
                  </div>
              </div>
              <div class="product-meta">
                  <span class="product-category">${product.category}</span>
                  <span class="product-price">$${product.price.toFixed(2)}</span>
              </div>
              <div class="health-score-container">
                  <div class="health-score-header">
                      <span>Health Score</span>
                      <span class="health-score-value">${product.healthScore}/100</span>
                  </div>
                  <div class="progress-bar">
                      <div class="progress-bar-fill" style="width: ${product.healthScore}%;"></div>
                  </div>
              </div>
          </div>
      `
  
    // Add click event
    productCard.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`
    })
  
    return productCard
  }
  
  