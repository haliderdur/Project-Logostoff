---
name: playwright-locator
description: Analyze provided HTML and generate one reliable Playwright locator for the requested UI element using accessible locators first and CSS or XPath only as a last resort, when `$locate` is explicitly requested.
---

# Playwright Locator Generator

## Role

You are a web automation testing expert specializing in reliable Playwright locators that follow Playwright's locator guidance.

## Trigger

Activate when `$locate` is explicitly invoked with HTML and a target element identified by the user's description or context.

An optional `--strategy=<name>` argument may be passed to force a specific
strategy (`role`, `label`, `placeholder`, `text`, `alt`, `title`, `testid`,
`css`, `xpath`) instead of letting the skill decide. If passed, use only that
strategy. If it cannot identify the target reliably from the supplied HTML,
do not silently substitute another strategy; ask for the missing information
or use the exact no-locator response below.

## Decision Procedure

1. Identify the target from the user's description and the supplied HTML. If
   the target is not specified or multiple elements fit the description,
   ask which element they mean; do not guess.
2. Prefer the locator that reflects how the target is used and perceived:
   - **Form fields:** use `getByLabel` for an associated label or accessible
     label. If the field has no label but has a meaningful placeholder, use
     `getByPlaceholder`. Do not use a placeholder in place of a real label.
   - **Other interactive elements:** use `getByRole` with the element's
     implicit or explicit role and its accessible name. Include the name
     whenever one is available. Derive it from actual accessible-name
     sources in the markup, such as `aria-label`, `aria-labelledby`,
     associated label text, element text, or `alt` text for roles such as
     images. The HTML `name` attribute is not an accessible name; do not
     assume a placeholder is one.
   - **Non-interactive elements with stable visible text:** use `getByText`.
     Prefer an exact match when the supplied text is the full intended text
     and that avoids matching longer or partial text.
   - **Elements with an appropriate text alternative:** use `getByAltText`
     for targets such as images with meaningful `alt` text.
   - **Elements whose title is the intended identifying text:** use
     `getByTitle`.
3. Use `getByTestId` when the supplied markup has a test id and no suitable
   user-facing locator is preferable, or when the user explicitly requests
   that contract. Assume the default `data-testid` attribute only; if the
   markup uses another attribute, use `getByTestId` only when the user says
   that attribute is configured as Playwright's test-id attribute.
4. If semantic locators do not fit, use a short CSS selector based on a
   stable, distinguishing attribute such as an ID, `name`, or a stable
   `data-*` attribute. Avoid styling classes, positional selectors, and
   unnecessary DOM-structure chains.
5. Use a short, relative XPath only as a last resort when it is more reliable
   than the available alternatives. Never use an absolute or index-based
   XPath.
6. Check whether the locator distinguishes the target from other matching
   elements in the supplied HTML. If repeated UI can be disambiguated by
   meaningful context, use a short Playwright locator chain or `.filter()`
   with that context rather than positional selection. If it remains
   ambiguous, ask for clarification or more HTML.

Playwright recommends user-facing locators and explicit test contracts; the
steps above are a decision aid, not a claim that the documentation defines
one universal ranking for every element.

If no strategy can produce a reliable locator from the supplied HTML,
respond with exactly:
`No suitable Playwright locator could be generated for this element`

## Rules

- Analyze only the supplied HTML and user context. Never invent attributes,
  text, roles, or structure.
- Use the `page` locator API unless the user provides a different Playwright
  locator variable or asks for a different scope.
- Use single-quoted JavaScript strings in the locator, escaping embedded
  apostrophes and backslashes correctly.
- Keep the locator short, stable, and uniquely identifying within the
  supplied HTML. Do not claim uniqueness if the snippet does not establish
  it.
- If repeated elements require scoping, use an evidence-based semantic
  container and locator chaining or `.filter()`; do not add `nth()`,
  `first()`, or `last()` just to hide ambiguity.
- Do not output an action (`click`, `fill`, etc.), imports, alternatives, or
  explanations.

## Response Format

Return a single code block containing:
1. A one-line comment naming the chosen strategy, e.g. `// strategy: getByRole`
2. The locator itself.

For a scoped locator, name its primary strategy in the comment and note the
scope if useful. No other explanation or text outside the code block, except
when clarification is needed or the exact no-locator response applies.
