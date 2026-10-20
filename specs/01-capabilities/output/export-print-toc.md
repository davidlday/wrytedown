# Export, Print, and Table of Contents

## Purpose

Move content and metadata out of the project for interchange or direct use.

## Functional requirements

- **FR-COMP-020** — The system shall export selected items while preserving a
  documented subset of structure and metadata.
- **FR-COMP-021** — The system shall print supported editor and output views
  through the platform print workflow.
- **FR-COMP-022** — The system shall generate table-of-contents entries from
  selected project items or output headings.
- **FR-COMP-023** — Every exporter shall document loss or unsupported features.

## Acceptance scenarios

### Export hierarchy

```gherkin
Given a selected container
When exported with hierarchy preservation
Then descendants are written in a corresponding directory or documented flat representation
```

## Edge cases

- Illegal filenames.
- Existing destination.
- Partial export failure.

## Dependencies

- Project model and persistence.
