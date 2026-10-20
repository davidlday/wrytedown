# Risk Register

- **R1 Data loss:** mitigate with atomic persistence, backups, integrity checks,
  recovery drills.
- **R2 Scope explosion:** enforce MVP boundary and capability flags.
- **R3 Editor lock-in:** isolate editor through an adapter and a canonical
  content model.
- **R4 Compile complexity:** use a target-neutral intermediate representation
  and golden tests.
- **R5 Sync corruption:** test provider conflict behavior and avoid unsupported
  collaboration claims.
- **R6 Format migration failures:** retain fixtures for every release and never
  mutate before backup.
- **R7 Copyright/trade dress:** implement requirements independently; do not
  copy proprietary text, assets, or distinctive presentation.
- **R8 Accessibility debt:** include keyboard and assistive-technology
  acceptance in every vertical slice.
