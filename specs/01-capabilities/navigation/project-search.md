# Project Search and Replace

## Purpose

Find items by content and metadata across a project.

## Functional requirements

- **FR-NAV-001** — Project search shall query titles and text at minimum.
- **FR-NAV-002** — Search results shall reference source items without
  duplicating them.
- **FR-NAV-003** — The user shall narrow search by supported fields and matching
  rules.
- **FR-NAV-004** — Project-wide replace shall preview scope and require explicit
  execution.

## Acceptance scenarios

### Search text

```gherkin
Given two items containing a term
When the project is searched for that term
Then both items appear and can be opened
```

### Replace preview

```gherkin
Given multiple matches
When project replace is prepared
Then affected items and match counts are shown before mutation
```

## Edge cases

- Regular-expression errors.
- Unsaved edits.
- Matches in excluded research.

## Dependencies

- Project model and persistence.
