# Kriscap Study Hub

# Master Test Plan

# test.md

---

# 1. Test Objectives

Validate that:

* All features work correctly
* No unauthorized access exists
* Payments are secure
* Downloads are protected
* Admin operations are safe
* Mobile experience is flawless
* Website appears trustworthy and production-ready

---

# 2. Testing Categories

## Functional Testing

## UI Testing

## Authentication Testing

## Payment Testing

## Download Testing

## Admin Testing

## Security Testing

## Performance Testing

## Accessibility Testing

## SEO Testing

---

# 3. Homepage Tests

## HOME-001

Verify homepage loads successfully.

Expected:

* No errors
* All sections visible
* Page loads under 3 seconds

---

## HOME-002

Verify Hero CTA buttons.

Expected:

Buttons navigate correctly.

---

## HOME-003

Verify statistics section renders.

Expected:

Student count visible.

Success metrics visible.

---

## HOME-004

Verify testimonials display.

Expected:

No broken images.

No missing content.

---

## HOME-005

Verify FAQ accordion.

Expected:

Expand and collapse correctly.

---

## HOME-006

Verify WhatsApp button.

Expected:

Opens WhatsApp support chat.

---

# 4. Navigation Tests

## NAV-001

Verify navbar links.

Expected:

All routes work.

---

## NAV-002

Verify footer links.

Expected:

No broken routes.

---

## NAV-003

Verify mobile hamburger menu.

Expected:

Opens and closes correctly.

---

## NAV-004

Verify sticky navbar behavior.

Expected:

Remains visible while scrolling.

---

# 5. Authentication Tests

## AUTH-001

Register new account.

Expected:

User created successfully.

---

## AUTH-002

Login with valid credentials.

Expected:

Redirect to dashboard.

---

## AUTH-003

Login with invalid credentials.

Expected:

Proper error shown.

---

## AUTH-004

Logout.

Expected:

Session destroyed.

---

## AUTH-005

Refresh page after login.

Expected:

Session persists.

---

## AUTH-006

Protected route access.

Expected:

Guests redirected to login.

---

## AUTH-007

Admin route access by normal user.

Expected:

Access denied.

---

# 6. Profile Tests

## PROFILE-001

View profile.

Expected:

Correct user information.

---

## PROFILE-002

Update profile.

Expected:

Changes saved.

---

## PROFILE-003

Upload avatar.

Expected:

Image updates correctly.

---

# 7. Product Catalog Tests

## PRODUCT-001

View product list.

Expected:

Products render correctly.

---

## PRODUCT-002

Search products.

Expected:

Relevant results returned.

---

## PRODUCT-003

Filter products.

Expected:

Correct filtering.

---

## PRODUCT-004

Sort products.

Expected:

Correct ordering.

---

## PRODUCT-005

View product details.

Expected:

Accurate information displayed.

---

## PRODUCT-006

Preview file.

Expected:

Preview loads successfully.

---

# 8. Wishlist Tests

## WISH-001

Add product to wishlist.

Expected:

Product added.

---

## WISH-002

Remove product.

Expected:

Removed successfully.

---

## WISH-003

Wishlist persistence.

Expected:

Data remains after refresh.

---

# 9. Cart Tests

## CART-001

Add product to cart.

Expected:

Cart count updates.

---

## CART-002

Update quantity.

Expected:

Total recalculates.

---

## CART-003

Remove item.

Expected:

Item removed.

---

## CART-004

Cart persistence.

Expected:

Survives refresh.

---

# 10. Checkout Tests

## CHECKOUT-001

Digital product checkout.

Expected:

Order created.

---

## CHECKOUT-002

Physical product checkout.

Expected:

Address required.

---

## CHECKOUT-003

Mixed cart checkout.

Expected:

Handles both product types.

---

## CHECKOUT-004

Coupon application.

Expected:

Discount applied correctly.

---

## CHECKOUT-005

Invalid coupon.

Expected:

Error shown.

---

# 11. Razorpay Tests

## PAY-001

Successful payment.

Expected:

Order marked PAID.

---

## PAY-002

Cancelled payment.

Expected:

Order remains pending.

---

## PAY-003

Invalid signature.

Expected:

Payment rejected.

---

## PAY-004

Duplicate callback.

Expected:

No duplicate order updates.

---

# 12. Download Tests

## DOWNLOAD-001

Purchased file download.

Expected:

Download allowed.

---

## DOWNLOAD-002

Unpurchased file download.

Expected:

Access denied.

---

## DOWNLOAD-003

Download count tracking.

