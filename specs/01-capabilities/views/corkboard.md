# Corkboard

## Purpose

Represent child items as reorderable cards with titles, synopses, and selected
metadata.

## Functional requirements

- **FR-VIEW-010** — Each visible card shall reference exactly one project item.
- **FR-VIEW-011** — A card shall expose title and synopsis.
- **FR-VIEW-012** — Reordering cards shall reorder the corresponding sibling
  items.
- **FR-VIEW-013** — The user shall switch between ordered and freeform card
  arrangements without losing project order.
- **FR-VIEW-014** — An optional grouped view shall organize cards by a chosen
  categorical field.

## Acceptance scenarios

### Reorder cards

```gherkin
Given cards A, B, and C
When C is dropped before A
Then the item hierarchy order becomes C, A, B
```

## Edge cases

- Freeform coordinates after resize.
- Mixed-parent selections.
- Missing synopsis.

## Dependencies

- Project model and persistence.
