# Kriscap Study Hub

# Frontend Architecture Documentation v2.0

---

# 1. Frontend Vision

## Objective

The frontend must communicate:

Trust

Authority

Professionalism

Student Success

Reliability

The website should feel closer to a modern educational institution than an e-commerce store.

A visitor should immediately think:

"This organization looks legitimate and capable of helping me succeed."

---

# 2. Design Philosophy

## Trust First

Every screen must answer:

* Who are you?
* Why should I trust you?
* How can you help me?
* How do I contact you?

---

## Conversion Through Confidence

Do not use aggressive sales tactics.

Instead use:

* Real student stories
* Verified statistics
* Transparent pricing
* Easy support access
* Clear explanations

---

## Mobile First

Most students will visit from mobile devices.

All layouts should be designed for:

* 360px width
* Touch interactions
* Fast loading
* Thumb-friendly navigation

---

# 3. Technology Stack

## Core

React 19

TypeScript

Vite

---

## Routing

React Router

---

## State Management

TanStack Query

React Context

---

## Authentication

Clerk

---

## UI

shadcn/ui

Radix UI

Tailwind CSS

---

## Animation

Framer Motion

---

## Forms

React Hook Form

Zod Validation

---

## Icons

Lucide React

---

# 4. Frontend Architecture

## Architecture Pattern

Feature Based Architecture

```text
src/

├── app/
├── routes/
├── layouts/
├── features/
├── shared/
├── hooks/
├── services/
├── contexts/
├── providers/
├── types/
├── assets/
└── utils/
```

---

# 5. Folder Structure

```text
src/

├── app/
│
├── layouts/
│   ├── PublicLayout
│   ├── StudentLayout
│   └── AdminLayout
│
├── features/
│
│   ├── auth/
│   ├── home/
│   ├── products/
│   ├── orders/
│   ├── downloads/
│   ├── profile/
│   ├── courses/
│   ├── classes/
│   ├── support/
│   ├── cms/
│   └── admin/
│
├── shared/
│   ├── ui/
│   ├── components/
│   ├── constants/
│   └── types/
│
├── services/
│
├── hooks/
│
├── providers/
│
└── contexts/
```

---

# 6. Routing Strategy

## Public Routes

```text
/

/about

/courses

/store

/contact

/admission

/blog

/faq
```

---

## Student Routes

```text
/dashboard

/downloads

/orders

/profile

/classes

/notifications
```

---

## Admin Routes

```text
/admin

/admin/products

/admin/orders

/admin/users

/admin/analytics

/admin/content

/admin/settings
```

---

# 7. Layout System

## Public Layout

Contains:

Navigation

Main Content

Footer

WhatsApp Button

Announcement Bar

---

## Student Layout

Contains:

Sidebar

Top Navigation

Notification Center

Content Area

---

## Admin Layout

Contains:

Sidebar

Search

Notifications

Admin Profile

Dashboard Area

---

# 8. Homepage Experience

## Hero Section

Must contain:

Headline

Subheadline

Primary CTA

Secondary CTA

Trust Indicators

Student Success Visual

---

## Trust Indicators

Visible immediately.

Examples:

5000+ Students

98% Success Rate

1200+ TMAs Delivered

24×7 Student Support

---

## Social Proof

Testimonials

Success Stories

Results

Reviews

Placed above the fold whenever possible.

---

# 9. Component Strategy

## Atomic Design

Atoms

```text
Button

Badge

Avatar

Input

Icon
```

---

## Molecules

```text
Product Card

Class Card

Statistic Card

Review Card
```

---

## Organisms

```text
Navbar

Hero

Product Grid

Footer

Dashboard Widgets
```

---

# 10. Product Experience

## Product Listing

Must support:

Search

Filters

Sorting

Pagination

Featured Products

Recommendations

---

## Product Card

Contains:

Thumbnail

Category

Title

Price

Discount

Rating

Download Count

CTA

---

## Product Detail Page

Contains:

Overview

Features

Preview Pages

Reviews

FAQs

Related Products

Support CTA

---

# 11. Checkout Experience

## Design Goal

Zero confusion.

---

## Checkout Flow

```text
Cart

↓

Address

↓

Payment

↓

Confirmation
```

---

## Trust Elements

Secure Payment Badge

Razorpay Verified

Refund Policy

Support Contact

---

# 12. Student Dashboard

## Goal

Students should feel progress.

---

## Dashboard Widgets

Progress Tracker

Upcoming Classes

Recent Downloads

Notifications

Recommended Resources

Achievements

---

## Empty States

Every empty state must provide:

Explanation

Illustration

CTA

Example:

"No Downloads Yet"

Button:

Browse Store

---

# 13. Admin Dashboard

## Visual Style

Modern SaaS

Minimal

Data Focused

---

## Components

KPI Cards

Revenue Charts

User Analytics

Order Management

Content Management

Audit Logs

---

# 14. State Management

## React Query

Used For

Products

Orders

Downloads

Analytics

Notifications

---

## Context API

Used For

Authentication

Theme

Cart

Socket Connection

---

# 15. API Layer

## Service Based Structure

```text
services/

auth.service.ts

product.service.ts

order.service.ts

payment.service.ts

download.service.ts
```

No API logic inside components.

---

# 16. Authentication Experience

## Clerk Integration

Features

Google Login

Email Login

OTP Login

Session Persistence

---

## Protected Routes

Redirect Strategy

Guest

→ Login

Authenticated

→ Requested Resource

---

# 17. Performance Requirements

## Lighthouse

Targets

Performance > 90

Accessibility > 95

SEO > 95

Best Practices > 95

---

## Optimization

Code Splitting

Image Optimization

Lazy Loading

Route Chunking

Caching

---

# 18. Accessibility

WCAG AA

Requirements

Keyboard Navigation

Focus States

Screen Readers

Color Contrast

ARIA Labels

---

# 19. SEO Requirements

Every page must include:

Title

Description

Open Graph Tags

Structured Data

Canonical URL

---

## Blog SEO

Schema Markup

FAQ Schema

Breadcrumb Schema

---

# 20. Motion Design

Animations should feel premium.

Allowed:

Fade

Slide

Scale

Count Up

Progress Animations

---

Avoid:

Excessive Bounce

Constant Floating

Heavy Effects

Animation Noise

---

# 21. Trust Signals

Critical Requirement

Every important page must include at least one trust signal.

Examples:

Student Reviews

Success Stories

Verified Statistics

Counselor Contact

WhatsApp Support

Secure Payments

Institution Information

---

# 22. Error Handling

User Friendly Messages

Bad:

"500 Internal Server Error"

Good:

"Something went wrong. Please try again or contact support."

---

# 23. Design Authenticity Rules

To avoid looking AI-generated:

Use real student photos.

Use real testimonials.

Use real statistics.

Use authentic content.

Avoid stock illustrations whenever possible.

Avoid generic marketing language.

Include founder message.

Include institution story.

Show real support contacts.

Display response times.

Display actual business information.

---

# 24. Future Ready Features

Architecture must support:

Courses

Live Classes

Subscriptions

Community

Discussion Forums

AI Study Assistant

Mobile App

Affiliate Program

Without major frontend restructuring.

---

# Final Goal

The frontend should feel like a trusted educational institution that helps students achieve academic success.

It should not feel like a PDF marketplace.

It should not feel like a template.

It should not feel AI-generated.

Every screen should increase confidence, reduce confusion, and guide students toward successful outcomes.