Expected:

Count increases.

---

## DOWNLOAD-004

Expired link.

Expected:

Download blocked.

---

# 13. Live Class Tests

## CLASS-001

View upcoming classes.

Expected:

Correct schedule.

---

## CLASS-002

Register for class.

Expected:

Registration stored.

---

## CLASS-003

Join class.

Expected:

Meeting opens.

---

# 14. Dashboard Tests

## DASH-001

Dashboard loads.

Expected:

Widgets render.

---

## DASH-002

Recent downloads.

Expected:

Correct data shown.

---

## DASH-003

Notifications.

Expected:

Unread count accurate.

---

## DASH-004

Progress tracker.

Expected:

Progress calculated correctly.

---

# 15. CMS Tests

## CMS-001

Update homepage content.

Expected:

Changes visible.

---

## CMS-002

Update FAQ.

Expected:

Frontend updates.

---

## CMS-003

Publish blog.

Expected:

Publicly accessible.

---

# 16. Admin Tests

## ADMIN-001

Admin login.

Expected:

Dashboard access granted.

---

## ADMIN-002

Create product.

Expected:

Product visible.

---

## ADMIN-003

Edit product.

Expected:

Changes persist.

---

## ADMIN-004

Deactivate product.

Expected:

Hidden from store.

---

## ADMIN-005

Delete product.

Expected:

Removed safely.

---

## ADMIN-006

View users.

Expected:

User list visible.

---

## ADMIN-007

Update user role.

Expected:

Permissions updated.

---

## ADMIN-008

View orders.

Expected:

Accurate order data.

---

## ADMIN-009

Refund order.

Expected:

Status updates correctly.

---

# 17. Notification Tests

## NOTIFY-001

Order notification.

Expected:

User receives alert.

---

## NOTIFY-002

Download notification.

Expected:

Appears correctly.

---

## NOTIFY-003

Mark notification read.

Expected:

Unread count updates.

---

# 18. Support Ticket Tests

## TICKET-001

Create ticket.

Expected:

Ticket stored.

---

## TICKET-002

Admin reply.

Expected:

User sees response.

---

## TICKET-003

Close ticket.

Expected:

Status updated.

---

# 19. Security Tests

## SEC-001

SQL Injection

Input:

' OR 1=1 --

Expected:

Blocked.

---

## SEC-002

XSS

Input:

<script>alert(1)</script>

Expected:

Sanitized.

---

## SEC-003

Direct API access.

Expected:

Unauthorized blocked.

---

## SEC-004

Download URL sharing.

Expected:

Unauthorized users blocked.

---

## SEC-005

Privilege escalation.

Expected:

Prevented.

---

## SEC-006

Admin API access by user.

Expected:

403 Forbidden.

---

# 20. Performance Tests

## PERF-001

Homepage load.

Target:

< 3 seconds

---

## PERF-002

Store load.

Target:

< 2 seconds

---

## PERF-003

Dashboard load.

Target:

< 2 seconds

---

## PERF-004

API response.

Target:

< 500 ms average

---

# 21. Mobile Tests

## MOBILE-001

360px width.

Expected:

No overflow.

---

## MOBILE-002

Navigation usable.

Expected:

Touch friendly.

---

## MOBILE-003

Checkout usable.

Expected:

No UI breakage.

---

## MOBILE-004

Dashboard responsive.

Expected:

All widgets visible.

---

# 22. Accessibility Tests

## A11Y-001

Keyboard navigation.

Expected:

Fully usable.

---

## A11Y-002

Focus states.

Expected:

Visible.

---

## A11Y-003

Screen reader support.

Expected:

Proper labels.

---

# 23. SEO Tests

## SEO-001

Meta title present.

---

## SEO-002

Meta description present.

---

## SEO-003

Open Graph tags.

---

## SEO-004

Structured data.

---

## SEO-005

Sitemap generated.

---

# 24. Production Readiness Checklist

* No console errors
* No broken links
* No broken images
* No hardcoded secrets
* HTTPS enabled
* Payments verified
* Audit logs enabled
* Backups configured
* Error tracking configured
* Analytics configured
* Mobile responsive
* Accessibility compliant
* SEO optimized

---

# Final Acceptance Criteria

The website is considered production ready only if:

* 100% Critical Tests Pass
* 95% Functional Tests Pass
* 90+ Lighthouse Score
* No Security Vulnerabilities
* No Payment Flow Failures
* No Unauthorized Data Access
* No Broken Mobile Layouts

Deployment must be blocked if any Critical Test fails.
