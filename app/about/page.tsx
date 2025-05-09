import Link from "next/link"
import { ArrowLeft, FileSpreadsheet, Github, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AboutPageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function AboutPage({ params, searchParams }: AboutPageProps) {
  return (
    <main className="container py-8 md:py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-500 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">About Website Wiki</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">Learn more about this project and how it works</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-500 mb-4">
              <Info className="h-6 w-6" />
            </div>
            <CardTitle>What is Website Wiki?</CardTitle>
            <CardDescription>A curated collection of useful websites organized by category</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Website Wiki is a Next.js-based platform designed to catalog useful websites across various categories. It
              provides an easy way to discover and explore tools and resources for different purposes.
            </p>
            <p className="text-muted-foreground">
              The wiki is organized into categories like Design Tools, 3D Tools, Game Dev Tools, AI Tools, Productivity,
              and Learning Resources to help you find exactly what you need.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-500 mb-4">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <CardTitle>GitHub Integration</CardTitle>
            <CardDescription>How we manage website data using GitHub</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Website Wiki now fetches data directly from a GitHub repository. This allows for easy updates and
              contributions without requiring a redeploy of the application.
            </p>
            <p className="text-muted-foreground mb-4">
              The data is organized in JSON files by category, making it easy to maintain and update specific sections
              independently.
            </p>
            <Button asChild className="mt-2">
              <Link href="/excel-integration">Learn about data management</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Technical Details</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow">
            <h3 className="font-medium mb-2">Built with Next.js</h3>
            <p className="text-sm text-muted-foreground">
              This wiki is built using Next.js App Router, providing fast page loads and a smooth user experience.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow">
            <h3 className="font-medium mb-2">Dynamic Data</h3>
            <p className="text-sm text-muted-foreground">
              Data is fetched directly from GitHub, allowing for real-time updates without redeploying the application.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow">
            <h3 className="font-medium mb-2">Responsive Design</h3>
            <p className="text-sm text-muted-foreground">
              Fully responsive layout that works well on desktop, tablet, and mobile devices.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg" asChild>
          <a
            href="https://github.com/dupitydumb/wiki-data"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Github className="mr-2 h-5 w-5" />
            View on GitHub
          </a>
        </Button>
      </div>
    </main>
  )
}
