import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { insertBookmarkSchema } from "@shared/schema";
import type { Bookmark } from "@shared/schema";

interface BookmarkFormProps {
  bookmark?: Bookmark | null;
  onClose: () => void;
}

export default function BookmarkForm({ bookmark, onClose }: BookmarkFormProps) {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(insertBookmarkSchema),
    defaultValues: {
      title: bookmark?.title || "",
      url: bookmark?.url || "",
      description: bookmark?.description || "",
      tags: bookmark?.tags || [],
      isFavorite: bookmark?.isFavorite || false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (bookmark) {
        return apiRequest("PUT", `/api/bookmarks/${bookmark.id}`, data);
      } else {
        return apiRequest("POST", "/api/bookmarks", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
      toast({
        title: bookmark ? "Bookmark updated successfully" : "Bookmark created successfully",
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save bookmark",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    // Parse tags from comma-separated string
    const tagsString = data.tags;
    const tags = typeof tagsString === 'string' 
      ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : tagsString;
    
    mutation.mutate({ ...data, tags });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Leave empty to auto-fetch from URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional description..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tags separated by commas..."
                  value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-700">
            {mutation.isPending ? "Saving..." : "Save Bookmark"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
