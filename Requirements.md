# CLAUDE.md

## Project Name

**School for the Daring**

## Overview

A motivational real estate school initiative landing page that captures student leads, validates their emails, and provides admin export functionality. Designed with a bold portfolio-style UI and subtle motivational copy inspired by brands like Redbull, Nike, and Adidas. Built with **Next.js** and **SQLite (via Prisma)**, with the ability to export data into CSV or Excel.

Students are encouraged to _“Fuel your hustle. Unlock your genius. Build the future you deserve.”_

---

## Base Functionality

1. **Landing Page UI**

   - Award-style, bold design.
   - Hero image background (real estate / success theme).
   - Motivational tagline and call to action.
   - Email + name capture form.

2. **Email Capture**

   - Save leads in **SQLite** database.
   - Throw error if email already exists.
   - Return success message when saved.

3. **Export Functionality**

   - Admin can download all leads as **CSV** or **Excel**.

4. **Scalable Design**
   - Uses Prisma ORM with SQLite (swap DB later if needed).
   - Modular API routes.

---

## Todo List (Step-by-Step)

### 1. Setup Project

- [ ] Initialize Next.js app
- [ ] Setup Git repo with `school-for-the-daring` as project name

### 2. Install Dependencies

- [ ] `sqlite3` for local DB
- [ ] `prisma` + `@prisma/client` for ORM
- [ ] `csv-writer` + `xlsx` for export

### 3. Database Setup

- [ ] Initialize Prisma
- [ ] Create `Lead` model with `id`, `email`, `name`, `createdAt`
- [ ] Run migration to apply schema

### 4. API Routes

- [ ] `/api/lead` → Create lead with validation
- [ ] `/api/export` → Export CSV/Excel

### 5. Landing Page UI

- [ ] Hero section with background image
- [ ] Motivational tagline + CTA form
- [ ] Capture user email + name
- [ ] Handle duplicate error gracefully

### 6. Admin Export Page

- [ ] Create `/export` page
- [ ] Add buttons: _Download CSV_, _Download Excel_

### 7. Test & Polish

- [ ] Test lead creation with duplicate email
- [ ] Test CSV/Excel export
- [ ] Add responsive design polish
- [ ] Add subtle animations

---

## Final Vision

The **School for the Daring** will not just be a landing page, but a motivational funnel. It captures daring students ready to learn real estate success moves, equips them with resources, and stores their journey securely for future engagement.
