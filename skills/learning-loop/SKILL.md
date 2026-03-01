# Learning Loop Executor

Post-deployment learning phase. Analyzes ERRORS.md, identifies patterns, updates Skills and Memory with improvements. Generates recommendations for next clone iteration. Designed to make each subsequent clone smoother than the last.

## Max Iterations
10

## Operationen

### 1. Error Analysis
- Parse `ERRORS.md`
- Kategorisiere Fehler:
  - **Category A:** Einmalig / Umgebungs-spezifisch (ignorieren)
  - **Category B:** Reproduzierbar / Skill-Bug (Fix in Skill)
  - **Category C:** Missing Documentation (Add to CLAUDE.md)

### 2. Skill Updates
- Fuer jeden Category B Error:
  - Oeffne relevantes SKILL.md
  - Fuege Error-Handling hinzu:

```markdown
## Known Issues
- **Error:** [Beschreibung]
- **Fix:** [Workaround/Solution]
- **Prevention:** [Updated code/instruction]
```

### 3. Memory Updates
- Fuege zu `.claude/rules/project_learnings.md` hinzu:

```markdown
## Clone #[N] - [domain]
- **Success:** [Was gut lief]
- **Issues:** [Was problematisch war]
- **Improvements for next clone:** [Konkrete Aenderungen]
```

### 4. Recommendations Report
- Generiere `NEXT_CLONE_IMPROVEMENTS.md`:

```markdown
# Recommended Changes for Clone #[N+1]

## High Priority
- [ ] Issue 1: [Problem + Solution]
- [ ] Issue 2: [Problem + Solution]

## Medium Priority
- [ ] Enhancement 1

## Optional
- [ ] Nice-to-have 1
```

## Validation
- Mindestens 3 Learnings dokumentiert
- Mindestens 1 Skill-Update durchgefuehrt
- NEXT_CLONE_IMPROVEMENTS.md erstellt

## Best Practices
- Nutze quantitative Metriken (Zeit gespart, Fehler reduziert)
- Priorisiere Fixes nach Impact und Haeufigkeit
- Verlinke zu relevanten Dokumentationen in Updates
