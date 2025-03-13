document.addEventListener("DOMContentLoaded", () => {
    // Toggle filters on mobile
    const toggleFiltersBtn = document.getElementById("toggle-filters-btn")
    const filtersSidebar = document.getElementById("filters-sidebar")
  
    toggleFiltersBtn.addEventListener("click", function () {
      filtersSidebar.classList.toggle("active")
      this.textContent = filtersSidebar.classList.contains("active") ? "Hide Filters" : "Show Filters"
    })
  
    // Load filter options
    loadFilterOptions()
  
    // Load initial products
    loadSearchResults()
  
    // Search input event
    const searchInput = document.getElementById("search-input")
    searchInput.addEventListener(
      "input",
      debounce(() => {
        loadSearchResults()
      }, 500),
    )
  
    // Sort select event
    const sortSelect = document.getElementById("sort-select")
    sortSelect.addEventListener("change", () => {
      loadSearchResults()
    })
  
    // Price range slider
    const priceRange = document.getElementById("price-range")
    const priceRangeValue = document.getElementById("price-range-value")
  
    priceRange.addEventListener("input", function () {
      priceRangeValue.textContent = `$0 - $${this.value}`
    })
  
    priceRange.addEventListener("change", () => {
      loadSearchResults()
    })
  
    // Health score slider
    const healthScore = document.getElementById("health-score")
    const healthScoreValue = document.getElementById("health-score-value")
  
    healthScore.addEventListener("input", function () {
      healthScoreValue.textContent = `0 - ${this.value}`
    })
  
    healthScore.addEventListener("change", () => {
      loadSearchResults()
    })
  
    // Clear filters buttons
    const clearFiltersBtn = document.getElementById("clear-filters-btn")
    const mobileClearFilters = document.getElementById("mobile-clear-filters")
    const clearSearchFilters = document.getElementById("clear-search-filters")
    ;[clearFiltersBtn, mobileClearFilters, clearSearchFilters].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          clearAllFilters()
        })
      }
    })
  
    // Check for URL parameters (e.g., from category page)
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get("category")
  
    if (categoryParam) {
      // Add the category to selected categories
      const categoryCheckbox = document.querySelector(`input[value="${categoryParam}"]`)
      if (categoryCheckbox) {
        categoryCheckbox.checked = true
        loadSearchResults()
      }
    }
  })
  
  function loadFilterOptions() {
    // Categories
    const categoriesFilter = document.getElementById("categories-filter")
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
  
    categories.forEach((category) => {
      const option = document.createElement("div")
      option.className = "filter-option"
      option.innerHTML = `
              <input type="checkbox" id="category-${category}" value="${category}">
              <label for="category-${category}">${category}</label>
          `
  
      // Add change event
      const checkbox = option.querySelector("input")
      checkbox.addEventListener("change", () => {
        loadSearchResults()
      })
  
      categoriesFilter.appendChild(option)
    })
  
    // Brands
    const brandsFilter = document.getElementById("brands-filter")
    const brands = [
      "Nature's Best",
      "Healthy Bites",
      "Pure Squeeze",
      "Quick Meals",
      "Morning Start",
      "Nutty Goodness",
      "Creamy Delights",
      "Baker's Choice",
      "Fresh Freeze",
      "Homestyle",
      "Tea Masters",
      "Mediterranean",
    ]
  
    brands.forEach((brand) => {
      const option = document.createElement("div")
      option.className = "filter-option"
      option.innerHTML = `
              <input type="checkbox" id="brand-${brand}" value="${brand}">
              <label for="brand-${brand}">${brand}</label>
          `
  
      // Add change event
      const checkbox = option.querySelector("input")
      checkbox.addEventListener("change", () => {
        loadSearchResults()
      })
  
      brandsFilter.appendChild(option)
    })
  }
  
  function loadSearchResults() {
    const searchResultsGrid = document.getElementById("search-results-grid")
    const resultsCount = document.getElementById("results-count")
    const noResults = document.getElementById("no-results")
    const activeFilters = document.getElementById("active-filters")
    const mobileClearFilters = document.getElementById("mobile-clear-filters")
  
    // Get filter values
    const searchTerm = document.getElementById("search-input").value.trim().toLowerCase()
    const sortOption = document.getElementById("sort-select").value
    const priceRange = Number.parseFloat(document.getElementById("price-range").value)
    const healthScore = Number.parseInt(document.getElementById("health-score").value)
  
    const selectedCategories = Array.from(document.querySelectorAll("#categories-filter input:checked")).map(
      (input) => input.value,
    )
    const selectedBrands = Array.from(document.querySelectorAll("#brands-filter input:checked")).map(
      (input) => input.value,
    )
  
    // Show loading spinner
    searchResultsGrid.innerHTML = '<div class="loading-spinner"></div>'
  
    // Update active filters
    activeFilters.innerHTML = ""
  
    selectedCategories.forEach((category) => {
      const filterTag = document.createElement("div")
      filterTag.className = "filter-tag"
      filterTag.innerHTML = `
              ${category}
              <button data-type="category" data-value="${category}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
          `
  
      // Add click event to remove filter
      filterTag.querySelector("button").addEventListener("click", () => {
        const categoryCheckbox = document.querySelector(`#category-${category}`)
        if (categoryCheckbox) {
          categoryCheckbox.checked = false
          loadSearchResults()
        }
      })
  
      activeFilters.appendChild(filterTag)
    })
  
    selectedBrands.forEach((brand) => {
      const filterTag = document.createElement("div")
      filterTag.className = "filter-tag brand-tag"
      filterTag.innerHTML = `
              ${brand}
              <button data-type="brand" data-value="${brand}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
          `
  
      // Add click event to remove filter
      filterTag.querySelector("button").addEventListener("click", () => {
        const brandCheckbox = document.querySelector(`#brand-${brand}`)
        if (brandCheckbox) {
          brandCheckbox.checked = false
          loadSearchResults()
        }
      })
  
      activeFilters.appendChild(filterTag)
    })
  
    // Show/hide mobile clear filters button
    if (selectedCategories.length > 0 || selectedBrands.length > 0) {
      mobileClearFilters.classList.remove("hidden")
    } else {
      mobileClearFilters.classList.add("hidden")
    }
  
    // Simulate API call to get filtered products
    setTimeout(() => {
      // Products data
      const allProducts = [
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
        {
          id: 7,
          name: "Fruit Yogurt",
          category: "Dairy",
          rating: 4.3,
          price: 1.29,
          brand: "Creamy Delights",
          healthScore: 82,
        },
        {
          id: 8,
          name: "Multigrain Bread",
          category: "Bread",
          rating: 4.6,
          price: 3.49,
          brand: "Baker's Choice",
          healthScore: 90,
        },
        {
          id: 9,
          name: "Frozen Berries",
          category: "Frozen Foods",
          rating: 4.4,
          price: 4.79,
          brand: "Fresh Freeze",
          healthScore: 87,
        },
        {
          id: 10,
          name: "Tomato Soup",
          category: "Canned Foods",
          rating: 4.0,
          price: 2.29,
          brand: "Homestyle",
          healthScore: 75,
        },
        {
          id: 11,
          name: "Green Tea",
          category: "Beverages",
          rating: 4.5,
          price: 3.99,
          brand: "Tea Masters",
          healthScore: 93,
        },
        {
          id: 12,
          name: "Olive Oil",
          category: "Condiments",
          rating: 4.8,
          price: 8.99,
          brand: "Mediterranean",
          healthScore: 96,
        },
      ]
  
      // Filter products
      const filteredProducts = allProducts.filter((product) => {
        const matchesSearch =
          searchTerm === "" ||
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
  
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
        const matchesPrice = product.price <= priceRange
        const matchesHealthScore = product.healthScore <= healthScore
  
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesHealthScore
      })
  
      // Sort products
      filteredProducts.sort((a, b) => {
        switch (sortOption) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating-high":
            return b.rating - a.rating
          case "health-high":
            return b.healthScore - a.healthScore
          default:
            return 0
        }
      })
  
      // Update results count
      resultsCount.textContent = `${filteredProducts.length} ${filteredProducts.length === 1 ? "Product" : "Products"}`
  
      // Clear results grid
      searchResultsGrid.innerHTML = ""
  
      // Show no results message if needed
      if (filteredProducts.length === 0) {
        noResults.classList.remove("hidden")
        return
      } else {
        noResults.classList.add("hidden")
      }
  
      // Create product cards
      filteredProducts.forEach((product) => {
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
  
        searchResultsGrid.appendChild(productCard)
      })
    }, 1000)
  }
  
  function clearAllFilters() {
    // Reset search input
    document.getElementById("search-input").value = ""
  
    // Reset sort select
    document.getElementById("sort-select").value = "relevance"
  
    // Reset price range
    const priceRange = document.getElementById("price-range")
    priceRange.value = 10
    document.getElementById("price-range-value").textContent = "$0 - $10"
  
    // Reset health score
    const healthScore = document.getElementById("health-score")
    healthScore.value = 100
    document.getElementById("health-score-value").textContent = "0 - 100"
  
    // Uncheck all category checkboxes
    document.querySelectorAll("#categories-filter input").forEach((checkbox) => {
      checkbox.checked = false
    })
  
    // Uncheck all brand checkboxes
    document.querySelectorAll("#brands-filter input").forEach((checkbox) => {
      checkbox.checked = false
    })
  
    // Reload search results
    loadSearchResults()
  }
  
  // Debounce function to limit how often a function can be called
  function debounce(func, wait) {
    let timeout
    return function () {
      
      const args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
  
  