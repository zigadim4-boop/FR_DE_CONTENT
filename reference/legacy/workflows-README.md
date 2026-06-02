# Workflows

Markdown SOPs. Each workflow is a plain-language brief for one objective — the way you'd
hand a task to a teammate. The agent reads these to decide which tools to run and in what order.

## Template

Copy this structure for every new workflow:

```markdown
# <Workflow Name>

## Objective
One sentence: what this accomplishes and why.

## Inputs
- `input_name` (required/optional) — description, expected format

## Tools Used
- `tools/<script>.py` — what it does in this workflow

## Steps
1. ...
2. ...

## Outputs
- Where the deliverable lands (e.g. Google Sheet URL) and its shape.

## Edge Cases & Notes
- Rate limits, retries, known quirks. Update this as you learn.
```

## Rule
Don't create or overwrite a workflow without asking the user first, unless explicitly told to.
Refine them as you learn — they're living instructions.
