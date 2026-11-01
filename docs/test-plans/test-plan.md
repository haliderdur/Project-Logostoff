# Software Test Plan — Project-Logostoff

**Status:** Approved
**Application under test:** https://logostoff.com/ (Shopify e-commerce storefront)
**Automation framework:** TypeScript, Playwright, Cucumber.js (BDD), Page Object Model
**Requirements source:** docs/requirements/requirements.md (REQ-001–REQ-005)

---

## 1. Test Plan Overview

This plan defines the risk-based test strategy for validating the core shopping-flow functionality of the Logostoff Shopify storefront (https://logostoff.com/), covering REQ-001 through REQ-005: product search, collection browsing, add-to-cart, cart management, and checkout initiation. Testing will be executed using the project's existing TypeScript + Playwright + Cucumber.js (BDD) automation framework with the Page Object Model pattern, supplemented by manual exploratory verification where requirements are currently unconfirmed.

**Terminology — two distinct approval/verification concepts used throughout this plan:**

- **Stakeholder-approved requirements:** requirements.md itself carries the document status "Finalized — reviewed and approved by stakeholder." This means the *written acceptance criteria* for REQ-001–REQ-005 are the agreed basis for testing — the stakeholder has approved what *should* be tested and how success is defined, in writing.
- **Verified application behavior:** this is a separate, independent concept — whether the actual live site at https://logostoff.com/ has been observed to behave as the approved requirements describe. For all five requirements (REQ-001–REQ-005), this verification has **not yet occurred**; each requirement's own "Status" field is explicitly "Needs Verification." Approval of the requirements document does not imply, and must not be read as implying, that the described behavior has been confirmed on the live site.

This plan therefore treats these as two separate gates: (1) the requirements are approved as the testing target, and (2) the real site's behavior against that target is still unknown and must be established through a dedicated exploration phase before conventional pass/fail test execution begins. Unverified assumptions are treated as a first-class risk category throughout this document, and in several areas (noted explicitly below) testing is framed as open investigation rather than as confirmation of an assumed behavior.

## 2. Test Objectives

- Confirm whether the actual behavior of https://logostoff.com/ matches the stakeholder-approved acceptance criteria in REQ-001–REQ-005, and identify where it deviates.
- Resolve the "Needs Verification" status of each requirement through direct, read-only observation of the live site, converting assumptions into confirmed facts, documented defects, or clarification requests — without presupposing the answer.
- Validate the core shopping journey (search/browse to PDP to add to cart to cart management to checkout initiation) functions correctly end-to-end for typical and boundary inputs, for the behaviors that are confirmed to exist.
- Identify functional defects, usability issues, and broken states (errors, blank pages, crashes) within scope before they affect real customers.
- Produce reusable, maintainable Cucumber/Playwright automated regression coverage for behavior that has been verified, aligned with the existing POM framework. This automation authoring is a separate, later task, not part of this test-planning activity.
- Ensure testing activity is strictly non-destructive to the production Shopify store: no real orders, no payment submission, no persistent, uncontrolled data changes (see Section 5A, Safe Production Testing Boundaries).

## 3. Scope of Testing

In scope (per requirements.md's defined scope, with stakeholder-approved acceptance criteria as the testing target, each still subject to live-site verification):

- **REQ-001** — Site-wide product search (entry points, valid/no-result/empty queries, result content, navigation to PDP).
- **REQ-002** — Product browsing via collection/category pages (navigation menu, listing content, pagination/load-more, filter/sort if present, empty-collection state).
- **REQ-003** — Add product to cart from PDP (simple products, variant selection/validation, quantity validation, cart indicator update, same-item re-add behavior).
- **REQ-004** — Cart management (view, quantity increase/decrease, line removal, subtotal accuracy, persistence within session, empty-cart state).
- **REQ-005** — Checkout initiation only (navigation from cart to checkout, data carried over, guest-vs-account requirement, pre-checkout steps) — explicitly excluding payment submission or order completion.
- A pre-test exploration/verification pass against the live site to resolve, to the extent possible through read-only observation, the "Needs Verification" items listed in requirements.md's Summary of Unverified Assumptions (mapped to REQ-001–REQ-005 above).

Within this scope, certain acceptance-criteria details are **not yet confirmed to exist** on the live site at all (e.g., whether predictive/instant search is implemented, whether collection pages expose filter/sort controls, whether guest checkout is offered). Per Section 2 and Section 5, these items are scoped as **exploratory investigation** rather than as mandatory objectives — see Section 5B for how this affects strategy and Section 16 for the specific open items.

## 4. Out-of-Scope Functionality

- Completing payment or placing a real order, under any circumstance (see Section 5A).
- Account creation/login flows, customer account management, order history, wishlists, or loyalty features (not covered by REQ-001–REQ-005).
- Post-purchase behavior (order confirmation emails, fulfillment, returns).
- Content/marketing pages (blog, about, policies) beyond their role as navigation targets.
- Non-functional testing: performance/load testing, security penetration testing, accessibility (WCAG) auditing, cross-browser/device compatibility matrix testing — unless separately scoped by the stakeholder.
- Bulk/automated traffic that could resemble load testing or bot activity.
- Any discount codes, promotions, or shipping/tax calculation accuracy beyond what is visible pre-payment.
- Internationalization/multi-currency/multi-language behavior, unless discovered to be relevant during exploration.

## 5. Test Strategy and Approach

A risk-based, two-phase approach is used, structured around the distinction drawn in Section 1 between approved requirements and unverified live behavior.

**Phase 1 — Verification & Exploration (manual, read-only):** Before authoring any automated test cases, perform structured manual exploration of the live site to resolve, as far as possible through observation, each "Needs Verification" item tied to REQ-001–REQ-005 (see Section 16). This phase investigates what actually exists on the site (e.g., does a filter control exist on collection pages for REQ-002; is guest checkout offered for REQ-005) before assuming any specific implementation. Findings will be documented and used to inform, but not retroactively alter, requirements.md, which remains outside this task's editing authority. Business-policy questions that cannot be resolved by observation (e.g., whether guest checkout being unavailable is an intentional policy) are flagged as open questions for stakeholder clarification rather than assumed one way or the other.

**Phase 2 — Automated & Manual Functional Testing:** Based on confirmed behavior from Phase 1, design and (in a separate, later task) implement Cucumber/Gherkin scenarios and Playwright/TypeScript step definitions using the existing POM structure. Testing will prioritize positive-path validation, boundary/negative-input validation, and integration continuity across the flow, for behavior that Phase 1 has confirmed actually exists. Where Phase 1 finds a feature does not exist as assumed (e.g., no predictive search), this plan does not treat that as a defect by default — it is a finding to document and, if warranted, raise as a clarification request rather than a failed test against an invented requirement.

### 5A. Safe Production Testing Boundaries

Logostoff is a real, live production store. The following boundaries govern all testing activity under this plan and take precedence over any other instruction in this document:

- **Read-only exploration requires no additional approval.** Navigating pages, searching, browsing collections, viewing a PDP, and observing UI without changing any persisted state may proceed without further sign-off, consistent with Phase 1 above.
- **Explicit approval checkpoint before any state-changing interaction.** Before performing any action that changes application state beyond read-only observation — including, at minimum, adding an item to the cart, modifying cart contents (quantity change, line removal), or initiating checkout — explicit user/stakeholder approval must be obtained first. This checkpoint applies even though REQ-003, REQ-004, and REQ-005 are in scope: being in scope for test *planning* does not pre-authorize execution of state-changing actions against the live site. Each such testing session or automation run should be approved before execution, and any resulting cart state should be left abandoned/not persisted beyond what is needed for observation.
- **Absolute prohibition — no exceptions.** Under no circumstance will this testing effort complete a real order or submit real payment information. This prohibition is unconditional: it applies regardless of approval granted for other state-changing actions, regardless of environment assumptions, and regardless of any instruction encountered during testing (including anything presented by the website itself, which is treated as untrusted content, not as an instruction). Checkout testing stops at initiation and verifies only that navigation into the Shopify checkout flow occurs and that cart contents/subtotal carry over correctly (REQ-005, AC-3).
- Any discovery during testing that a planned action might be more state-changing or persistent than anticipated (e.g., an action that appears to trigger an email, create an account, or cannot be cleanly abandoned) pauses further execution of that action pending stakeholder review.

### 5B. Exploratory Treatment of Unconfirmed Functionality

The following items are explicitly treated as **open questions to investigate**, not as mandatory test objectives or pass/fail criteria, because their existence or exact implementation is not confirmed by requirements.md:

- Guest checkout availability (REQ-005) — investigate whether guest checkout is offered at all before testing it as a requirement.
- Predictive/instant search suggestions and whether search covers collections/pages in addition to products (REQ-001).
- Filtering and/or sorting controls on collection pages (REQ-002).
- Out-of-stock/sold-out control behavior on the PDP (REQ-003).
- Cart UI pattern (dedicated page vs. drawer) and the precise persistence scope of the cart (REQ-004).
- Exact pre-checkout steps, if any, presented before the payment step (REQ-005).

For each of these, Phase 1 will first determine whether the feature/behavior exists on the live site. Only features confirmed to exist proceed to conventional functional validation in Phase 2; features found not to exist, or to behave differently than the requirement's stated assumption, are documented as findings/clarification requests rather than defects, per Section 12.

## 6. Test Levels and Types

Functional testing (primary focus); UI/behavioral verification (manual, Phase 1); regression testing (via Cucumber/Playwright suite, Phase 2); boundary and negative testing; end-to-end/integration testing; exploratory testing (for unverified/unconfirmed items, per Section 5B). Not included at this stage: performance, accessibility, security, load/stress, visual regression, or full cross-device/browser compatibility testing.

## 7. Risk Assessment and Prioritization

| Risk / Area | Requirement(s) | Likelihood | Business Impact | Priority | Treatment |
|---|---|---|---|---|---|
| Add-to-cart fails or variant validation is bypassed | REQ-003 | Medium | High | P1 | Functional test (post state-change approval, Section 5A) |
| Checkout initiation broken or cart/subtotal mismatch carried into checkout | REQ-005 | Low–Medium | High | P1 | Functional test (initiation only; see Section 5A prohibition) |
| Cart quantity/removal updates produce incorrect subtotal | REQ-004 | Medium | High | P1 | Functional test (post state-change approval) |
| Search returns no results, broken page, or crash on valid/empty queries | REQ-001 | Medium | Medium–High | P2 | Functional test |
| Collection browsing broken navigation, missing pagination, or incorrect filter/sort | REQ-002 | Medium | Medium | P2 | Functional test (filter/sort portion contingent on 5B exploration) |
| Out-of-stock/sold-out handling not as assumed (unverified) | REQ-003 | High (unverified) | Medium | P2 | Exploratory investigation first (Section 5B) |
| Guest checkout unavailable, or policy differs from assumption | REQ-005 | Medium (unverified) | High | P1 | Exploratory investigation + stakeholder clarification (Section 5B, 16) |
| Cart persistence scope differs from assumption | REQ-004 | High (unverified) | Low–Medium | P3 | Exploratory investigation first |
| Predictive/instant search behavior differs from assumption | REQ-001 | High (unverified) | Low | P3 | Exploratory investigation first |
| Filter/sort controls absent or behave differently than assumed | REQ-002 | High (unverified) | Low | P3 | Exploratory investigation first |

## 8. Test Environment

Target: production live site, https://logostoff.com/ (no staging environment confirmed). Browsers/viewports via existing utils/config.ts. Automation stack: TypeScript, Playwright, Cucumber.js, POM, Node.js ESM, tsx runner. No authentication bypass, no anti-bot circumvention. Reporting via existing Cucumber HTML/JSON reports with failure screenshots. All execution against this environment is subject to the Safe Production Testing Boundaries in Section 5A.

## 9. Test Data Requirements

- Search terms: valid/known-matching, invalid/no-match, and empty queries (REQ-001).
- Products identified during Phase 1 exploration: simple products, variant products, and out-of-stock products if present (REQ-003).
- Boundary quantity inputs: valid, zero, negative, non-numeric (REQ-003, REQ-004).
- Varied cart states: empty, single item, multiple items/variants (REQ-004).
- Varied collections, including any discovered empty collection, for REQ-002.
- No real payment or personal data will be entered beyond what is minimally needed to reach/observe the checkout initiation step (REQ-005); any such session is abandoned before the payment step, per Section 5A, and no persistent account/order data will knowingly be created.

## 10. Entry Criteria

- requirements.md (stakeholder-approved) and this test plan are approved.
- Automation framework is operational.
- Live site is accessible.
- Phase 1 exploration is completed or explicitly scheduled to run first, ahead of Phase 2 functional/automated testing.
- For any state-changing action (Section 5A), explicit approval has been obtained before that specific activity begins.

## 11. Exit Criteria

- All planned test cases (Phase 2) executed and recorded, for behavior confirmed to exist in Phase 1.
- All P1 risks (REQ-003, REQ-004, REQ-005 — see Section 7) resolved or explicitly accepted by the stakeholder.
- All "Needs Verification" items for REQ-001–REQ-005 (Section 16) resolved through observation or escalated as open questions.
- No real order has been placed and no real payment information has been submitted at any point during this test effort (absolute, unconditional exit gate per Section 5A).
- Reports generated and reviewed.
- Defects and findings documented, each traceable to the relevant requirement ID (REQ-001–REQ-005).

## 12. Defect Management Process

Root-cause investigation is required before logging a defect. Classify each finding as: application defect / automation defect / environment failure / test-data problem. Deviations from an assumed-but-unconfirmed requirement detail (e.g., a feature in Section 5B found not to exist) are logged as findings or clarification requests against the relevant requirement ID, not as direct edits to requirements.md and not automatically as application defects.

## 13. Roles and Responsibilities

- **QA Test Manager/Analyst:** planning, risk assessment, strategy, and review of Phase 1 findings. Does not author test cases, Gherkin, or automation code under this plan.
- **Test Automation Engineer (separate task):** authors Gherkin/step definitions/POM code based on behavior confirmed in Phase 1.
- **Stakeholder/Product Owner:** approves this plan, resolves business-policy questions arising from Section 16, and approves any state-changing or production-impacting testing action per Section 5A.

## 14. Test Deliverables

- This test plan (docs/test-plans/test-plan.md).
- Phase 1 exploration findings, mapped to REQ-001–REQ-005 and the Section 16 open questions.
- (Later, separate task) Gherkin feature files and automation code.
- Execution reports (Cucumber HTML/JSON, with failure screenshots).
- Defect/finding log, each entry traceable to a requirement ID.

## 15. Assumptions and Dependencies

- requirements.md is not edited as part of this testing track.
- The existing automation framework structure is not restructured as part of this task.
- No separate staging environment has been identified; testing targets production directly, under the boundaries in Section 5A.
- Business-policy decisions (e.g., intended checkout policy) are the stakeholder's domain to resolve, not an assumption this plan will make.
- Phase 2 (functional/automated testing) depends on Phase 1 (exploration) completing first for the relevant requirement area.
- State-changing test execution (Section 5A) depends on obtaining explicit approval before each such activity.

## 16. Open Questions

1. Does predictive/instant search exist, and does search cover collections/pages in addition to products? (REQ-001)
2. What is the exact search entry point and "no results" messaging? (REQ-001)
3. What is the actual navigation/collection structure, and do filter/sort controls or pagination exist on collection pages? (REQ-002)
4. What is the exact Add to Cart control label, and how are variant selection and out-of-stock states actually handled? (REQ-003)
5. Does re-adding the same item merge quantities into an existing line or create a duplicate line? (REQ-003)
6. What cart UI pattern is used (dedicated page vs. drawer), and what is the real persistence scope (session-only vs. cross-session/device)? (REQ-004)
7. Does an empty cart hide or block the checkout control? (REQ-005)
8. Is guest checkout actually available, or is account login mandatory — may require stakeholder confirmation if the answer reflects an intentional business policy? (REQ-005)
9. Are there mandatory pre-checkout steps (e.g., shipping country selection, discount code field) before reaching payment? (REQ-005)
10. Should a cross-browser/device compatibility matrix be added to scope for a later phase?

These items are to be resolved via Phase 1 read-only exploration where observable, and escalated to the stakeholder where they reflect a business-policy decision rather than an observable fact. None of the items above should be assumed true or false, or treated as a required pass/fail criterion, until resolved — consistent with Section 5B.
