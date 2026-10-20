# Collections

## Purpose

Create non-destructive alternate groupings and saved searches.

## Functional requirements

- **FR-ORG-001** — A static collection shall store ordered references to items.
- **FR-ORG-002** — A saved-search collection shall evaluate a stored query.
- **FR-ORG-003** — Removing an item from a collection shall not delete the item.
- **FR-ORG-004** — Deleting an item shall update or mark all collection
  references.

## Acceptance scenarios

### Remove reference

```gherkin
Given an item in a static collection
When removed from the collection
Then the source item remains in the project
```

## Edge cases

- Duplicate references.
- Items in Trash.
- Query schema migration.

## Dependencies

- Project model and persistence.
