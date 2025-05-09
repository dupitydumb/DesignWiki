import Link from "next/link"
import { ArrowLeft, FileJson } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingBadge } from "@/components/pricing-badge"

// Import the example data
import exampleData from "@/lib/data/example-data.json"

interface ExamplePageProps {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ExamplePage({ params, searchParams }: ExamplePageProps) {
  // Await the params and searchParams
  await params
  await searchParams

  return (
    <main className="container py-8 md:py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-500 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Example Data Format</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">
          Reference for the JSON data structure used in this wiki
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-500 mb-4">
              <FileJson className="h-6 w-6" />
            </div>
            <CardTitle>JSON Data Structure</CardTitle>
            <CardDescription>The format used for website data in this wiki</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Each category has its own JSON file containing an array of website objects. Each website object must
              follow the structure shown in the example below.
            </p>
            <p className="text-muted-foreground mb-4">
              The example data includes all required and optional fields, with examples of different pricing models,
              featured status, and various tags.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://github.com/dupitydumb/wiki-data/blob/main/data/example-data.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  View Example on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Field Descriptions</CardTitle>
            <CardDescription>Required and optional fields for website entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Required Fields</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>
                    <strong>id</strong>: Unique identifier (string)
                  </li>
                  <li>
                    <strong>title</strong>: Website name (string)
                  </li>
                  <li>
                    <strong>url</strong>: Full URL with https:// (string)
                  </li>
                  <li>
                    <strong>description</strong>: Brief description (string)
                  </li>
                  <li>
                    <strong>category</strong>: Category ID (string)
                  </li>
                  <li>
                    <strong>tags</strong>: Array of tag strings (array)
                  </li>
                  <li>
                    <strong>dateAdded</strong>: Date in YYYY-MM-DD format (string)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-1">Optional Fields</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>
                    <strong>featured</strong>: Whether to highlight the website (boolean)
                  </li>
                  <li>
                    <strong>pricing</strong>: Pricing model (string: "free", "paid", "trial", or "limited")
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-1">Pricing Options</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <PricingBadge pricing="free" />
                  <PricingBadge pricing="paid" />
                  <PricingBadge pricing="trial" />
                  <PricingBadge pricing="limited" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Example Data Preview</h2>

        <Tabs defaultValue="json" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="json">JSON Format</TabsTrigger>
            <TabsTrigger value="preview">Visual Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="json">
            <Card>
              <CardContent className="p-6 overflow-auto">
                <pre className="text-xs md:text-sm bg-muted p-4 rounded-md overflow-auto max-h-[500px]">
                  {JSON.stringify(exampleData, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleData.slice(0, 6).map((website) => (
                <Card key={website.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        <CardTitle className="text-xl">{website.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {website.pricing && <PricingBadge pricing={website.pricing} />}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">{website.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {website.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full border border-border bg-background">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
