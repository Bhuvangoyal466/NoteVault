import { notes, bookmarks, type Note, type Bookmark, type InsertNote, type InsertBookmark } from "@shared/schema";

export interface IStorage {
  // Notes
  getAllNotes(): Promise<Note[]>;
  getNoteById(id: number): Promise<Note | undefined>;
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: number, note: Partial<InsertNote>): Promise<Note | undefined>;
  deleteNote(id: number): Promise<boolean>;
  searchNotes(query: string): Promise<Note[]>;
  getNotesByTag(tag: string): Promise<Note[]>;
  getFavoriteNotes(): Promise<Note[]>;

  // Bookmarks
  getAllBookmarks(): Promise<Bookmark[]>;
  getBookmarkById(id: number): Promise<Bookmark | undefined>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  updateBookmark(id: number, bookmark: Partial<InsertBookmark>): Promise<Bookmark | undefined>;
  deleteBookmark(id: number): Promise<boolean>;
  searchBookmarks(query: string): Promise<Bookmark[]>;
  getBookmarksByTag(tag: string): Promise<Bookmark[]>;
  getFavoriteBookmarks(): Promise<Bookmark[]>;
}

export class MemStorage implements IStorage {
  private notes: Map<number, Note>;
  private bookmarks: Map<number, Bookmark>;
  private currentNoteId: number;
  private currentBookmarkId: number;

  constructor() {
    this.notes = new Map();
    this.bookmarks = new Map();
    this.currentNoteId = 1;
    this.currentBookmarkId = 1;
  }

  // Notes methods
  async getAllNotes(): Promise<Note[]> {
    return Array.from(this.notes.values()).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const now = new Date();
    const note: Note = {
      ...insertNote,
      id: this.currentNoteId++,
      tags: insertNote.tags || [],
      isFavorite: insertNote.isFavorite || false,
      createdAt: now,
      updatedAt: now,
    };
    this.notes.set(note.id, note);
    return note;
  }

  async updateNote(id: number, updateData: Partial<InsertNote>): Promise<Note | undefined> {
    const existingNote = this.notes.get(id);
    if (!existingNote) return undefined;

    const updatedNote: Note = {
      ...existingNote,
      ...updateData,
      updatedAt: new Date(),
    };
    this.notes.set(id, updatedNote);
    return updatedNote;
  }

  async deleteNote(id: number): Promise<boolean> {
    return this.notes.delete(id);
  }

  async searchNotes(query: string): Promise<Note[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.notes.values()).filter(note =>
      note.title.toLowerCase().includes(lowercaseQuery) ||
      note.content.toLowerCase().includes(lowercaseQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async getNotesByTag(tag: string): Promise<Note[]> {
    return Array.from(this.notes.values()).filter(note =>
      note.tags.some(noteTag => noteTag.toLowerCase() === tag.toLowerCase())
    ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async getFavoriteNotes(): Promise<Note[]> {
    return Array.from(this.notes.values()).filter(note => note.isFavorite)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  // Bookmarks methods
  async getAllBookmarks(): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBookmarkById(id: number): Promise<Bookmark | undefined> {
    return this.bookmarks.get(id);
  }

  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const now = new Date();
    const bookmark: Bookmark = {
      ...insertBookmark,
      id: this.currentBookmarkId++,
      description: insertBookmark.description || null,
      tags: insertBookmark.tags || [],
      isFavorite: insertBookmark.isFavorite || false,
      createdAt: now,
      updatedAt: now,
    };
    this.bookmarks.set(bookmark.id, bookmark);
    return bookmark;
  }

  async updateBookmark(id: number, updateData: Partial<InsertBookmark>): Promise<Bookmark | undefined> {
    const existingBookmark = this.bookmarks.get(id);
    if (!existingBookmark) return undefined;

    const updatedBookmark: Bookmark = {
      ...existingBookmark,
      ...updateData,
      updatedAt: new Date(),
    };
    this.bookmarks.set(id, updatedBookmark);
    return updatedBookmark;
  }

  async deleteBookmark(id: number): Promise<boolean> {
    return this.bookmarks.delete(id);
  }

  async searchBookmarks(query: string): Promise<Bookmark[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.bookmarks.values()).filter(bookmark =>
      bookmark.title.toLowerCase().includes(lowercaseQuery) ||
      (bookmark.description && bookmark.description.toLowerCase().includes(lowercaseQuery)) ||
      bookmark.url.toLowerCase().includes(lowercaseQuery) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBookmarksByTag(tag: string): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(bookmark =>
      bookmark.tags.some(bookmarkTag => bookmarkTag.toLowerCase() === tag.toLowerCase())
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getFavoriteBookmarks(): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(bookmark => bookmark.isFavorite)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const storage = new MemStorage();
