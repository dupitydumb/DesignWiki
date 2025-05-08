import Link from "next/link"
import { BookOpen, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-6 md:py-8">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">WebsiteWiki</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/excel-integration" className="text-sm text-muted-foreground hover:text-foreground">
            Excel Integration
          </Link>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
      <div className="container border-t py-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} WebsiteWiki. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
