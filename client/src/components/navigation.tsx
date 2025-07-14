import { Link, useLocation } from "wouter";
import { Bookmark, Home, StickyNote, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navigation() {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { path: "/", label: "Notes", icon: StickyNote },
    { path: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  ];

  const isActive = (path: string) => {
    if (path === "/" && (location === "/" || location === "/notes")) return true;
    return location === path;
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-2 py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.path} href={item.path}>
                <div className={`flex flex-col items-center py-2 transition-colors ${
                  isActive(item.path) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}>
                  <IconComponent className="h-6 w-6 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Bookmark className="text-blue-600 h-6 w-6" />
                <span className="text-xl font-semibold text-gray-900">NotesBook</span>
              </div>
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path) 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}>
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
