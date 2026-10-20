# Comments, Footnotes, and Annotations

## Purpose

Attach editorial and scholarly notes without confusing them with ordinary prose.

## Functional requirements

- **FR-WRITE-001** — The editor shall distinguish inline and linked annotations
  from body text.
- **FR-WRITE-002** — Comments and footnotes shall retain anchors as text
  changes.
- **FR-WRITE-003** — Compile rules shall independently include, transform, or
  omit each note category.
- **FR-WRITE-004** — Orphaned anchors shall be surfaced for repair.

## Acceptance scenarios

### Exclude comments

```gherkin
Given text with a comment
When compiled with comments excluded
Then body text is present and comment content is absent
```

## Edge cases

- Deleted anchor range.
- Overlapping annotations.
- Copy/paste across items.

## Dependencies

- Project model and persistence.
