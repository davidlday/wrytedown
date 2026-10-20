# Wryte File Format Specification

**Specification:** Wryte Project Archive Format

**Version:** 0.1.0-draft

**File Extension:** `.wryte`

**Media Type:** `application/vnd.wrytedown.project+zip`

**Format Identifier:** `org.wrytedown.wryte`

---

# 1. Overview

The Wryte Project Archive Format is an open, ZIP-compatible container for
long-form writing projects. The format is inspired by the structural principles
of Java Archive (`.jar`) files:

- ZIP-based container
- Distinguished `META-INF/` metadata directory
- Authoritative manifest
- Versioned metadata
- Entry-level metadata
- Integrity support
- Extensibility and forward compatibility

Unlike `.jar` files, `.wryte` archives contain portable writing content rather
than executable code.

---

# 2. Archive Structure

```text
mimetype
META-INF/
  manifest.yaml
project.yaml
binder.yaml
documents/
notes/
assets/
research/
compile/
styles/
provenance/
extensions/
```

## Required Entries

```text
mimetype
META-INF/manifest.yaml
project.yaml
binder.yaml
```

---

# 3. Archive Identification

The first archive entry MUST be:

```text
mimetype
```

Contents:

```text
application/vnd.wrytedown.project+zip
```

Requirements:

- Stored uncompressed
- First entry in archive
- UTF-8
- No trailing newline

---

# 4. ZIP Requirements

Writers MUST:

- Use UTF-8 entry names
- Use `/` path separators
- Use relative paths
- Use `store` or `deflate` compression
- Prevent duplicate paths
- Prevent path traversal
- Reject symbolic links
- Reject device entries
- Reject encrypted archives

---

# 5. META-INF Directory

`META-INF/` contains archive-level metadata.

## Required Manifest

```text
META-INF/manifest.yaml
```

Responsibilities:

- Format identification
- Version declaration
- Feature declaration
- Entry inventory
- Integrity metadata

---

# 6. Manifest

Example:

```yaml
format: org.wrytedown.wryte
format_version: 1
specification_version: "0.1.0"

project_entry: project.yaml
binder_entry: binder.yaml

features:
  required:
    - core-1
    - markdown.commonmark-1
    - yaml.safe-1

entries:
  - path: project.yaml
    role: project
    media_type: application/yaml
```

## Required Fields

| Field                 | Description                        |
| --------------------- | ---------------------------------- |
| format                | Format identifier                  |
| format_version        | Major format version               |
| specification_version | Spec revision                      |
| project_entry         | Project metadata                   |
| binder_entry          | Binder metadata                    |
| features              | Required and optional capabilities |
| entries               | Archive inventory                  |

---

# 7. Text Encoding

All text content MUST:

- Use UTF-8
- Omit BOM
- Use LF line endings

---

# 8. YAML Rules

Allowed types:

- Mapping
- Sequence
- String
- Boolean
- Null
- Integer
- Decimal number

Prohibited:

- Anchors
- Aliases
- Custom tags
- Merge keys
- Duplicate keys

Dates MUST use RFC 3339 strings.

Example:

```yaml
created: "2026-10-17T14:11:42Z"
```

---

# 9. Object Identifiers

Persistent objects use UUID identifiers.

Example:

```text
0192c410-785b-7bb4-8516-90b0811d86c7
```

Recommendations:

- UUIDv7 preferred
- UUIDv4 permitted

Identifiers remain stable across:

- Moving
- Renaming
- Reorganization

---

# 10. Project Metadata

Stored in:

```text
project.yaml
```

Example:

```yaml
schema: wryte-project-1
id: 0192c3ec-e680-73fb-823a-2e6d5cf0592f
title: The Clockmaker's Map
created: "2026-10-17T14:11:42Z"
modified: "2026-10-17T14:32:08Z"
binder_root: 0192c401-22cf-738e-a0b0-1696db390923
```

---

# 11. Binder Model

