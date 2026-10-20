# Non-Functional Requirements

## Reliability

- **NFR-REL-001** — No acknowledged user edit may be silently lost.
- **NFR-REL-002** — Project opening shall validate critical structural
  invariants.
- **NFR-REL-003** — Destructive operations shall be recoverable or explicitly
  confirmed.

## Performance

- **NFR-PERF-001** — Performance budgets shall be defined for project open, item
  switch, search, reorder, save, and compile.
- **NFR-PERF-002** — Long operations shall be cancellable where cancellation can
  preserve consistency.

## Security and privacy

- **NFR-SEC-001** — Imported and project-controlled content shall be treated as
  untrusted input.
- **NFR-SEC-002** — External links, scripts, and active content shall not
  execute implicitly.
- **NFR-SEC-003** — Telemetry, if any, shall exclude manuscript content by
  default.

## Accessibility

- **NFR-A11Y-001** — All MVP workflows shall be keyboard operable.
- **NFR-A11Y-002** — Controls shall expose accessible names, roles, values, and
  state.
- **NFR-A11Y-003** — Meaning shall not depend on color alone.

## Compatibility

- **NFR-COMPAT-001** — The application shall publish supported project and
  export format versions.
- **NFR-COMPAT-002** — Unsupported future project versions shall not be
  rewritten.
