---
applyTo: "src/**/*"
---

# Architecture Instructions

Before changing architecture:

Check:

- docs/architecture
- docs/decisions

Major architecture changes require:

- Specification update
- Architecture decision record

Prefer:

- Clear module boundaries
- Dependency inversion
- Testable components

Avoid:

- Shared mutable state
- Tight coupling
- UI logic mixed with domain logic
