import Link from "next/link"
import { ArrowRight, Bookmark, Compass, Cpu, Gamepad2, Palette, Shapes, Sparkles } from "lucide-react"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCategories, getCategoryCount } from "@/lib/data-utils"

// Define the category icons
const categoryIcons = {
  "design-tools": Palette,
  "3d-tools": Shapes,
  "game-dev-tools": Gamepad2,
  "ai-tools": Cpu,
  productivity: Sparkles,
  "learning-resources": Bookmark,
}

export default async function Home() {
  const categories = await getAllCategories()

  return (
    <main className="container py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Website <span className="text-blue-500">Wiki</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px]">
          A curated collection of useful websites organized by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          await Promise.all(
            categories.map(async (category) => {
              const Icon = categoryIcons[category.id as keyof typeof categoryIcons]
              const count = await getCategoryCount(category.id)

              return (
                <Link key={category.id} href={`/category/${category.id}`} className="block">
                  <Card className="h-full transition-all hover:border-blue-500 hover:shadow-md hover:shadow-blue-900/10">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                          {Icon && <Icon className="h-6 w-6" />}
                        </div>
                        <div className="text-sm text-muted-foreground">{count} sites</div>
                      </div>
                      <CardTitle className="mt-4">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <div className="flex items-center text-blue-500 text-sm font-medium">
                        Browse category <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              )
            }),
          )
        }
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Compass className="mr-2 h-4 w-4" />
          Learn about this wiki
        </Link>
      </div>
    </main>
  )
}
