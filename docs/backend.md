# Kriscap Study Hub

# Backend Architecture Documentation v2.0

---

# 1. Overview

Kriscap Study Hub Backend powers:

* Authentication
* User Management
* Product Catalog
* Digital Downloads
* Physical Orders
* Payments
* Course Management
* Live Classes
* Notifications
* CMS
* Analytics
* Admin Operations

The backend must be designed as a scalable service-oriented monolith capable of supporting future microservice extraction.

---

# 2. Technology Stack

## Runtime

Node.js LTS

---

## Framework

Express.js 5+

---

## Language

TypeScript

Reason:

* Type Safety
* Better Refactoring
* Enterprise Maintainability

---

## ORM

Prisma ORM

---

## Database

PostgreSQL

Hosted On:

* Neon
* Supabase
* AWS RDS

---

## Authentication

Clerk

Responsibilities:

* Sign Up
* Sign In
* Session Management
* Social Login
* OTP Verification

---

## Payments

Primary:

Razorpay

Future Support:

* Stripe
* Cashfree
* PayU

---

## File Storage

Cloudinary

or

AWS S3

Files are NEVER stored inside PostgreSQL.

Only URLs are stored.

---

## Email Service

Resend

Preferred

Fallback:

Nodemailer

---

## Realtime Layer

Socket.IO

Used For:

* Notifications
* Admin Updates
* Live Events

---

## Validation

Zod

---

## Logging

Pino

---

## API Documentation

Swagger OpenAPI

---

# 3. Architecture Style

## Modular Monolith

```text
Client

   │

API Gateway Layer

   │

Controllers

   │

Services

   │

Repositories

   │

Prisma ORM

   │

PostgreSQL
```

---

# 4. Backend Directory Structure

```text
src/

├── config/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── orders/
│   ├── payments/
│   ├── downloads/
│   ├── wishlist/
│   ├── courses/
│   ├── classes/
│   ├── notifications/
│   ├── support/
│   ├── cms/
│   ├── analytics/
│   └── admin/
│
├── middleware/
│
├── services/
│
├── repositories/
│
├── events/
│
├── jobs/
│
├── websocket/
│
├── utils/
│
├── validators/
│
├── app.ts
│
└── server.ts
```

---

# 5. Layer Responsibilities

## Controller Layer

Responsibilities:

* Receive Request
* Validate Input
* Call Services
* Return Response

Controllers must NOT contain business logic.

---

## Service Layer

Contains:

* Business Rules
* Workflows
* Permission Checks

Example:

Order Creation Logic

Payment Verification Logic

Download Access Logic

---

## Repository Layer

Responsible For:

* Prisma Queries
* Database Operations

Services never directly call Prisma.

---

# 6. Authentication Flow

## Clerk Integration

```text
User Login

      │

      ▼

Clerk Auth

      │

      ▼

JWT Token

      │

      ▼

Backend Verification

      │

      ▼

User Context Attached
```

---

# 7. User Synchronization

Webhook Endpoint

```text
/api/webhooks/clerk
```

Supported Events

```text
user.created

user.updated

user.deleted
```

Actions

```text
Create User

Update User

Delete User
```

---

# 8. Authorization System

## Roles

```text
USER

ADMIN

SUPER_ADMIN

INSTRUCTOR

SUPPORT
```

---

## Permission Examples

USER

```text
Buy Products

Download Purchases

Join Classes
```

ADMIN

```text
Manage Products

Manage Orders

Manage Users
```

SUPER_ADMIN

```text
Full Platform Access
```

---

# 9. API Standards

## Versioning

```text
/api/v1
```

Examples

```text
/api/v1/products

/api/v1/orders
```

---

## Success Response

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Unauthorized",
  "errors": []
}
```

---

# 10. Product Module

Responsibilities

* Catalog Management
* Search
* Filtering
* Featured Products
* Inventory Tracking

Endpoints

```text
GET /products

GET /products/:id

POST /products

PATCH /products/:id

