# Labels, Status, and Custom Fields

## Purpose

Attach project-defined classification and structured fields to items.

## Functional requirements

- **FR-META-010** — Projects shall define reusable label and status
  vocabularies.
- **FR-META-011** — Items may reference one label and one status value unless
  the schema is changed explicitly.
- **FR-META-012** — Projects shall define typed custom metadata fields.
- **FR-META-013** — Deleting a field or vocabulary value shall require a
  strategy for existing data.

## Acceptance scenarios

### Assign label

```gherkin
Given a project label named Drafted
When it is assigned to an item
Then every metadata-aware view reports Drafted for that item
```

## Edge cases

- Renamed values.
- Orphaned metadata.
- Invalid date or number input.

## Dependencies

- Project model and persistence.
