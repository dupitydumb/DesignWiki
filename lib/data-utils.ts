import { cache } from "react"

export interface Website {
  id: string
  title: string
  url: string
  description: string
  category: string
  tags: string[]
  dateAdded: string
  featured?: boolean
  pricing?: "free" | "paid" | "trial" | "limited" // Added pricing field
}

export interface Category {
  id: string
  name: string
  description: string
}

// Base GitHub URL for data files
const GITHUB_BASE_URL = "https://raw.githubusercontent.com/dupitydumb/wiki-data/refs/heads/main/data"

// Cache the fetch requests to avoid unnecessary network calls
const fetchWithCache = cache(async (url: string) => {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }) // Revalidate every hour
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error)
    return null
  }
})

// Helper function to get all categories
export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchWithCache(`${GITHUB_BASE_URL}/categories.json`)
  return data || []
}

// Helper function to get websites by category
export async function getWebsitesByCategory(category: string): Promise<Website[]> {
  const data = await fetchWithCache(`${GITHUB_BASE_URL}/${category}.json`)
  return data || []
}

// Helper function to get all websites
export async function getAllWebsites(): Promise<Website[]> {
  const categories = await getAllCategories()
  const websitePromises = categories.map((category) => getWebsitesByCategory(category.id))
  const websiteArrays = await Promise.all(websitePromises)
  return websiteArrays.flat()
}

// Helper function to get a single website by ID
export async function getWebsiteById(id: string): Promise<Website | undefined> {
  const allWebsites = await getAllWebsites()
  return allWebsites.find((website) => website.id === id)
}

// Helper function to get featured websites
export async function getFeaturedWebsites(): Promise<Website[]> {
  const allWebsites = await getAllWebsites()
  return allWebsites.filter((website) => website.featured)
}

// Helper function to get the count of websites in each category
export async function getCategoryCount(categoryId: string): Promise<number> {
  const websites = await getWebsitesByCategory(categoryId)
  return websites.length
}

// Helper function to get pricing tag details
export function getPricingTagDetails(pricing?: string) {
  switch (pricing) {
    case "free":
      return {
        label: "Free",
        className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      }
    case "paid":
      return {
        label: "Paid",
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      }
    case "trial":
      return {
        label: "Trial",
        className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      }
    case "limited":
      return {
        label: "Limited",
        className: "bg-slate-500/10 text-slate-500 border-slate-500/20",
      }
    default:
      return null
  }
}
