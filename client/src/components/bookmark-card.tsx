import { formatDistanceToNow } from "date-fns";
import { Star, MoreHorizontal, Edit, Trash2, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Bookmark } from "@shared/schema";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
  onEdit: (bookmark: Bookmark) => void;
}

export default function BookmarkCard({ bookmark, onDelete, onToggleFavorite, onEdit }: BookmarkCardProps) {
  const tagColors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800", 
    "bg-purple-100 text-purple-800",
    "bg-orange-100 text-orange-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-indigo-100 text-indigo-800",
  ];

  const getTagColor = (index: number) => tagColors[index % tagColors.length];

  const handleOpenUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(bookmark.url, '_blank');
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe className="h-6 w-6 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
                {bookmark.title}
              </h3>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(bookmark.id, bookmark.isFavorite);
                  }}
                  className={`h-8 w-8 ${bookmark.isFavorite ? "text-green-600" : "text-gray-400 hover:text-green-600"}`}
                >
                  <Star className={`h-4 w-4 ${bookmark.isFavorite ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleOpenUrl}
                  className="h-8 w-8 text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onEdit(bookmark);
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(bookmark.id);
                      }}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {bookmark.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {bookmark.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {bookmark.tags.map((tag, index) => (
                  <Badge key={tag} variant="secondary" className={`text-xs ${getTagColor(index)}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
