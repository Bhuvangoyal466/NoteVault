import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  showFavorites: boolean;
  onFavoritesChange: (show: boolean) => void;
  availableTags: string[];
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  showFavorites,
  onFavoritesChange,
  availableTags,
}: SearchFiltersProps) {
  const commonTags = ["Work", "Personal", "Ideas", "Development", "Health", "Travel", "Books", "Food"];
  const displayTags = [...new Set([...commonTags, ...availableTags])];

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedTag && !showFavorites ? "default" : "outline"}
              size="sm"
              onClick={() => {
                onTagChange("");
                onFavoritesChange(false);
              }}
              className={!selectedTag && !showFavorites ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              All
            </Button>
            {displayTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onTagChange(selectedTag === tag ? "" : tag);
                  onFavoritesChange(false);
                }}
                className={selectedTag === tag ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {tag}
              </Button>
            ))}
            <Button
              variant={showFavorites ? "default" : "outline"}
              size="sm"
              onClick={() => {
                onFavoritesChange(!showFavorites);
                onTagChange("");
              }}
              className={showFavorites ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <Star className="mr-1 h-4 w-4" />
              Favorites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
