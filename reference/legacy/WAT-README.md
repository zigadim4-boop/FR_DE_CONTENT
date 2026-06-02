# CONTENT CREATOR

A content-creation automation project built on the **WAT framework** (Workflows, Agents, Tools).
Probabilistic AI handles reasoning and orchestration; deterministic Python handles execution.

See [CLAUDE.md](CLAUDE.md) for the full operating model.

## Layout

```
.tmp/           # Disposable intermediate files (scraped data, exports). Regenerated as needed.
tools/          # Python scripts — deterministic execution (APIs, transforms, I/O)
workflows/      # Markdown SOPs — what to do and how
.env            # Secrets & API keys (gitignored — copy from .env.example)
requirements.txt
```

## Setup

1. **Install Python 3.10+** — https://www.python.org/downloads/
   (On Windows, check "Add python.exe to PATH" during install.)
2. **Create a virtual environment and install deps:**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```
3. **Configure secrets:** copy `.env.example` to `.env` and fill in real values.
   ```powershell
   Copy-Item .env.example .env
   ```
4. For Google integrations, place your OAuth `credentials.json` in the project root.
   `token.json` is generated automatically on first authenticated run.

## Running a tool

```powershell
python tools/<tool_name>.py --help
```

## How work flows

1. You (the agent) read the relevant file in `workflows/`.
2. You gather the required inputs.
3. You call the matching script(s) in `tools/`.
4. Final deliverables go to cloud services; intermediates land in `.tmp/`.
