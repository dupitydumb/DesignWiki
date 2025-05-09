"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Save, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Category, SubCategory } from "@/lib/data-utils"

export default function SubcategoryEditorPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "ai-tools",
      name: "AI Tools",
      description: "Artificial intelligence tools and platforms for various applications",
      subcategories: [
        {
          id: "image-generation",
          name: "Image Generation",
          description: "AI tools for creating and editing images",
        },
        {
          id: "video-generation",
          name: "Video Generation",
          description: "AI tools for creating and editing videos",
        },
        {
          id: "voice-generation",
          name: "Voice Generation",
          description: "AI tools for creating and modifying voice and audio",
        },
      ],
    },
    {
      id: "design-tools",
      name: "Design Tools",
      description: "Tools for graphic design, UI/UX, and visual creation",
      subcategories: [
        {
          id: "ui-design",
          name: "UI Design",
          description: "Tools for creating user interfaces",
        },
        {
          id: "graphic-design",
          name: "Graphic Design",
          description: "Tools for creating graphics and illustrations",
        },
      ],
    },
  ])

  const [activeCategory, setActiveCategory] = useState("ai-tools")
  const [newSubcategory, setNewSubcategory] = useState<SubCategory>({
    id: "",
    name: "",
    description: "",
  })

  const handleAddSubcategory = () => {
    if (!newSubcategory.id || !newSubcategory.name || !newSubcategory.description) {
      alert("Please fill in all fields")
      return
    }

    setCategories(
      categories.map((category) => {
        if (category.id === activeCategory) {
          return {
            ...category,
            subcategories: [...(category.subcategories || []), newSubcategory],
          }
        }
        return category
      }),
    )

    setNewSubcategory({
      id: "",
      name: "",
      description: "",
    })
  }

  const handleRemoveSubcategory = (subcategoryId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === activeCategory) {
          return {
            ...category,
            subcategories: category.subcategories?.filter((sub) => sub.id !== subcategoryId),
          }
        }
        return category
      }),
    )
  }

  const handleUpdateSubcategory = (index: number, field: keyof SubCategory, value: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === activeCategory && category.subcategories) {
          const updatedSubcategories = [...category.subcategories]
          updatedSubcategories[index] = {
            ...updatedSubcategories[index],
            [field]: value,
          }
          return {
            ...category,
            subcategories: updatedSubcategories,
          }
        }
        return category
      }),
    )
  }

  const handleGenerateJSON = () => {
    const json = JSON.stringify(categories, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "categories.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleIdFromName = () => {
    if (newSubcategory.name) {
      setNewSubcategory({
        ...newSubcategory,
        id: newSubcategory.name.toLowerCase().replace(/\s+/g, "-"),
      })
    }
  }

  const activeTab = categories.find((cat) => cat.id === activeCategory)

  return (
    <main className="container py-8 md:py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-500 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Subcategory Editor</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">
          Create and manage subcategories for each main category
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Select a category to edit its subcategories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {category.subcategories?.length || 0} subcategories
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Export JSON</CardTitle>
              <CardDescription>Generate JSON file with all categories and subcategories</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateJSON} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="subcategories">
            <TabsList className="mb-4">
              <TabsTrigger value="subcategories">Existing Subcategories</TabsTrigger>
              <TabsTrigger value="add">Add New Subcategory</TabsTrigger>
            </TabsList>

            <TabsContent value="subcategories">
              <Card>
                <CardHeader>
                  <CardTitle>{activeTab?.name} Subcategories</CardTitle>
                  <CardDescription>Edit or remove existing subcategories</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeTab?.subcategories && activeTab.subcategories.length > 0 ? (
                    <div className="space-y-6">
                      {activeTab.subcategories.map((subcategory, index) => (
                        <div key={subcategory.id} className="p-4 border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium">{subcategory.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSubcategory(subcategory.id)}
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`subcategory-${index}-id`}>ID</Label>
                              <Input
                                id={`subcategory-${index}-id`}
                                value={subcategory.id}
                                onChange={(e) => handleUpdateSubcategory(index, "id", e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`subcategory-${index}-name`}>Name</Label>
                              <Input
                                id={`subcategory-${index}-name`}
                                value={subcategory.name}
                                onChange={(e) => handleUpdateSubcategory(index, "name", e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`subcategory-${index}-description`}>Description</Label>
                              <Textarea
                                id={`subcategory-${index}-description`}
                                value={subcategory.description}
                                onChange={(e) => handleUpdateSubcategory(index, "description", e.target.value)}
                                className="mt-1"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No subcategories found for this category.</p>
                      <Button
                        onClick={() => document.querySelector('[value="add"]')?.dispatchEvent(new MouseEvent("click"))}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Subcategory
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Subcategory to {activeTab?.name}</CardTitle>
                  <CardDescription>Create a new subcategory for this category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="new-subcategory-name">Name</Label>
                      <Input
                        id="new-subcategory-name"
                        value={newSubcategory.name}
                        onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                        onBlur={handleIdFromName}
                        className="mt-1"
                        placeholder="e.g., Image Generation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-subcategory-id">ID</Label>
                      <Input
                        id="new-subcategory-id"
                        value={newSubcategory.id}
                        onChange={(e) => setNewSubcategory({ ...newSubcategory, id: e.target.value })}
                        className="mt-1"
                        placeholder="e.g., image-generation"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use lowercase with hyphens, no spaces. Will be auto-generated from name if left empty.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="new-subcategory-description">Description</Label>
                      <Textarea
                        id="new-subcategory-description"
                        value={newSubcategory.description}
                        onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                        className="mt-1"
                        rows={3}
                        placeholder="Brief description of this subcategory"
                      />
                    </div>
                    <Button onClick={handleAddSubcategory} className="w-full mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Subcategory
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">JSON Preview</h2>
        <Card>
          <CardContent className="p-6 overflow-auto">
            <pre className="text-xs md:text-sm bg-muted p-4 rounded-md overflow-auto max-h-[500px]">
              {JSON.stringify(categories, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
