# Repository Instructions

- Specifications under `00-` through `08-` are the source of truth for behavior.
- Before coding, cite the requirement IDs being implemented.
- Do not add behavior that lacks an approved requirement; propose a spec change
  first.
- Preserve project-format backward compatibility or add a tested migration.
- Every destructive operation requires recovery or explicit confirmation.
- Add acceptance tests using the Given/When/Then scenarios in the relevant
  capability spec.
- Keep UI components separate from Project Core and Persistence.
- Never log manuscript content, imported document contents, or secrets.
- Update `00-governance/traceability.md` links in the project’s chosen tracking
  system.
