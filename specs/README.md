# Wrytedown Specification Pack

This repository is a spec-driven starting point for a long-form writing
application inspired by the workflows documented in the attached macOS
writing-software manual. It is **not** a transcription, replacement manual, or
mandate to copy a particular implementation.

## How to use this pack

1. Read `00-governance/product-vision.md` and `00-governance/glossary.md`.
2. Resolve every item in `00-governance/open-questions.md`.
3. Select a vertical slice from `00-governance/implementation-roadmap.md`.
4. Treat each `FR-*` statement as a traceable functional requirement.
5. Turn each Given/When/Then scenario into an executable acceptance test.
6. Record architecture decisions in `04-architecture/adr/` before
   implementation.

## Status vocabulary

- **Observed** — directly represented in the analyzed manual.
- **Derived** — rewritten as an implementation-neutral product requirement.
- **Proposed** — a project recommendation that must be approved before
  implementation.

## Important boundary

The source manual describes a mature desktop product with a very broad feature
set. This pack separates an MVP from later capabilities so a new project can
evolve incrementally.
