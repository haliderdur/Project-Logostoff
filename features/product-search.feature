Feature: Logostoff Product Search
  As a website visitor
  I want to search for products by keyword
  So that I can quickly find products I am interested in

  # REQ-001: Site-wide product search
  # Scope: TC-001 through TC-005 (CONFIRMED-SCOPE).
  # TC-006 (predictive/instant search) is EXCLUDED from this file — it is an
  # exploratory, unconfirmed investigation (Pending Phase 1 Exploration) per
  # docs/test-cases/test-cases.md and must not be treated as a guaranteed
  # behavior until its existence is confirmed on the live site.
  #
  # Tagging convention used in this file:
  # @pending-verification — the scenario's successful execution depends on
  #   something not yet confirmed on the live site (e.g. a search entry point
  #   existing on a given page type, or a "known matching product keyword"
  #   that has not yet been established via Phase 1 exploration). These
  #   scenarios should be filtered out of normal execution runs until the
  #   underlying assumption is confirmed.
  # @pending-clarification — the expected behavior itself is not yet defined
  #   or agreed upon (not just an unconfirmed fact about the site), and the
  #   scenario exists to record an open question rather than assert a
  #   confirmed outcome.

  @REQ-001 @TC-001
  Scenario: Search entry point is accessible from the homepage header
    Given I navigate to the Logostoff homepage
    Then a search entry point should be visible in the header

  @REQ-001 @TC-001 @pending-verification
  Scenario Outline: Search entry point is accessible from the header on other page types
    # The presence of a header search entry point on these page types has not
    # been confirmed; requirements.md only explicitly discusses the homepage
    # header search icon.
    Given I navigate to the Logostoff <page type>
    Then a search entry point should be visible in the header

    Examples:
      | page type            |
      | collection page       |
      | product detail page   |

  @REQ-001 @TC-002 @pending-verification
  Scenario: Searching for a known product keyword returns matching results
    # Relies on a "known matching product keyword" that has not yet been
    # confirmed via Phase 1 exploration.
    Given I navigate to the Logostoff homepage
    When I search for a known matching product keyword
    Then the search results should display at least one matching product
    And each result should show a product image, title, and price

  @REQ-001 @TC-003 @pending-verification
  Scenario: Searching for a term with no matches shows a no-results state
    # Relies on a "known matching product keyword" assumption elsewhere in
    # this file being valid for the search feature to be exercised at all;
    # the exact no-results indication's wording is unconfirmed, so this
    # scenario asserts behavior only, not literal copy.
    Given I navigate to the Logostoff homepage
    When I search for "zzxynonexistentproduct123"
    Then an indication that no results were found should be displayed
    And no application error or blank page should occur

  # TC-004 (empty search query) is intentionally omitted from this file for
  # now: its expected behavior is not yet defined (open question, not just an
  # unconfirmed fact about the site), so no scenario is drafted until that is
  # resolved. See docs/test-cases/test-cases.md for the underlying test case.

  @REQ-001 @TC-005 @pending-verification
  Scenario: Selecting a search result navigates to the correct product page
    # Relies on a "known matching product keyword" that has not yet been
    # confirmed via Phase 1 exploration.
    Given I navigate to the Logostoff homepage
    When I search for a known matching product keyword
    And I select the first result from the search results
    Then I should be taken to the product detail page matching that result's title
