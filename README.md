# 🗂️ NoteVault

A lightweight personal notes and bookmarks manager built using **Next.js (TypeScript)**, **Tailwind CSS**, and **shadcn/ui** — no backend or database required.

---

## 🚀 Personal Notes & Bookmark Manager

Manage personal notes and bookmarks with tagging, search, filtering, and clean UI. Fully client-side, ideal for personal use.

---

## 🛠️ Tech Stack

- **Next.js** (TypeScript)
- **Tailwind CSS**
- **shadcn/ui components**

---

## 📦 Features

- Create, update, and delete notes & bookmarks  
- Filter by tags or search keywords  
- Auto-fetch bookmark title from URL (bonus)  
- Fully client-side — no backend or database  
- Responsive & clean UI  

---

## ▶️ Getting Started

```bash
npm install
npm run dev


✅ 1. Notes & Bookmarks CRUD
Create, Update, Delete operations done using React state.

Data is probably stored in localStorage or in-memory, since no DB/server is used.

Shadcn modals or dialogs used for forms.

🔍 2. Search & Filter
Implemented using Array.filter() on title, description, and tags.

Search bar filters results in real-time.

Tag buttons or dropdowns help filter by selected tags.

🌐 3. Auto-fetch Bookmark Title (Bonus)
If user enters just a URL → app fetches metadata (maybe using fetch + DOMParser or Open Graph scraping via client).

Then sets the title automatically if empty.

🖥️ 4. Clean UI with shadcn/ui + Tailwind
Used Tailwind for layout + spacing.

Shadcn components like Card, Dialog, Input, and Badge for fast, consistent UI.

Fully responsive using utility classes.

