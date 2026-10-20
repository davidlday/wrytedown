# Revisions and Linguistic Tools

## Purpose

Support review passes and text-quality aids.

## Functional requirements

- **FR-WRITE-020** — The user shall mark revision text with a named revision
  level.
- **FR-WRITE-021** — Revision appearance shall be separable from exported
  output.
- **FR-WRITE-022** — Spelling and language tools shall respect the selected
  language where available.
- **FR-WRITE-023** — Text substitutions shall be configurable and reversible.

## Acceptance scenarios

### Mark revision

```gherkin
Given selected text
When a revision level is applied
Then the text carries that revision metadata and remains editable
```

## Edge cases

- Mixed languages.
- Unsupported dictionaries.
- Pasted revision markup.

## Dependencies

- Project model and persistence.
