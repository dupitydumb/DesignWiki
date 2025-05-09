"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Category, Website } from "@/lib/data-utils"

interface CategorySidebarProps {
  category: Category
  websites: Website[]
}

export function CategorySidebar({ category, websites }: CategorySidebarProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Count websites in each subcategory
  const subcategoryCounts: Record<string, number> = {}

  if (category.subcategories) {
    category.subcategories.forEach((subcategory) => {
      subcategoryCounts[subcategory.id] = websites.filter((website) => website.subcategory === subcategory.id).length
    })
  }

  // Count uncategorized websites
  const uncategorizedCount = websites.filter((website) => !website.subcategory).length

  // Set active subcategory based on hash in URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveSubcategory(hash)

        // Scroll to the section
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    // Initial check
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleSubcategoryClick = (subcategoryId: string) => {
    setActiveSubcategory(subcategoryId)
    setIsOpen(false) // Close mobile sidebar if open

    // Update URL hash without page reload
    window.history.pushState(null, "", `#${subcategoryId}`)

    // Scroll to the section
    const element = document.getElementById(subcategoryId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const sidebarContent = (
    <div className="space-y-2">
      <div className="font-medium text-sm text-muted-foreground mb-4">SUBCATEGORIES</div>
      {category.subcategories?.map((subcategory) => (
        <Button
          key={subcategory.id}
          variant="ghost"
          className={cn(
            "w-full justify-start text-left font-normal",
            activeSubcategory === subcategory.id && "bg-muted font-medium",
          )}
          onClick={() => handleSubcategoryClick(subcategory.id)}
        >
          {subcategory.name}
          {subcategoryCounts[subcategory.id] > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {subcategoryCounts[subcategory.id]}
            </Badge>
          )}
        </Button>
      ))}

      {uncategorizedCount > 0 && (
        <>
          <Separator className="my-4" />
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal",
              activeSubcategory === "uncategorized" && "bg-muted font-medium",
            )}
            onClick={() => handleSubcategoryClick("uncategorized")}
          >
            Uncategorized
            <Badge variant="secondary" className="ml-auto">
              {uncategorizedCount}
            </Badge>
          </Button>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <Card className="sticky top-20 hidden lg:block">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Browse {category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-220px)]">{sidebarContent}</ScrollArea>
        </CardContent>
      </Card>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden mb-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <Menu className="h-4 w-4 mr-2" />
                Browse Subcategories
              </div>
              {activeSubcategory && (
                <Badge variant="secondary">
                  {activeSubcategory === "uncategorized"
                    ? "Uncategorized"
                    : category.subcategories?.find((s) => s.id === activeSubcategory)?.name}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">Browse {category.name}</h3>
              {sidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
