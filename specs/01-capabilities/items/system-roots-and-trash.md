# System Roots and Trash

## Purpose

Give projects predictable areas for output content, support material, and
recoverable deletion.

## Functional requirements

- **FR-PROJITEM-010** — Each project shall expose Draft, Research, and Trash
  system roots.
- **FR-PROJITEM-011** — Only eligible descendants of Draft shall participate in
  the default compile set.
- **FR-PROJITEM-012** — Deleting an item shall move it to Trash by default.
- **FR-PROJITEM-013** — The user shall restore trashed items to a valid
  destination.
- **FR-PROJITEM-014** — Emptying Trash shall require explicit confirmation.

## Acceptance scenarios

### Restore item

```gherkin
Given an item in Trash
When the user restores it
Then it returns to a valid project location with content and metadata intact
```

## Edge cases

- Original parent deleted.
- Name collision on restore.
- Trash used during compile.

## Dependencies

- Project model and persistence.
