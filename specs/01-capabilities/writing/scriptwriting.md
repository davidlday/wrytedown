# Scriptwriting Mode

## Purpose

Apply element-aware formatting and navigation for screenplay-like documents.

## Functional requirements

- **FR-WRITE-030** — A project may define named script elements and transition
  rules.
- **FR-WRITE-031** — The editor shall apply element formatting without embedding
  export-only page layout assumptions in content.
- **FR-WRITE-032** — The user shall change an existing paragraph’s script
  element type.

## Acceptance scenarios

### Advance element

```gherkin
Given a script paragraph and configured transition
When a new paragraph begins
Then the configured next element becomes active
```

## Edge cases

- Custom script formats.
- Import/export round trips.
- Pagination differences.

## Dependencies

- Project model and persistence.
