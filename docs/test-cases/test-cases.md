# Manual Test Cases — Project-Logostoff

**Source documents:** docs/requirements/requirements.md (REQ-001–REQ-005), docs/test-plans/test-plan.md
**Design approach:** Risk-based testing (Equivalence Partitioning, Boundary Value Analysis, Decision Table Testing, State Transition Testing, Error Guessing)
**Status:** Finalized draft — approved by stakeholder, refinements applied
**Scope boundaries:** No real orders, no payment submission, no account creation, no destructive operations, no bypass of authentication/anti-bot protections. All execution is manual, against the live production site https://logostoff.com/, subject to Test Plan Section 5A.

---

## 1. Legend and Field Definitions

### 1.1 Verification Status

| Status | Meaning |
|---|---|
| **Not Executed** | Standard functional test case, in confirmed scope of the stakeholder-approved requirements. Ready for execution once the applicable Section 5A state-change approval (where required) is obtained. |
| **Pending Phase 1 Exploration** | Exploratory/conditional test case. Depends on functionality the test plan (Section 5B / Section 16) marks as unconfirmed, or on a specific product/collection/cart state (e.g., an out-of-stock item, an empty collection) being confirmed to exist during Phase 1. Must not be treated as pass/fail until feature existence is confirmed; absence of the feature is a documented finding, not a failure. |

### 1.2 Scope Marker (added for traceability — every test case carries exactly one)

- **CONFIRMED-SCOPE** — Exercises a behavior directly stated in the stakeholder-approved acceptance criteria of REQ-001–REQ-005. Not contingent on open questions in Test Plan Section 16.
- **EXPLORATORY-CONDITIONAL** — Exercises a behavior listed in Test Plan Section 5B / Section 16 as unconfirmed, and/or is contingent on a specific product/collection/cart state being found during Phase 1. Carries the "Pending Phase 1 Exploration" status.

### 1.3 Execution Approval Required (added per refinement — stated on every individual test case, not only at section level)

Per Test Plan Section 5A: read-only observation requires no additional sign-off; any action that changes application state (add to cart, modify cart quantity, remove cart line, initiate checkout) requires **explicit stakeholder/user approval before that specific execution**, and any resulting state must be abandoned/not persisted beyond what is needed for observation. Each test case below is explicitly marked:

- **YES** — this test case itself performs a state-changing action and must not be executed without prior explicit approval for that action.
- **NO** — this test case itself is read-only, but may depend on cart/product state established by a prior approved state-changing test case (dependency is noted in Preconditions where applicable).

### 1.4 UI-level vs. API-level Testing Note