DELETE /products/:id
```

---

# 11. Order Module

Responsibilities

* Checkout
* Order Tracking
* Digital Entitlements
* Shipping Management

Workflow

```text
Create Order

Payment

Verification

Fulfillment

Completion
```

---

# 12. Payment Module

## Create Payment

```text
POST /payments/create
```

Creates Razorpay Order.

---

## Verify Payment

```text
POST /payments/verify
```

Verifies:

```text
Order ID

Payment ID

Signature
```

---

## Security

HMAC SHA256 Verification Required

Never trust frontend payment status.

---

# 13. Digital Download System

Critical for educational platforms.

---

## Download Access Rules

User must:

```text
Own Product

Order Paid

Account Active
```

---

## Download Endpoint

```text
GET /downloads/:productId
```

---

## Features

Download Tracking

Download Limits

Analytics

Anti Abuse

---

# 14. Course Module

Future Ready

---

## Features

Course Catalog

Enrollments

Modules

Lessons

Progress Tracking

Certificates

---

# 15. Live Class Module

Features

```text
Upcoming Classes

Registration

Attendance

Meeting Links

Reminders
```

---

# 16. Notification Module

Types

```text
ORDER

DOWNLOAD

CLASS

PROMOTION

SYSTEM
```

Delivery Channels

```text
In App

Email

WhatsApp
```

---

# 17. CMS Module

Allows non-technical admins to update content.

Editable Sections

```text
Hero

FAQ

Testimonials

Blog

Homepage Statistics
```

No code deployment required.

---

# 18. Support Ticket System

Students can create support requests.

Workflow

```text
Open

Assigned

In Progress

Resolved

Closed
```

---

# 19. Analytics Module

Tracks:

```text
Page Views

Product Views

Downloads

Purchases

Class Registrations

Revenue
```

Events stored asynchronously.

---

# 20. Audit Logging

Every admin action must be recorded.

Examples

```text
Product Updated

User Suspended

Coupon Deleted

Order Refunded
```

Stored in AuditLog table.

---

# 21. File Upload Architecture

Files stored in:

Cloudinary

or

AWS S3

---

Database Stores

```text
fileUrl

previewUrl

thumbnailUrl
```

---

Upload Flow

```text
Admin Upload

Cloud Storage

Save URL

Return Asset Metadata
```

---

# 22. Security Standards

## Required

Helmet

Rate Limiting

CORS

Input Validation

Sanitization

JWT Verification

Webhook Signature Verification

Passwordless Authentication

---

## Admin Security

IP Logging

Audit Logs

Role Based Access

Session Tracking

---

# 23. Background Jobs

Using:

BullMQ + Redis

Tasks

```text
Send Emails

Generate Reports

Cleanup Jobs

Notification Delivery

Analytics Processing
```

---

# 24. Monitoring

Tools

```text
Sentry

Pino

OpenTelemetry
```

Monitor:

```text
Errors

Performance

Payments

Downloads
```

---

# 25. Environment Variables

```env
DATABASE_URL=

CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=

CLERK_WEBHOOK_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_SECRET=

CLOUDINARY_URL=

RESEND_API_KEY=

REDIS_URL=

JWT_SECRET=
```

---

# 26. Scalability Roadmap

Phase 1

1-5K Users

Single Backend

---

Phase 2

5K-50K Users

Redis Cache

Background Jobs

CDN

---

Phase 3

50K-500K Users

Read Replicas

Object Storage

Dedicated Analytics Pipeline

---

# 27. Trust & Reliability Requirements

The backend must guarantee:

* No unauthorized downloads
* Accurate payment verification
* Secure student data
* Complete order history
* Reliable notifications
* Auditability of all admin actions
* High uptime during examination seasons

---

# Final Goal

The Kriscap backend should behave like a professional EdTech platform rather than a simple PDF-selling website.

Every purchase, download, enrollment, payment, and support interaction must be secure, traceable, scalable, and reliable enough to support tens of thousands of students without requiring architectural redesign.
