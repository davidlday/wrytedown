# Styles and Formatting

## Purpose

Apply reusable semantic or visual formatting while preserving export
flexibility.

## Functional requirements

- **FR-WRITE-010** — Projects shall define reusable paragraph and character
  styles.
- **FR-WRITE-011** — Styled text shall reference a style identity rather than
  rely only on copied visual attributes.
- **FR-WRITE-012** — Compile formats may map source styles to output-specific
  representations.
- **FR-WRITE-013** — Removing a style shall require fallback behavior for
  affected text.

## Acceptance scenarios

### Redefine style

```gherkin
Given text using a named style
When the style definition changes
Then all references update consistently without changing unrelated text
```

## Edge cases

- Nested styles.
- Imported unknown styles.
- Markdown mapping.

## Dependencies

- Project model and persistence.
