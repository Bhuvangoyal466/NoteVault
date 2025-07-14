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
import { insertNoteSchema } from "@shared/schema";
import type { Note } from "@shared/schema";
import { z } from "zod";

interface NoteFormProps {
  note?: Note | null;
  onClose: () => void;
}

export default function NoteForm({ note, onClose }: NoteFormProps) {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(insertNoteSchema.extend({
      tags: z.union([z.array(z.string()), z.string()]).transform((val) => {
        if (typeof val === 'string') {
          return val.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        }
        return val;
      })
    })),
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
      tags: note?.tags || [],
      isFavorite: note?.isFavorite || false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (note) {
        return apiRequest("PUT", `/api/notes/${note.id}`, data);
      } else {
        return apiRequest("POST", "/api/notes", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      toast({
        title: note ? "Note updated successfully" : "Note created successfully",
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save note",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter note title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your note here..."
                  rows={6}
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
            {mutation.isPending ? "Saving..." : "Save Note"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