Several REQ-003 quantity boundary cases (TC-018–TC-021) are designed and executable strictly as **UI-level manual test cases**: entering a value into the on-page quantity field through the browser and observing the UI's own validation/behavior. None of these test cases send raw HTTP/API requests, modify network payloads, or otherwise bypass the UI's input constraints. Any hypothetical boundary scenario that would require bypassing UI input constraints (e.g., crafting a raw add-to-cart request with a negative or non-numeric quantity directly against Shopify's cart API) is **explicitly out of scope for this manual UI test suite** and would constitute a form of access-control/validation bypass. Per AGENTS.md Section 11 ("Do not bypass authentication, anti-bot protections, or access controls") and Test Plan Section 8, such API-level testing is **not authorized under this test suite** and would require separate, explicit stakeholder authorization and a distinct test design (e.g., API/security testing) before being attempted. This is noted individually on TC-018–TC-021 below rather than assumed to be covered.

---

## 2. REQ-001 — Site-wide Product Search

**Priority:** P2 unless noted otherwise. **Execution Approval Required:** NO for all REQ-001 cases (read-only search/navigation; no persisted state change).

### TC-001
- **Requirement ID:** REQ-001
- **Title:** Search entry point accessible from header across page types
- **Test Type:** Positive / UI presence
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** Browser open; network access to https://logostoff.com/.
- **Test Data:** N/A
- **Test Steps:**
  1. Load the homepage.
  2. Inspect the header for a search icon or search field.
  3. Navigate to any collection page and repeat the inspection.
  4. Navigate to any product detail page (PDP) and repeat the inspection.
- **Expected Result:** A search entry point (icon or field) is visible and accessible from the header on the homepage, on the collection page, and on the PDP.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO

### TC-002
- **Requirement ID:** REQ-001
- **Title:** Valid known keyword returns matching results with required fields
- **Test Type:** Positive / Equivalence Partitioning
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** TC-001 passed; a keyword known (from Phase 1 exploration) to match ≥1 live product is available.
- **Test Data:** One known-matching keyword, e.g. a confirmed product title/term.
- **Test Steps:**
  1. Activate the search entry point.
  2. Enter the known-matching keyword.
  3. Submit the search.
- **Expected Result:** A results page/panel displays, listing at least one matching product; each result shows an image, a title, and a price.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO
- **Overlap Note:** TC-005 reuses this same search action as a precondition to test result-click navigation. Both are retained: TC-002 validates the content/fields of the results (REQ-001 AC on result content), TC-005 validates downstream navigation (REQ-001 AC on navigation to PDP) — different acceptance-criteria angles on the same setup.

### TC-003
- **Requirement ID:** REQ-001
- **Title:** Search term with no matches shows a "no results" state
- **Test Type:** Negative / Equivalence Partitioning
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** Search entry point located (TC-001).
- **Test Data:** Nonsensical query string: `zzxynonexistentproduct123`
- **Test Steps:**
  1. Activate the search entry point.
  2. Enter the non-matching query.
  3. Submit the search.
- **Expected Result:** A clear "no results found" message is displayed; no application error, blank page, or crash occurs.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO

### TC-004
- **Requirement ID:** REQ-001
- **Title:** Empty search query does not break the page
- **Test Type:** Boundary / Edge case
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** Search entry point located (TC-001).
- **Test Data:** Empty string (no characters entered).
- **Test Steps:**
  1. Activate the search entry point.
  2. Leave the input field empty.
  3. Attempt to submit the search.
- **Expected Result:** Submission is either blocked (e.g., control stays disabled) or an empty/validation state is shown; no application error, blank page, or broken layout occurs.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO

### TC-005
- **Requirement ID:** REQ-001
- **Title:** Selecting a search result navigates to the correct PDP
- **Test Type:** Positive / Navigation
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** TC-002 executed and returned ≥1 result.
- **Test Data:** Same keyword used in TC-002; select the first listed result.
- **Test Steps:**
  1. Perform a valid search using the same keyword as TC-002.
  2. Click the first result in the results list.
- **Expected Result:** Browser navigates to the PDP whose title matches the selected result's title exactly.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO
- **Overlap Note:** See TC-002 overlap note above.

### TC-006 [EXPLORATORY]
- **Requirement ID:** REQ-001
- **Title:** Predictive/instant search suggestions while typing
- **Test Type:** Exploratory
- **Priority:** P3
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** Search entry point located (TC-001). Feature existence unconfirmed (Test Plan Section 5B / Section 16 Item 1).
- **Test Data:** Partial keyword, 3–4 characters (e.g., first 3–4 letters of a known product name).
- **Test Steps:**
  1. Activate the search entry point.
  2. Type the partial keyword without submitting the search.
  3. Observe whether a live/instant suggestions panel appears.
- **Expected Result:** This is an open investigation question, not a confirmed requirement. Document whether predictive suggestions exist and, if so, their behavior (products only, or also collections/pages). Absence of this feature is a documented finding, not a defect.
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** NO

---

## 3. REQ-002 — Product Browsing via Collections

**Priority:** P2 unless noted otherwise. **Execution Approval Required:** NO for all REQ-002 cases (read-only browsing).

### TC-007
- **Requirement ID:** REQ-002
- **Title:** Main navigation exposes collection links
- **Test Type:** Positive / UI presence
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** Homepage loaded.
- **Test Data:** N/A
- **Test Steps:**
  1. Load the homepage.
  2. Inspect the main navigation menu.
- **Expected Result:** At least one collection/category link is present in the main navigation and is clickable.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO

### TC-008
- **Requirement ID:** REQ-002
- **Title:** Collection page lists products with required fields
- **Test Type:** Positive
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** TC-007 passed; at least one populated collection is available.
- **Test Data:** Any populated collection reached via the main navigation.
- **Test Steps:**
  1. Click a collection link from the main navigation.
  2. Observe the resulting collection page.
- **Expected Result:** A grid/list of products is displayed; each product shown has an image, a title, and a price.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO
- **Overlap Note:** TC-009 reuses this collection page as a precondition for testing result-click navigation; both retained as they validate different REQ-002 acceptance criteria (listing content vs. navigation to PDP).

### TC-009
- **Requirement ID:** REQ-002
- **Title:** Selecting a product on the collection page navigates to its PDP
- **Test Type:** Positive / Navigation
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** TC-008 executed; collection page displaying ≥1 product.
- **Test Data:** Any one product listed on the collection page.
- **Test Steps:**
  1. From the collection page used in TC-008, click/select one listed product.
- **Expected Result:** Browser navigates to the PDP matching the selected product's title exactly.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO

### TC-010 [EXPLORATORY]
- **Requirement ID:** REQ-002
- **Title:** Empty collection displays an appropriate empty-state message
- **Test Type:** Edge case
- **Priority:** P2
- **Scope Marker:** EXPLORATORY-CONDITIONAL (contingent on a confirmed empty collection existing on the live catalog)
- **Preconditions:** An empty collection (zero products) has been identified during Phase 1 exploration. If no empty collection can be found on the live site, this test case is recorded as **"Not Applicable"** rather than executed.
- **Test Data:** URL of the confirmed empty collection, if one was found.
- **Test Steps:**
  1. Navigate directly to the identified empty collection's URL.
  2. Observe the page content.
- **Expected Result:** An appropriate empty-state message is shown (e.g., "No products found in this collection"); no application error or blank page occurs. If no empty collection exists on the live catalog, record status as "Not Applicable."
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** NO

### TC-011 [EXPLORATORY]
- **Requirement ID:** REQ-002
- **Title:** Pagination or load-more functions correctly on a large collection
- **Test Type:** Exploratory / Positive
- **Priority:** P2
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** A collection containing more products than fit on a single page has been identified during Phase 1 exploration.
- **Test Data:** The identified large collection's URL.
- **Test Steps:**
  1. Navigate to the identified large collection.
  2. Locate a pagination control or "load more" control.
  3. Trigger the control (click next page / load more).
- **Expected Result:** Additional products load correctly with no errors, no duplicate products, and no missing items compared to the collection's actual catalog count. Document the actual mechanism used (pagination vs. load-more), per Test Plan Section 16 Item 3, which is currently unconfirmed.
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** NO

### TC-012 [EXPLORATORY]
- **Requirement ID:** REQ-002
- **Title:** Filter controls narrow the displayed product list
- **Test Type:** Exploratory
- **Priority:** P3
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** Existence of a filter control on collection pages has been confirmed during Phase 1 exploration (Test Plan Section 5B).
- **Test Data:** One filter criterion (e.g., a size, color, or price-range filter), once its existence is confirmed.
- **Test Steps:**
  1. Navigate to a collection page.
  2. Locate filter controls, if present.
  3. Apply one filter criterion.
- **Expected Result:** This behavior is unconfirmed per Test Plan Section 5B. If a filter control is present, applying it must correctly narrow the displayed list to only matching products. If no filter control exists, document this as a finding, not a defect.
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** NO

### TC-013 [EXPLORATORY]
- **Requirement ID:** REQ-002
- **Title:** Sort controls reorder the displayed product list
- **Test Type:** Exploratory
- **Priority:** P3
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** Existence of a sort control on collection pages has been confirmed during Phase 1 exploration (Test Plan Section 5B).
- **Test Data:** One sort option (e.g., price low-to-high), once its existence is confirmed.
- **Test Steps:**
  1. Navigate to a collection page.
  2. Locate sort controls, if present.
  3. Select one sort option.
- **Expected Result:** This behavior is unconfirmed per Test Plan Section 5B. If a sort control is present, selecting an option must correctly reorder the product list according to that option. If no sort control exists, document this as a finding, not a defect.
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** NO

---

## 4. REQ-003 — Add Product to Cart

**Priority:** P1 unless noted otherwise. Every state-changing case in this section requires explicit stakeholder approval prior to execution, per Test Plan Section 5A.

### TC-014
- **Requirement ID:** REQ-003
- **Title:** Add-to-cart control present on PDP
- **Test Type:** Positive / UI presence
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** A PDP is loaded.
- **Test Data:** Any one product.
- **Test Steps:**
  1. Navigate to a product's PDP.
  2. Inspect the page for an add-to-cart control.
- **Expected Result:** A clearly identifiable add-to-cart control is visible on the PDP. Exact label text is unconfirmed per requirements.md; document the actual label found (e.g., "Add to cart," "Add to bag").
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO (read-only inspection of the PDP; no add-to-cart action is performed in this case)

### TC-015
- **Requirement ID:** REQ-003
- **Title:** Add simple product (no variants) to cart with valid quantity
- **Test Type:** Positive
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** A simple (no-variant) product has been identified during Phase 1 exploration. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Quantity = 1.
- **Test Steps:**
  1. Navigate to the identified simple product's PDP.
  2. Set the quantity field to 1.
  3. Activate the add-to-cart control.
- **Expected Result:** The product is added to the cart. Visible add-to-cart feedback is shown (exact pattern — cart count badge, confirmation toast, drawer, or redirect — to be confirmed and documented). The header cart indicator increments by 1.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval. Resulting cart state must be abandoned/not persisted beyond observation needs.
- **Overlap Note:** TC-021 performs a nearly identical action (quantity = 1 add-to-cart). Both are retained because they target different acceptance-criteria angles: TC-015 validates the general positive add-to-cart flow and feedback mechanism (REQ-003 core AC), while TC-021 is a dedicated Boundary Value Analysis case confirming the minimum valid quantity boundary is accepted (REQ-003 quantity validation AC). If Phase 1/2 execution shows these are fully redundant in practice, that finding should be recorded, but both cases remain distinct by design intent.

### TC-016
- **Requirement ID:** REQ-003
- **Title:** Add-to-cart without selecting a required variant is prevented or flagged
- **Test Type:** Negative / Decision Table Testing
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** A product with required variant options (e.g., size/color) has been identified during Phase 1 exploration. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** The identified variant product; no option pre-selected.
- **Test Steps:**
  1. Navigate to the identified variant product's PDP.
  2. Without selecting a required variant option, activate the add-to-cart control.
- **Expected Result:** The action is prevented — either the add-to-cart control remains disabled, or a validation message is shown — and the item is not added to the cart without a valid variant selection.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.

### TC-017
- **Requirement ID:** REQ-003
- **Title:** Add-to-cart succeeds after valid variant selection
- **Test Type:** Positive / Decision Table Testing
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** Same variant product as TC-016; a valid, in-stock variant combination is known. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Valid, in-stock variant combination (e.g., Size M / Color Black); quantity = 1.
- **Test Steps:**
  1. Navigate to the variant product's PDP (same product as TC-016).
  2. Select the valid, in-stock variant combination.
  3. Activate the add-to-cart control.
- **Expected Result:** The product is added to the cart with the selected variant's details correctly reflected in the cart (title, variant option values, price); the header cart indicator updates accordingly.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.

### TC-018
- **Requirement ID:** REQ-003
- **Title:** Quantity input rejects zero (UI-level)
- **Test Type:** Boundary Value Analysis / Negative
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** A PDP with a quantity selector is loaded. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Quantity = 0, entered via the on-page UI quantity field.
- **Test Steps:**
  1. Navigate to a PDP that has a quantity selector.
  2. Using the UI quantity control, set the value to 0.
  3. Attempt to activate the add-to-cart control via the UI.
- **Expected Result:** The UI either rejects the input (control stays disabled / field reverts) or auto-corrects it to the minimum valid value (typically 1); the product is not added to the cart with a quantity of 0.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.
- **UI/API Scope Note:** This test case is UI-level only — the zero value is entered through the browser's own quantity field and observed through the UI's own validation/behavior. No raw API/network request is sent. See Section 1.4 of this document: testing whether a zero (or otherwise invalid) quantity could be forced through by bypassing the UI (e.g., a direct cart API call) is out of scope here and requires separate authorization.

### TC-019
- **Requirement ID:** REQ-003
- **Title:** Quantity input rejects negative values (UI-level)
- **Test Type:** Negative / Equivalence Partitioning
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** A PDP with a quantity selector is loaded. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Quantity = -1, entered via the on-page UI quantity field.
- **Test Steps:**
  1. Navigate to a PDP that has a quantity selector.
  2. Attempt to enter -1 into the quantity field via the UI (typing, or the decrement control below the minimum).
  3. Attempt to activate the add-to-cart control via the UI.
- **Expected Result:** The UI rejects or auto-corrects the negative input; the product is not added to the cart with a negative quantity.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.
- **UI/API Scope Note:** UI-level only, per Section 1.4. Submitting a negative quantity by bypassing the UI via a direct API/network request is explicitly out of scope for this suite and would require separate stakeholder authorization and a distinct API/security test design.

### TC-020
- **Requirement ID:** REQ-003
- **Title:** Quantity input rejects non-numeric values (UI-level)
- **Test Type:** Negative / Equivalence Partitioning
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** A PDP with a quantity selector is loaded. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Quantity = "abc", entered via the on-page UI quantity field.
- **Test Steps:**
  1. Navigate to a PDP that has a quantity selector.
  2. Attempt to type "abc" into the quantity field via the UI.
  3. Attempt to activate the add-to-cart control via the UI.
- **Expected Result:** The UI either prevents non-numeric characters from being entered at all, or rejects the value on submission; the product is not added to the cart with a non-numeric quantity.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.
- **UI/API Scope Note:** UI-level only, per Section 1.4. Submitting a non-numeric quantity value by bypassing the UI via a direct API/network request is explicitly out of scope for this suite and would require separate stakeholder authorization and a distinct API/security test design.

### TC-021
- **Requirement ID:** REQ-003
- **Title:** Minimum valid quantity (1) is accepted
- **Test Type:** Boundary Value Analysis / Positive
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** A PDP with a quantity selector is loaded. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Quantity = 1, entered via the UI.
- **Test Steps:**
  1. Navigate to a PDP that has a quantity selector.
  2. Set the quantity field to 1 via the UI.
  3. Activate the add-to-cart control.
- **Expected Result:** The product is successfully added to the cart with a recorded quantity of exactly 1.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.
- **UI/API Scope Note:** UI-level only, per Section 1.4; no API-level testing is implied or covered here.
- **Overlap Note:** See TC-015 overlap note above — both retained by design.

### TC-022 [EXPLORATORY]
- **Requirement ID:** REQ-003
- **Title:** Re-adding the same product/variant — merge vs. new line
- **Test Type:** Exploratory / Edge case
- **Priority:** P2
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** The same product/variant has already been added to the cart once (via an approved execution of TC-015 or TC-017). Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Same product/variant as the prior add; quantity = 1 for the repeat action.
- **Test Steps:**
  1. With the item already present in the cart, return to its PDP.
  2. Add the same product/variant to the cart a second time.
  3. Open the cart view and inspect the line item(s) for that product.
- **Expected Result:** This behavior is unconfirmed per Test Plan Section 16 Item 5. Document whether the second add merges into the existing line's quantity, or creates a duplicate line item. Neither outcome is a default defect; record as a finding.
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.
- **Overlap Note:** Builds on the setup from TC-015/TC-017; retained separately because it tests a distinct state-transition behavior (re-add merge/duplicate) not covered by either base case.

### TC-023 [EXPLORATORY]
- **Requirement ID:** REQ-003
- **Title:** Out-of-stock/sold-out control behavior
- **Test Type:** Exploratory
- **Priority:** P2
- **Scope Marker:** EXPLORATORY-CONDITIONAL (contingent on an out-of-stock product/variant existing on the live catalog)
- **Preconditions:** An out-of-stock product or variant has been identified during Phase 1 exploration. If none exists, this test case is recorded as **"Not Applicable."**
- **Test Data:** The identified out-of-stock product/variant, if found.
- **Test Steps:**
  1. Navigate to the out-of-stock PDP (or select the out-of-stock variant on an otherwise in-stock product).
  2. Observe the state of the add-to-cart control.
- **Expected Result:** This behavior is unconfirmed per requirements.md and Test Plan Section 5B. Document the actual behavior observed (e.g., control disabled, "Sold Out" label shown, "Notify me" option, or other). If no out-of-stock item exists on the live catalog, record status as "Not Applicable."
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** NO (read-only observation of PDP state; no add-to-cart action is performed)

---

## 5. REQ-004 — Cart Management

**Priority:** P1 for quantity/subtotal/removal behaviors, P2 for empty-state, P3 for persistence. State-changing cases (TC-026–TC-029) require explicit stakeholder approval before execution, per Test Plan Section 5A.

### TC-024
- **Requirement ID:** REQ-004
- **Title:** Cart view lists line items with required fields
- **Test Type:** Positive
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains ≥1 item, established via an approved execution of a REQ-003 add-to-cart case (e.g., TC-015). That setup action required its own Section 5A approval.
- **Test Data:** One cart line item (from the approved setup action).
- **Test Steps:**
  1. Open the cart view (dedicated page or drawer — document which pattern is actually used, per Test Plan Section 16 Item 6).
  2. Inspect the line item.
- **Expected Result:** The line item displays the product title, product image, unit price, quantity, and line total (unit price × quantity).
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO (this case itself is read-only; it depends on the prior approved state-changing setup in TC-015)

### TC-025
- **Requirement ID:** REQ-004
- **Title:** Cart subtotal accurately reflects the sum of line items
- **Test Type:** Positive / Calculation
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains ≥2 distinct line items with known prices and quantities, established via approved REQ-003 add-to-cart actions.
- **Test Data:** ≥2 distinct line items with recorded unit price and quantity for each.
- **Test Steps:**
  1. Open the cart view.
  2. Manually calculate the expected subtotal as the sum of each line item's line total.
  3. Compare the manually calculated value to the subtotal displayed on the cart view.
- **Expected Result:** The displayed subtotal exactly equals the manually calculated sum of all line totals.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO (this case itself is read-only; depends on prior approved setup actions)
- **Overlap Note:** TC-024 and TC-025 both inspect the cart view but validate different acceptance criteria — TC-024 checks field presence/content, TC-025 checks calculation accuracy. Both retained.

### TC-026
- **Requirement ID:** REQ-004
- **Title:** Increasing line item quantity updates line total and subtotal in place
- **Test Type:** Positive
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains ≥1 item. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** An existing line item; increase its quantity by 1.
- **Test Steps:**
  1. Open the cart view.
  2. Increase the line item's quantity by 1 using the cart's quantity control.
  3. Observe the updated line total and cart subtotal.
- **Expected Result:** Both the line total and the cart subtotal update correctly to reflect the new quantity, without a full page navigation/reload being required.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.

### TC-027
- **Requirement ID:** REQ-004
- **Title:** Decreasing line item quantity updates totals accordingly
- **Test Type:** Positive
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains a line item with quantity ≥2. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** An existing line item with quantity ≥2; decrease its quantity by 1.
- **Test Steps:**
  1. Open the cart view.
  2. Decrease the line item's quantity by 1 using the cart's quantity control.
  3. Observe the updated line total and cart subtotal.
- **Expected Result:** Both the line total and the cart subtotal update correctly to reflect the reduced quantity.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.

### TC-028
- **Requirement ID:** REQ-004
- **Title:** Reducing quantity to zero removes the line item
- **Test Type:** Boundary Value Analysis / Edge case
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains a line item with quantity = 1. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** Reduce the line item's quantity from 1 to 0 via the cart's own quantity control (if that reduction path exists in the cart UI).
- **Test Steps:**
  1. Open the cart view.
  2. Using the cart's quantity control, reduce the line item's quantity to 0.
- **Expected Result:** The line item is removed from the cart entirely; the subtotal updates to exclude the removed item's value.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.

### TC-029
- **Requirement ID:** REQ-004
- **Title:** Explicit remove control removes a line item
- **Test Type:** Positive
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains ≥1 item with a visible remove/delete control. Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** An existing line item with a visible remove control.
- **Test Steps:**
  1. Open the cart view.
  2. Activate the explicit remove control for the line item.
- **Expected Result:** The line item is removed from the cart; the subtotal updates to exclude the removed item's value.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval.
- **Overlap Note:** TC-028 and TC-029 both result in line-item removal, but via different mechanisms (quantity-to-zero vs. a dedicated remove control). Both retained because the cart may implement either or both paths independently, and each represents a distinct state transition worth confirming separately (Test Plan state-transition coverage, see closing notes).

### TC-030
- **Requirement ID:** REQ-004
- **Title:** Empty cart displays an appropriate empty-state message
- **Test Type:** Edge case
- **Priority:** P2
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart is empty (no items added, or all items removed/abandoned from a prior approved session).
- **Test Data:** N/A
- **Test Steps:**
  1. Confirm the cart has no items (e.g., via a fresh/incognito-equivalent session or after prior approved removal actions).
  2. Open the cart view.
- **Expected Result:** An appropriate empty-state message is displayed (e.g., "Your cart is empty"); no application error or blank page occurs.
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO (read-only observation of an already-empty cart; no state change is performed in this case)
- **Overlap Note:** TC-036 also examines an empty cart but focuses on checkout-control behavior (REQ-005), not the cart's own empty-state message. Both retained as distinct requirement angles.

### TC-031 [EXPLORATORY]
- **Requirement ID:** REQ-004
- **Title:** Cart persists across page navigation within the same session
- **Test Type:** Exploratory
- **Priority:** P3
- **Scope Marker:** EXPLORATORY-CONDITIONAL (for persistence scope beyond basic in-session navigation; the in-session navigation check itself is treated as confirmed-scope)
- **Preconditions:** ≥1 item has been added to the cart via an approved REQ-003 action.
- **Test Data:** One cart line item.
- **Test Steps:**
  1. Confirm the cart contains the item added by the prior approved setup action.
  2. Navigate to an unrelated page (e.g., homepage or a different collection) within the same browser session.
  3. Return to the cart view.
- **Expected Result:** The item remains present in the cart after in-session navigation (same tab/session, no reload of a new browser instance). Broader cross-session or cross-device persistence (Test Plan Section 16 Item 6) is explicitly unconfirmed and out of scope for this specific case; document any observation about it separately as a finding, not a pass/fail result for this case.
- **Verification Status:** Pending Phase 1 Exploration (for persistence scope beyond basic in-session navigation)
- **Execution Approval Required:** NO (this case itself is read-only navigation; depends on the prior approved add-to-cart action)

---

## 6. REQ-005 — Checkout Initiation

**Priority:** P1 unless noted otherwise. Per Test Plan Section 5A, checkout testing in every case below stops at initiation — **no test case in this suite proceeds to payment entry or order placement, under any circumstance.** All state-changing cases require explicit stakeholder approval before execution.

### TC-032
- **Requirement ID:** REQ-005
- **Title:** Checkout control visible in cart with ≥1 item
- **Test Type:** Positive / UI presence
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains ≥1 item, established via a prior approved REQ-003 action.
- **Test Data:** One line item.
- **Test Steps:**
  1. Open the cart view.
  2. Inspect the cart for a "Checkout" control.
- **Expected Result:** A clearly identifiable checkout control is displayed in the cart view. Exact label text is unconfirmed; document the actual text found (e.g., "Checkout," "Proceed to Checkout").
- **Verification Status:** Not Executed
- **Execution Approval Required:** NO (read-only inspection of the control; checkout is not initiated in this case)
- **Overlap Note:** TC-033 reuses this same control to test navigation. Both retained — TC-032 validates presence/labeling, TC-033 validates the resulting navigation behavior.

### TC-033
- **Requirement ID:** REQ-005
- **Title:** Selecting checkout navigates to the checkout flow
- **Test Type:** Positive / Navigation
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains ≥1 item; the checkout control is visible (TC-032). Explicit stakeholder approval for this state-changing action has been obtained per Section 5A.
- **Test Data:** One line item.
- **Test Steps:**
  1. Open the cart view.
  2. Activate the checkout control.
  3. Observe the resulting page. **Do not enter any payment information and do not submit an order under any circumstance.**
  4. Once checkout initiation is confirmed, abandon the session (close the tab or navigate away) per Section 5A.
- **Expected Result:** The browser navigates to a checkout page/flow (typically Shopify's hosted checkout). The test stops at this point; no payment step is executed, and no order is placed.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval. This test case must stop at checkout initiation and must never proceed to payment entry or order placement, per Section 7 of this document's refinements and Test Plan Section 5A.

### TC-034
- **Requirement ID:** REQ-005
- **Title:** Checkout page reflects cart items, quantities, and subtotal
- **Test Type:** Positive / Data integrity
- **Priority:** P1
- **Scope Marker:** CONFIRMED-SCOPE
- **Preconditions:** The cart contains a known set of items/quantities/subtotal (recorded in advance, e.g. from an approved execution of TC-025 or a fresh known cart state). Explicit stakeholder approval for the state-changing checkout-initiation action has been obtained per Section 5A.
- **Test Data:** Recorded cart contents (items, quantities, subtotal) immediately before initiating checkout.
- **Test Steps:**
  1. Record the cart's current items, quantities, and subtotal before proceeding.
  2. Initiate checkout (as in TC-033).
  3. Compare the checkout page's displayed items, quantities, and subtotal to the recorded cart state.
  4. Abandon the session before any payment step is reached.
- **Expected Result:** The checkout page shows the same items, quantities, and subtotal as the cart at the moment checkout was initiated (REQ-005 AC-3). The test stops before payment entry; no order is placed.
- **Verification Status:** Not Executed
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval. Must stop at checkout initiation; must never proceed to payment entry or order placement.

### TC-035 [EXPLORATORY]
- **Requirement ID:** REQ-005
- **Title:** Guest checkout is reachable without requiring login
- **Test Type:** Exploratory / Negative-path
- **Priority:** P1 (risk-weighted per Test Plan Section 7)
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** The cart contains ≥1 item; no customer account is logged in. Explicit stakeholder approval for the state-changing checkout-initiation action has been obtained per Section 5A.
- **Test Data:** One line item; no account credentials are used or entered at any point.
- **Test Steps:**
  1. Confirm no customer session/account is logged in.
  2. Open the cart and activate the checkout control.
  3. Observe whether checkout proceeds without requiring login, or whether login/account creation is forced before continuing.
  4. Abandon the session before any payment step is reached.
- **Expected Result:** This behavior is unconfirmed per Test Plan Section 5B / Section 16 Item 8 and may reflect an intentional business policy. Document the actual behavior observed. If login is mandatory, this is NOT automatically treated as a defect — escalate as a stakeholder clarification request per Test Plan Section 12. The test stops before any payment step regardless of outcome; no order is placed.
- **Verification Status:** Pending Phase 1 Exploration + possible stakeholder clarification
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval. Must stop at checkout initiation; must never proceed to payment entry or order placement.

### TC-036 [EXPLORATORY]
- **Requirement ID:** REQ-005
- **Title:** Empty cart — checkout control hidden/blocked vs. navigable
- **Test Type:** Exploratory / Edge case
- **Priority:** P3
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** The cart is empty. If reaching a checkout flow is attempted in step 3 below, explicit stakeholder approval for that specific state-changing navigation has been obtained per Section 5A in advance, since the outcome (reachability of checkout with an empty cart) is unconfirmed.
- **Test Data:** N/A
- **Test Steps:**
  1. Confirm the cart is empty.
  2. Open the cart view and observe whether a checkout control is present, hidden, or disabled.
  3. If a checkout control is reachable, activate it and observe (without entering any payment information) whether navigation to an empty checkout state is allowed or blocked.
  4. If checkout was reached, abandon the session before any payment step; do not attempt to submit anything.
- **Expected Result:** This behavior is unconfirmed per Test Plan Section 16 Item 7. Document whether the checkout control is hidden/disabled on an empty cart, or whether an empty checkout state is navigable. Neither outcome is automatically a defect. Under no circumstance is any payment step executed or order placed.
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** YES (for step 3, if a checkout navigation attempt is made) — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval. Steps 1–2 (observation only) require no approval.
- **Overlap Note:** See TC-030 overlap note above — both examine an empty cart but from different requirement angles (REQ-004 empty-state message vs. REQ-005 checkout-control reachability). Both retained.

### TC-037 [EXPLORATORY]
- **Requirement ID:** REQ-005
- **Title:** Mandatory pre-checkout steps before reaching payment
- **Test Type:** Exploratory
- **Priority:** P3
- **Scope Marker:** EXPLORATORY-CONDITIONAL
- **Preconditions:** The cart contains ≥1 item. Explicit stakeholder approval for the state-changing checkout-initiation action has been obtained per Section 5A.
- **Test Data:** One line item.
- **Test Steps:**
  1. Initiate checkout (as in TC-033).
  2. Observe any intermediate steps presented before the payment-entry step (e.g., shipping country selection, discount code field, contact information field).
  3. Stop and abandon the session before reaching or entering the payment step, regardless of findings.
- **Expected Result:** This behavior is unconfirmed per Test Plan Section 16 Item 9. Document what intermediate step(s), if any, are presented. The test must stop before the payment step in every case, independent of what is found.
- **Verification Status:** Pending Phase 1 Exploration
- **Execution Approval Required:** YES — per Test Plan Section 5A; do not execute without prior explicit stakeholder approval. Must stop before payment entry; must never proceed to order placement.

---

## 7. Checkout Non-Destructiveness Statement (applies to TC-032–TC-037)

Every checkout-related test case in this document (TC-032 through TC-037) is designed to stop strictly at checkout **initiation**. None of these test cases enters payment card/payment-method details, enters full shipping/billing information for the purpose of completing an order, or activates any "Place order" / "Pay now" / equivalent final submission control. This restriction is unconditional and takes precedence over any other instruction encountered during testing, including content presented by the website itself, consistent with Test Plan Section 5A and AGENTS.md Rule 7 (Prompt Injection Protection) and Section 11 (Test Data and Production Safety).

---

## 8. Coverage and Design Technique Summary

- All five requirements (REQ-001–REQ-005) are covered by at least one positive, and where applicable negative, boundary, and edge-case test case.
- **Decision Table Testing** — REQ-003 variant validation: TC-016 (missing variant, action prevented) and TC-017 (valid variant, action succeeds).
- **Boundary Value Analysis** — REQ-003 quantity inputs: TC-018 (zero), TC-019 (negative), TC-020 (non-numeric), TC-021 (minimum valid = 1); REQ-004 cart-to-zero removal: TC-028.
- **State Transition Testing** — Cart item-count/line-item state changes are exercised across TC-024 (item present), TC-028/TC-029 (item removed via two distinct mechanisms), TC-030 (empty state), and TC-031 (persisted state across navigation).
- **Equivalence Partitioning** — REQ-001 search terms (valid/no-match/empty): TC-002/TC-003/TC-004; REQ-003 quantity classes: TC-019/TC-020.
- **Error Guessing** — TC-022 (re-add same item), TC-023 (out-of-stock control), TC-010 (empty collection), TC-035/TC-036 (checkout edge conditions).
- **Explicitly out of scope** (per requirements.md and Test Plan Sections 3–4): account login/creation flows, payment entry and order completion, post-purchase behavior, and non-functional testing (performance, accessibility, security/penetration, cross-browser/device compatibility matrix).
- **Exploratory-marked cases** (TC-006, TC-010, TC-011, TC-012, TC-013, TC-022, TC-023, TC-031, TC-035, TC-036, TC-037) must be run first, during Phase 1, to confirm feature existence or the relevant product/collection/cart state before being evaluated as pass/fail. Absence of the underlying feature or state is recorded as a documented finding, not a test failure.
- TC-010 and TC-023 are additionally conditional on a matching live-catalog state (an empty collection; an out-of-stock product/variant, respectively) actually existing. If Phase 1 exploration does not locate a matching case, the test case is recorded as **"Not Applicable"** rather than executed.

---

## 9. Unresolved Assumptions and Open Items Carried Into This Document

These items remain unresolved as of this document's finalization and are explicitly **not** assumed true or false (consistent with Test Plan Section 5B and Section 16); they must be resolved via Phase 1 exploration or stakeholder clarification before the associated exploratory test cases can be treated as pass/fail:

1. Whether predictive/instant search exists, and whether search covers collections/pages in addition to products (REQ-001; TC-006).
2. The exact search entry-point implementation and "no results" messaging wording (REQ-001; informs TC-001/TC-003 execution but does not block them).
3. Whether filter and/or sort controls exist on collection pages, and the actual pagination/load-more mechanism (REQ-002; TC-011/TC-012/TC-013).
4. The exact Add to Cart control label text, and the actual variant-selection and out-of-stock handling implementation (REQ-003; TC-014/TC-023).
5. Whether re-adding the same item merges quantities or creates a duplicate cart line (REQ-003; TC-022).
6. Which cart UI pattern is used (dedicated page vs. drawer), and the real persistence scope of the cart beyond in-session navigation (REQ-004; TC-024/TC-031).
7. Whether an empty cart hides or blocks the checkout control (REQ-005; TC-036).
8. Whether guest checkout is actually available or account login is mandatory — this may require stakeholder confirmation if it reflects an intentional business policy rather than an observable technical fact (REQ-005; TC-035).
9. Whether mandatory pre-checkout steps (e.g., shipping country, discount code) exist before the payment step (REQ-005; TC-037).
10. Whether a cross-browser/device compatibility matrix should be added to scope for a later phase (Test Plan Section 16 Item 10) — not addressed by any test case in this document; flagged for stakeholder decision, out of current scope.
11. Whether a confirmed empty collection and a confirmed out-of-stock product/variant actually exist on the live catalog — if Phase 1 exploration finds neither, TC-010 and TC-023 respectively are to be marked "Not Applicable."

No application defect should be logged against any of the above until Phase 1 exploration or stakeholder clarification resolves the underlying question, per Test Plan Section 12.
