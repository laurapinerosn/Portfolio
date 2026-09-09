"""Add WHY THIS CELL MATTERS comments inside each code cell of the Caracol notebook."""
import json
from pathlib import Path

p = Path(__file__).resolve().parent / "notebooks" / "01_caracol_ditu_crossmedia.ipynb"
nb = json.loads(p.read_text(encoding="utf-8"))


def to_source(text: str):
    if not text.endswith("\n"):
        text += "\n"
    lines = text.split("\n")
    out = [ln + "\n" for ln in lines[:-1]]
    if lines[-1] != "":
        out.append(lines[-1] + "\n")
    return out


def strip_old_header(src: str) -> str:
    s = src.lstrip()
    if s.startswith('"""'):
        end = s.find('"""', 3)
        if end != -1:
            return s[end + 3 :].lstrip("\n")
    lines = src.splitlines(keepends=True)
    if lines and lines[0].startswith("# WHY THIS CELL"):
        i = 1
        while i < len(lines) and (lines[i].startswith("#") or lines[i].strip() == ""):
            i += 1
        return "".join(lines[i:])
    return src


HEADERS = {
    "setup": """# WHY THIS CELL MATTERS
# Fix reproducibility and file paths before any analysis.
# - SEED makes random data regenerable for demos/QA.
# - Path logic lets the notebook run from notebooks/ or portfolio root.
# - Creating DATA_DIR ensures CSV exports always land in a known folder.
# Without this, teammates cannot rerun the analysis reliably.

""",
    "peek": """# WHY THIS CELL MATTERS
# Quick data-contract check on the exported CSV.
# Confirms the file opens, columns exist, and the grain is event-level
# (one row ~= one consumption event) before we model anything.

""",
    "generate": """# WHY THIS CELL MATTERS
# Build event-level audience consumption (who / what / where / how long).
# Real Cross-Media work starts from logs, not weekly totals.
# We simulate channels, titles, devices, demographics, and watch time,
# then export a reusable bronze CSV for exploration and KPI panels.
# Business value: event data explains WHY reach moved, not only THAT it moved.

""",
    "explore": """# WHY THIS CELL MATTERS
# Exploratory data analysis = quality control + product sense.
# Check shape, channel mix, watch-time distribution, and top titles.
# Catching weird volumes or impossible session lengths here prevents
# polished dashboards built on broken assumptions.

""",
    "cross": """# WHY THIS CELL MATTERS
# Aggregate events into a daily Cross-Media KPI panel executives can use.
# reach = unique users; watch_hours = intensity; completion_rate = quality;
# reach_share shows how attention splits across TV / DITU / YouTube / Portal / Radio.
# This shared layer enables programming, promotion, and platform decisions.

""",
    "funnel": """# WHY THIS CELL MATTERS
# Streaming growth is a conversion problem, not only a reach problem.
# Funnel stages (Visit -> Signup -> Activate -> Watch_7d -> Return_30d)
# show WHERE users drop and WHO owns the fix (marketing vs product/content).
# Illustrative rates on DITU users make the retention story visible.

""",
    "score": """# WHY THIS CELL MATTERS
# Not every user is equally valuable for campaigns or personalization.
# Score combines frequency, watch depth, channel breadth, and completion quality,
# then buckets Low / Mid / High.
# Business value: prioritize high-value audiences instead of treating everyone as average.

""",
    "summary": """# WHY THIS CELL MATTERS
# Last mile of analytics = communication.
# A compact KPI dictionary fits a slide or Looker tile and aligns teams
# on the same numbers (reach, signup rate, high-value share, top channel).
# If stakeholders cannot remember five metrics, the analysis will not drive decisions.

""",
}


def classify(src: str):
    if "SEED = 42" in src:
        return "setup"
    if "print(pd.read_csv" in src:
        return "peek"
    if "N_EVENTS = 25_000" in src:
        return "generate"
    if 'print("Shape:"' in src:
        return "explore"
    if 'groupby(["date", "channel"]' in src:
        return "cross"
    if "ditu_users" in src:
        return "funnel"
    if "user_feat" in src:
        return "score"
    if "daily_reach" in src and "summary" in src:
        return "summary"
    return None


updated = 0
for c in nb["cells"]:
    if c.get("cell_type") != "code":
        continue
    src = "".join(c.get("source", []))
    key = classify(src)
    if not key:
        continue
    clean = strip_old_header(src)
    c["source"] = to_source(HEADERS[key] + clean.lstrip("\n"))
    updated += 1

p.write_text(json.dumps(nb, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"Updated {updated} code cells in {p}")
