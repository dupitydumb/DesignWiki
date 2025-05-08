"use client"

import Link from "next/link"
import { BookOpen, Github, Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-bold">WebsiteWiki</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-blue-500">
            About
          </Link>
          <Link href="/excel-integration" className="text-sm font-medium transition-colors hover:text-blue-500">
            Excel Integration
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/excel-integration"
                className="text-sm font-medium transition-colors hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Excel Integration
              </Link>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
