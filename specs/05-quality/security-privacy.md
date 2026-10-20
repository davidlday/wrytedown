# Security and Privacy Specification

## Threats

- Malformed project data and imported files.
- Path traversal during import/export.
- Active content in web archives or document formats.
- Accidental manuscript disclosure through logs or telemetry.
- Unsafe temporary files and backups.

## Controls

- Canonicalize and constrain all filesystem paths.
- Parse untrusted formats in restricted adapters where feasible.
- Never execute imported scripts or macros implicitly.
- Redact user content from diagnostics by default.
- Apply platform file permissions to projects, backups, and temporary output.
- Document what cloud providers may observe when users place projects in
  synchronized folders.
