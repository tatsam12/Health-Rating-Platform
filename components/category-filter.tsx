"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Sample categories for the food health platform
const categories = [
  { id: "chocolates", name: "Chocolates" },
  { id: "biscuits", name: "Biscuits & Cookies" },
  { id: "juices", name: "Juices & Beverages" },
  { id: "noodles", name: "Noodles & Pasta" },
  { id: "snacks", name: "Snacks" },
  { id: "cereals", name: "Breakfast Cereals" },
  { id: "dairy", name: "Dairy Products" },
  { id: "frozen", name: "Frozen Foods" },
  { id: "canned", name: "Canned Foods" },
  { id: "condiments", name: "Condiments & Sauces" },
]

// Sample brands
const brands = [
  { id: "nestle", name: "Nestlé" },
  { id: "kelloggs", name: "Kellogg's" },
  { id: "pepsico", name: "PepsiCo" },
  { id: "kraft", name: "Kraft Heinz" },
  { id: "unilever", name: "Unilever" },
  { id: "mars", name: "Mars" },
  { id: "danone", name: "Danone" },
  { id: "mondelez", name: "Mondelēz International" },
]

export function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex justify-between items-center">
            <span>Categories</span>
            {selectedCategories.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])} className="text-xs h-7 px-2">
                Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex justify-between items-center">
            <span>Brands</span>
            {selectedBrands.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedBrands([])} className="text-xs h-7 px-2">
                Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => toggleBrand(brand.id)}
                />
                <Label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )
}