Stored in:

```text
binder.yaml
```

The binder represents a rooted ordered tree.

Example:

```yaml
schema: wryte-binder-1
root: 0192c401-22cf-738e-a0b0-1696db390923
```

## Node Types

- folder
- document
- note
- research
- asset
- link
- separator

---

# 12. Markdown Documents

Documents are stored in:

```text
documents/
```

Each binder document normally maps to one Markdown file.

Example:

```markdown
The envelope had been waiting beneath the loose floorboard.
```

Requirements:

- UTF-8
- CommonMark-compatible
- No required front matter
- Independent of binder title

---

# 13. Internal Links

URI scheme:

```text
wryte:
```

Examples:

```text
wryte:document/<uuid>
wryte:note/<uuid>
wryte:asset/<uuid>
```

---

# 14. Notes

Stored in:

```text
notes/
```

Format:

- Markdown
- UTF-8

Notes may be associated with one or more binder nodes.

---

# 15. Assets

Stored in:

```text
assets/<id>/
```

Examples:

- Images
- Audio
- Video
- Diagrams
- Reference resources

---

# 16. Research

Stored in:

```text
research/
```

Supported examples:

- PDF
- Markdown
- Plain text
- Images
- Bibliographic data

---

# 17. Compilation

Compile profiles are stored in:

```text
compile/profiles/
```

Purpose:

- Select manuscript content
- Assemble content
- Transform output
- Export results

---

# 18. Extensions

Stored in:

```text
extensions/<namespace>/
```

Namespace format:

```text
org.example.plugin
```

Extensions:

- Must not replace core semantics
- Must remain namespaced
- Must declare required features

---

# 19. Integrity

Optional feature:

```text
integrity.sha256-1
```

Digest example:

```yaml
sha256: da8ad6e40c2e6e75bcf177e72cb8b6b4e442c69590940132f02f9c3eb8f56d4b
```

---

# 20. Versioning

Manifest fields:

```yaml
format_version: 1
specification_version: "0.1.0"
```

Rules:

- `format_version` defines compatibility boundary
- `specification_version` identifies document revision

---

# 21. Canonical Serialization

Canonical archives SHOULD:

1. Store `mimetype` first
2. Store `mimetype` uncompressed
3. Sort remaining entries by path
4. Use UTF-8
5. Use LF newlines
6. Use deterministic metadata

---

# 22. Transactional Saving

Recommended process:

1. Read archive
2. Validate archive
3. Write temporary archive
4. Validate temporary archive
5. Atomically replace original archive

Editors MUST NOT modify the only valid project archive in-place.

---

# 23. Security

Implementations MUST defend against:

- ZIP bombs
- Path traversal
- Duplicate entries
- Symlink attacks
- Malformed YAML
- Binder cycles
- Malicious HTML
- Oversized files

All `.wryte` files MUST be treated as untrusted input.

---

# 24. Minimal Valid Archive

```text
mimetype
META-INF/manifest.yaml
project.yaml
binder.yaml
documents/chapter.md
```

---

# 25. Conformance Levels

## Reader

Can read Wryte archives.

## Writer

Can create Wryte archives.

## Editor

Can modify projects safely.

## Compiler

Can generate output documents.

## Validator

Can verify correctness and security.

---

# 26. Reference Rust Architecture

```text
crates/
  wryte-format/
  wryte-archive/
  wryte-markdown/
  wryte-validate/
  wryte-compile/
  wryte-migrate/
  wryte-cli/
  wrytedown-app/
```

Design Rule:

The format layer MUST remain independent of the desktop UI.

---

# 27. Summary

A `.wryte` file is:

```text
ZIP
├── mimetype
├── META-INF/manifest.yaml
├── project.yaml
├── binder.yaml
├── documents/
├── notes/
├── assets/
├── research/
├── compile/
└── extensions/
```

The format combines the container discipline of JAR files with open Markdown and
YAML content for long-form writing projects.p[]
