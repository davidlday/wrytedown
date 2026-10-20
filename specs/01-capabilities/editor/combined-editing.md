# Combined Editing

## Purpose

Read and edit multiple ordered text items in one continuous session.

## Functional requirements

- **FR-EDIT-010** — The user shall open an ordered selection or container
  descendants in a combined view.
- **FR-EDIT-011** — The combined view shall visually distinguish item
  boundaries.
- **FR-EDIT-012** — Edits in a segment shall update the corresponding source
  item.
- **FR-EDIT-013** — Non-text items shall be omitted or represented without
  corrupting ordering.

## Acceptance scenarios

### Edit segment

```gherkin
Given items A and B in a combined view
When text in B is changed
Then only B’s source content changes
```

## Edge cases

- Empty items.
- Recursive containers.
- Item moved while session is open.

## Dependencies

- Project model and persistence.
