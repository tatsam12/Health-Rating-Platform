"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Dark Chocolate Bar",
    brand: "Nestlé",
    category: "chocolates",
    price: 3.99,
    rating: 4.5,
    healthScore: 3.8,
    image: "/placeholder.svg?height=200&width=200",
    nutrients: {
      calories: 180,
      fat: 12,
      carbs: 15,
      protein: 2,
      sugar: 10,
    },
  },
  {
    id: 2,
    name: "Whole Grain Biscuits",
    brand: "Kellogg's",
    category: "biscuits",
    price: 2.49,
    rating: 4.2,
    healthScore: 4.1,
    image: "/placeholder.svg?height=200&width=200",
    nutrients: {
      calories: 120,
      fat: 5,
      carbs: 18,
      protein: 3,
      sugar: 4,
    },
  },
  {
    id: 3,
    name: "Orange Juice",
    brand: "PepsiCo",
    category: "juices",
    price: 3.29,
    rating: 4.0,
    healthScore: 3.5,
    image: "/placeholder.svg?height=200&width=200",
    nutrients: {
      calories: 110,
      fat: 0,
      carbs: 26,
      protein: 1,
      sugar: 22,
    },
  },
  {
    id: 4,
    name: "Instant Noodles",
    brand: "Nestlé",
    category: "noodles",
    price: 0.99,
    rating: 3.8,
    healthScore: 2.1,
    image: "/placeholder.svg?height=200&width=200",
    nutrients: {
      calories: 380,
      fat: 14,
      carbs: 52,
      protein: 8,
      sugar: 2,
    },
  },
  {
    id: 5,
    name: "Granola Cereal",
    brand: "Kellogg's",
    category: "cereals",
    price: 4.99,
    rating: 4.7,
    healthScore: 4.3,
    image: "/placeholder.svg?height=200&width=200",
    nutrients: {
      calories: 210,
      fat: 6,
      carbs: 42,
      protein: 5,
      sugar: 12,
    },
  },
  {
    id: 6,
    name: "Potato Chips",
    brand: "PepsiCo",
    category: "snacks",
    price: 2.99,
    rating: 4.1,
    healthScore: 1.8,
    image: "/placeholder.svg?height=200&width=200",
    nutrients: {
      calories: 160,
      fat: 10,
      carbs: 15,
      protein: 2,
      sugar: 0,
    },
  },
]

export function ProductGrid() {
  const [products] = useState(sampleProducts)

  // Function to determine health score color
  const getHealthScoreColor = (score: number) => {
    if (score >= 4) return "bg-green-500"
    if (score >= 3) return "bg-yellow-500"
    if (score >= 2) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="relative pt-4 px-4">
              <Badge className="absolute top-2 right-2 z-10">{product.category}</Badge>
              <div className="flex justify-center">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain h-[150px]"
                />
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getHealthScoreColor(product.healthScore)}`}
                >
                  {product.healthScore}
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="text-sm ml-1">{product.rating}</span>
              </div>

              <div className="grid grid-cols-5 gap-2 text-xs mt-3">
                <div className="text-center">
                  <div className="font-semibold">{product.nutrients.calories}</div>
                  <div className="text-gray-500">Cal</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{product.nutrients.fat}g</div>
                  <div className="text-gray-500">Fat</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{product.nutrients.carbs}g</div>
                  <div className="text-gray-500">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{product.nutrients.protein}g</div>
                  <div className="text-gray-500">Protein</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{product.nutrients.sugar}g</div>
                  <div className="text-gray-500">Sugar</div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              <Badge variant="outline" className="text-xs">
                {product.healthScore >= 4
                  ? "Excellent"
                  : product.healthScore >= 3
                    ? "Good"
                    : product.healthScore >= 2
                      ? "Fair"
                      : "Poor"}
              </Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

