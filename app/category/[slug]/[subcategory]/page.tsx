import Link from "next/link"
import { ArrowLeft, ExternalLink, Star } from "lucide-react"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryById, getWebsitesBySubcategory } from "@/lib/data-utils"
import { PricingBadge } from "@/components/pricing-badge"

interface SubcategoryPageProps {
  params: Promise<{ slug: string; subcategory: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SubcategoryPage({ params, searchParams }: SubcategoryPageProps) {
  const resolvedParams = await params
  const { slug, subcategory } = resolvedParams

  const category = await getCategoryById(slug)

  if (!category) {
    notFound()
  }

  const subcategoryData = category.subcategories?.find((sub) => sub.id === subcategory)

  if (!subcategoryData) {
    notFound()
  }

  const websites = await getWebsitesBySubcategory(slug, subcategory)

  return (
    <main className="container py-8 md:py-12">
      <div className="mb-8">
        <Link
          href={`/category/${slug}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-500 mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to {category.name}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{subcategoryData.name}</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">{subcategoryData.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((website) => (
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
              <div className="text-xs text-muted-foreground">
                Added: {new Date(website.dateAdded).toLocaleDateString()}
              </div>
              <Button size="sm" variant="outline" asChild>
                <a href={website.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  Visit <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {websites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No websites found in this subcategory.</p>
          <Button asChild>
            <Link href={`/category/${slug}`}>Back to {category.name}</Link>
          </Button>
        </div>
      )}
    </main>
  )
}
