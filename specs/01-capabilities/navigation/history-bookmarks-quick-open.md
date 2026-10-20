# History, Bookmarks, and Quick Open

## Purpose

Move rapidly among frequently used or recently viewed resources.

## Functional requirements

- **FR-NAV-010** — Each editor shall maintain back and forward navigation
  history.
- **FR-NAV-011** — Quick Open shall locate items by title and supported aliases.
- **FR-NAV-012** — Bookmarks shall reference project items or validated external
  resources.
- **FR-NAV-013** — Broken bookmark targets shall remain diagnosable and
  removable.

## Acceptance scenarios

### Back navigation

```gherkin
Given items A then B were opened
When Back is invoked
Then A opens in the same editor
```

## Edge cases

- Renamed items.
- Duplicate titles.
- Offline URLs.

## Dependencies

- Project model and persistence.
