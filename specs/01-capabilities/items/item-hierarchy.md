# Item Hierarchy

## Purpose

Model a manuscript as ordered, nested, independently addressable units.

## Functional requirements

- **FR-PROJITEM-001** — Each item shall have a stable identifier, title, type,
  parent, and sibling order.
- **FR-PROJITEM-002** — An item may contain text, children, or both.
- **FR-PROJITEM-003** — The user shall create, rename, duplicate, move, and
  reorder items.
- **FR-PROJITEM-004** — Moving an item shall move its descendants as one
  subtree.
- **FR-PROJITEM-005** — The system shall prevent hierarchy cycles.

## Acceptance scenarios

### Reorder section

```gherkin
Given three sibling items A, B, and C
When C is moved before A
Then the persisted and compiled order is C, A, B
```

### Move subtree

```gherkin
Given a container with descendants
When the container moves to another valid parent
Then all descendants retain relative order
```

## Edge cases

- Empty titles.
- Very deep nesting.
- Multi-selection with ancestor and descendant.

## Dependencies

- Project model and persistence.
