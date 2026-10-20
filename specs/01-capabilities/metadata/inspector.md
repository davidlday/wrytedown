# Inspector

## Purpose

Edit and inspect auxiliary information for the active item.

## Functional requirements

- **FR-META-001** — The inspector shall follow the active editor selection.
- **FR-META-002** — The inspector shall expose synopsis, notes, core metadata,
  bookmarks, and annotations when supported.
- **FR-META-003** — Inspector changes shall persist to the selected item only.

## Acceptance scenarios

### Follow active editor

```gherkin
Given split editors showing A and B
When B becomes active
Then the inspector displays B’s information
```

## Edge cases

- Group selection.
- No selection.
- Unsupported metadata type.

## Dependencies

- Project model and persistence.
