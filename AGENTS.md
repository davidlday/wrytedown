# Wrytedown Governance

This document is the authoritative source of project governance for Wrytedown.

All contributors, maintainers, and AI agents must follow this document.

If guidance conflicts, the order of precedence is:

1. AGENTS.md
2. Approved ADRs
3. Approved Specifications
4. Architecture Documentation
5. Existing Implementation

---

## Mission

Wrytedown empowers writers with a professional, cross-platform writing
environment built on open standards, user ownership, and long-term
accessibility.

The project exists to:

- Preserve user ownership of content.
- Use open and documented formats.
- Support professional writing workflows.
- Maintain feature parity across Linux, macOS, and Windows.
- Remain accessible to future tools, workflows, and AI technologies.

---

## Vision

Create a future in which creative work remains permanently owned by its
creators, accessible through open formats, and independent of any single
application, company, platform, or technology.

---

## Core Principles

### User Ownership

Users own their data.

Content created in Wrytedown must remain accessible outside Wrytedown whenever
reasonably possible.

Prefer:

- Markdown
- YAML
- JSON
- Plain text

Avoid proprietary or undocumented formats.

### Open Standards

Use established standards before inventing new ones.

Examples include:

- CommonMark
- Pandoc-compatible Markdown
- YAML
- Unicode
- ZIP-compatible archives

### Offline First

Core writing workflows must not require:

- Internet access
- Cloud services
- User accounts
- Commercial subscriptions

### Cross-Platform Parity

Features are not complete until they work consistently on:

- Windows
- macOS
- Linux

Platform-specific behavior must be documented and justified.

### Accessibility

Accessibility is a first-class requirement.

Every feature should consider:

- Keyboard navigation
- Screen readers
- High-contrast themes
- UI scaling
- Color accessibility

### Sustainable Engineering

Favor:

- Clarity
- Simplicity
- Maintainability
- Predictability

Over:

- Cleverness
- Novelty
- Premature optimization

---

## Architectural Principles

### Separation of Concerns

Keep the following concerns independent whenever practical:

- User Interface
- Domain Logic
- Storage
- Search
- Export
- AI Integration

### Replaceable Components

Major subsystems should be replaceable without requiring large-scale rewrites.

Avoid unnecessary coupling.

### Explicit Design

Architecture should be understandable from:

- Source code
- Documentation
- ADRs

Avoid hidden behavior and undocumented conventions.

---

## AI Principles

Wrytedown is AI-ready but not AI-dependent.

AI features should:

- Be optional
- Respect privacy
- Fail gracefully
- Prefer local execution when practical
- Avoid vendor lock-in

AI features must not:

- Be required for writing workflows
- Modify user content without explicit intent
- Restrict access to user data

---

## Project Format Principles

The Wrytedown project format must be:

- Documented
- Recoverable
- Extensible
- Versionable
- Human-inspectable where practical

The format should be based on:

- Markdown
- YAML
- Asset directories
- ZIP-compatible packaging

Canonical documentation belongs in:

docs/architecture/project-format/

---

## Documentation Structure

Project documentation is organized under:

docs/ ├── vision/ ├── architecture/ ├── specifications/ ├── decisions/ └──
user-guides/

---

## Development Expectations

For significant changes:

1. Understand the problem.
2. Review relevant documentation.
3. Create or update a specification when necessary.
4. Update ADRs when architecture changes.
5. Implement.
6. Test.
7. Document.

---

## Definition of Done

A feature is complete when:

- Implementation exists.
- Tests exist.
- Acceptance criteria are satisfied.
- Documentation is updated.
- Accessibility impact has been considered.
- Cross-platform impact has been considered.

---

## Contributor Expectations

Contributors should:

- Leave the codebase better than they found it.
- Prefer incremental improvements.
- Document significant decisions.
- Reduce unnecessary complexity.
- Preserve user data whenever possible.

---

## AI Agent Expectations

Before making significant changes:

1. Read AGENTS.md.
2. Read relevant specifications.
3. Read relevant architecture documentation.
4. Read relevant ADRs.
5. Produce a plan.

If required documentation does not exist:

- Create a proposal.
- Do not invent architecture.
- Do not establish new conventions implicitly.

---

## Governance

Changes to AGENTS.md are governance-level changes.

Such changes should be reviewed with the same care applied to major
architectural decisions.
