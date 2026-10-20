# Compile Pipeline

## Purpose

Transform ordered project content into publishable output without mutating
source text.

## Functional requirements

- **FR-COMP-001** — Compile shall accept an ordered inclusion set, format
  configuration, and output type.
- **FR-COMP-002** — Compile shall assemble eligible source items in hierarchy
  order.
- **FR-COMP-003** — Compile shall apply separators, title handling, formatting
  transforms, and metadata rules deterministically.
- **FR-COMP-004** — Compile shall preview configuration and report warnings
  before or during output.
- **FR-COMP-005** — Compile shall never modify project source content.

## Acceptance scenarios

### Deterministic compile

```gherkin
Given unchanged source and compile settings
When compiled twice with the same application version
Then semantic output is identical
```

### Exclude item

```gherkin
Given an item marked excluded
When the parent draft is compiled
Then the excluded item does not contribute output
```

## Edge cases

- Empty selection.
- Missing assets.
- Unsupported characters.
- Circular transforms.

## Dependencies

- Project model and persistence.
