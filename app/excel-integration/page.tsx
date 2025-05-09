import Link from "next/link"
import { ArrowLeft, Download, FileSpreadsheet, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataManagementPageProps {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ExcelIntegrationPage({ params, searchParams }: DataManagementPageProps) {
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

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Data Management</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">Learn how website data is managed through GitHub</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-500 mb-4">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <CardTitle>How Data Management Works</CardTitle>
            <CardDescription>Understanding the data flow from GitHub to the wiki</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The Website Wiki now fetches data directly from a GitHub repository. This allows for easy updates without
              requiring a redeploy of the application.
            </p>
            <p className="text-muted-foreground mb-4">
              When you visit the site, it automatically fetches the latest data from the GitHub repository, ensuring you
              always see the most up-to-date information.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://github.com/dupitydumb/wiki-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  View Data Repository
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-500 mb-4">
              <Upload className="h-6 w-6" />
            </div>
            <CardTitle>Contributing Data</CardTitle>
            <CardDescription>How to add and update website entries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              To add new websites to the wiki, you can contribute to the GitHub repository by submitting pull requests
              with updated JSON files.
            </p>
            <p className="text-muted-foreground mb-4">
              Each category has its own JSON file, making it easy to update specific sections without affecting others.
            </p>
            <div className="mt-4 space-y-2">
              <Button className="w-full" asChild>
                <a
                  href="https://github.com/dupitydumb/wiki-data/blob/main/data/3d-tools.json"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Sample JSON File
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                See how the data is structured in the repository
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">JSON Structure</h2>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-6">
              Each category JSON file should follow this structure to ensure proper integration with the wiki:
            </p>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">id</TableCell>
                    <TableCell>Unique identifier for the website</TableCell>
                    <TableCell>figma</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">title</TableCell>
                    <TableCell>Name of the website</TableCell>
                    <TableCell>Figma</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">url</TableCell>
                    <TableCell>Full URL including https://</TableCell>
                    <TableCell>https://figma.com</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">description</TableCell>
                    <TableCell>Brief description of the website</TableCell>
                    <TableCell>Collaborative interface design tool</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">category</TableCell>
                    <TableCell>Category ID (must match existing categories)</TableCell>
                    <TableCell>design-tools</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">tags</TableCell>
                    <TableCell>Array of tags</TableCell>
                    <TableCell>["design", "collaboration", "prototyping"]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">dateAdded</TableCell>
                    <TableCell>Date in YYYY-MM-DD format</TableCell>
                    <TableCell>2023-01-15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">featured</TableCell>
                    <TableCell>Boolean to mark as featured</TableCell>
                    <TableCell>true</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">pricing</TableCell>
                    <TableCell>Pricing model of the website</TableCell>
                    <TableCell>"free", "paid", "trial", or "limited"</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Implementation Details</h2>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-6">
              The GitHub integration is implemented using the following technologies:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-medium mb-2">Frontend</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Next.js for the web application</li>
                  <li>• React Server Components for data fetching</li>
                  <li>• Tailwind CSS for styling</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-medium mb-2">Data Fetching</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• GitHub Raw Content for JSON data</li>
                  <li>• Next.js fetch with revalidation</li>
                  <li>• React cache for optimized fetching</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
