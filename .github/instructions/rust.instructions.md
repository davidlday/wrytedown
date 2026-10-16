---
applyTo: "**/*.rs"
---

# Rust Development Standards

Use idiomatic Rust.

Prefer:

- Strong typing
- Explicit error handling
- Result types
- Well-defined traits

Avoid:

- unwrap()
- expect()

unless justified in tests.

## Error Handling

User-facing errors must:

- Be actionable
- Preserve context
- Avoid leaking internals

## Dependency Philosophy

Prefer:

- Small focused dependencies
- Mature crates

Before adding a crate:

- Justify the need.
- Evaluate maintenance status.
- Document rationale.
- Review for security implications.
- Ensure compatibility with existing architecture.
