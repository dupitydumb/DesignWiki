import Link from "next/link"
import { ArrowLeft, ExternalLink, Star } from "lucide-react"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getAllCategories, getCategoryById, getWebsitesByCategory } from "@/lib/data-utils"
import { PricingBadge } from "@/components/pricing-badge"
import { CategorySidebar } from "@/components/category-sidebar"

interface CategoryPageProps {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    slug: category.id,
  }))
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const category = await getCategoryById(slug)

  if (!category) {
    notFound()
  }

  const websites = await getWebsitesByCategory(slug)

  // Group websites by subcategory
  const websitesBySubcategory: Record<string, typeof websites> = {}

  // Add websites without subcategory to "uncategorized"
  websitesBySubcategory["uncategorized"] = websites.filter((website) => !website.subcategory)

  // Add websites to their respective subcategories
  if (category.subcategories) {
    for (const subcategory of category.subcategories) {
      websitesBySubcategory[subcategory.id] = websites.filter((website) => website.subcategory === subcategory.id)
    }
  }

  return (
    <main className="container py-8 md:py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-500 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to all categories
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{category.name}</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">{category.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar for subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="lg:w-1/4">
            <CategorySidebar category={category} websites={websites} />
          </div>
        )}

        {/* Main content area */}
        <div className={category.subcategories && category.subcategories.length > 0 ? "lg:w-3/4" : "w-full"}>
          {/* If there are subcategories, display websites grouped by subcategory */}
          {category.subcategories && category.subcategories.length > 0 ? (
            <div className="space-y-12">
              {category.subcategories.map((subcategory) => {
                const subcategoryWebsites = websitesBySubcategory[subcategory.id] || []
                if (subcategoryWebsites.length === 0) return null

                return (
                  <section key={subcategory.id} id={subcategory.id} className="scroll-mt-20">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{subcategory.name}</h2>
                      <p className="text-muted-foreground mb-6">{subcategory.description}</p>
                      <Separator className="mb-6" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {renderWebsites(subcategoryWebsites)}
                    </div>
                  </section>
                )
              })}

              {/* Display uncategorized websites if any */}
              {websitesBySubcategory["uncategorized"] && websitesBySubcategory["uncategorized"].length > 0 && (
                <section id="uncategorized" className="scroll-mt-20">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Uncategorized</h2>
                    <p className="text-muted-foreground mb-6">Websites that don't belong to a specific subcategory</p>
                    <Separator className="mb-6" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderWebsites(websitesBySubcategory["uncategorized"])}
                  </div>
                </section>
              )}
            </div>
          ) : (
            // If no subcategories, display all websites in a grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{renderWebsites(websites)}</div>
          )}

          {websites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No websites found in this category.</p>
              <Button asChild>
                <Link href="/">Browse other categories</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function renderWebsites(websites: any[]) {
  if (websites.length === 0) {
    return (
      <div className="col-span-full text-center py-8">
        <p className="text-muted-foreground">No websites found in this subcategory.</p>
      </div>
    )
  }

  return websites.map((website) => (
    <Card key={website.id} className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-xl">{website.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {website.pricing && <PricingBadge pricing={website.pricing} />}
              {website.featured && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> Featured
                </Badge>
              )}
            </div>
          </div>
        </div>
        <CardDescription className="line-clamp-2 mt-2">{website.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1 mt-2">
          {website.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">Added: {new Date(website.dateAdded).toLocaleDateString()}</div>
        <Button size="sm" variant="outline" asChild>
          <a href={website.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
            Visit <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  ))
}
