interface NutrientProps {
    nutrients: {
      calories: number
      fat: number
      saturatedFat: number
      carbs: number
      fiber: number
      sugar: number
      protein: number
      sodium: number
      calcium: number
      iron: number
    }
    servingSize: string
  }
  
  export function NutritionFacts({ nutrients, servingSize }: NutrientProps) {
    return (
      <div className="font-sans max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-1">Nutrition Facts</h2>
        <p className="mb-2">Serving Size: {servingSize}</p>
  
        <div className="border-t-8 border-b-4 border-black py-1 mb-1">
          <p className="font-bold">Amount Per Serving</p>
        </div>
  
        <div className="flex justify-between border-b border-gray-300 py-1">
          <p className="font-bold text-lg">Calories</p>
          <p className="font-bold text-lg">{nutrients.calories}</p>
        </div>
  
        <div className="text-right text-xs border-b-8 border-black py-1 mb-1">
          <p>% Daily Value*</p>
        </div>
  
        <NutrientRow name="Total Fat" value={`${nutrients.fat}g`} percentage={Math.round((nutrients.fat * 100) / 65)} />
        <NutrientRow
          name="Saturated Fat"
          value={`${nutrients.saturatedFat}g`}
          percentage={Math.round((nutrients.saturatedFat * 100) / 20)}
          indented
        />
        <NutrientRow
          name="Total Carbohydrate"
          value={`${nutrients.carbs}g`}
          percentage={Math.round((nutrients.carbs * 100) / 300)}
        />
        <NutrientRow
          name="Dietary Fiber"
          value={`${nutrients.fiber}g`}
          percentage={Math.round((nutrients.fiber * 100) / 25)}
          indented
        />
        <NutrientRow name="Sugars" value={`${nutrients.sugar}g`} percentage={null} indented />
        <NutrientRow name="Protein" value={`${nutrients.protein}g`} percentage={null} />
        <NutrientRow
          name="Sodium"
          value={`${nutrients.sodium}mg`}
          percentage={Math.round((nutrients.sodium * 100) / 2300)}
        />
        <NutrientRow
          name="Calcium"
          value={`${nutrients.calcium}mg`}
          percentage={Math.round((nutrients.calcium * 100) / 1300)}
        />
        <NutrientRow name="Iron" value={`${nutrients.iron}mg`} percentage={Math.round((nutrients.iron * 100) / 18)} />
  
        <div className="text-xs mt-4">
          <p>
            * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000
            calories a day is used for general nutrition advice.
          </p>
        </div>
      </div>
    )
  }
  
  interface NutrientRowProps {
    name: string
    value: string
    percentage: number | null
    indented?: boolean
  }
  
  function NutrientRow({ name, value, percentage, indented = false }: NutrientRowProps) {
    return (
      <div className={`flex justify-between border-b border-gray-300 py-1 ${indented ? "pl-4" : ""}`}>
        <p className={`${indented ? "font-normal" : "font-bold"}`}>{name}</p>
        <div className="flex gap-4">
          <p>{value}</p>
          {percentage !== null && <p className="font-bold">{percentage}%</p>}
        </div>
      </div>
    )
  }
  
  