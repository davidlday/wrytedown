# Outliner

## Purpose

Show hierarchy with configurable metadata columns and bulk-edit affordances.

## Functional requirements

- **FR-VIEW-020** — The outliner shall show hierarchy, title, and optional
  synopsis.
- **FR-VIEW-021** — The user shall add, remove, resize, and reorder supported
  columns.
- **FR-VIEW-022** — Editable columns shall validate changes before persistence.
- **FR-VIEW-023** — Sorting for inspection shall not mutate manuscript order
  unless explicitly committed.

## Acceptance scenarios

### Configure columns

```gherkin
Given an outliner
When the user adds word count and status columns
Then both values appear for each applicable row
```

## Edge cases

- Mixed values in bulk edits.
- Custom field deletion.
- Recursive totals.

## Dependencies

- Project model and persistence.
