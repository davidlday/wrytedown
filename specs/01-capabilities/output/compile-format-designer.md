# Compile Format Designer

## Purpose

Create reusable output-format configurations independent of project content.

## Functional requirements

- **FR-COMP-010** — A compile format shall define output transformations in a
  serializable configuration.
- **FR-COMP-011** — Formats shall support project-level duplication and editing
  without changing built-in presets.
- **FR-COMP-012** — Section layouts shall map source structure to output
  presentation.
- **FR-COMP-013** — Invalid format configurations shall fail validation before
  writing output.

## Acceptance scenarios

### Duplicate preset

```gherkin
Given a read-only built-in format
When duplicated
Then an editable independent copy is created
```

## Edge cases

- Missing fonts.
- Versioned format schema.
- Conflicting layout rules.

## Dependencies

- Project model and persistence.
