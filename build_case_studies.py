"""
Build case-study notebooks (synthetic data) and matching HTML pages.

Run from portfolio root:
    python build_case_studies.py
"""

from __future__ import annotations

import json
from pathlib import Path

import nbformat as nbf
from nbformat.v4 import new_code_cell, new_markdown_cell, new_notebook

ROOT = Path(__file__).resolve().parent
NB_DIR = ROOT / "notebooks"
CASE_DIR = ROOT / "case-studies"
ASSETS = ROOT / "assets"

# Public GitHub repo — file links in case-study HTML point here
GITHUB_REPO = "https://github.com/laurapinerosn/Portfolio"
GITHUB_BLOB = f"{GITHUB_REPO}/blob/main"


CASES = [
    {
        "id": "caracol-ditu-crossmedia",
        "title": "DITU Funnel & Cross-Media Audience Hub",
        "company": "Caracol TV",
        "year": 2026,
        "role": "Data Scientist / Data Analyst",
        "stack": ["Power BI", "Python", "SQL", "Snowflake", "AWS"],
        "problem": (
            "Audience and content decisions were fragmented across TV, streaming, "
            "YouTube, portals, and radio — with no shared KPI layer."
        ),
        "approach": (
            "Synthetic Cross-Media panel: normalize daily reach/engagement by channel, "
            "build a funnel for DITU, score audiences, and forecast ad investment."
        ),
        "result": "Unified Cross-Media KPIs and audience scoring for campaign targeting.",
        "notebook": "01_caracol_ditu_crossmedia.ipynb",
        "html": "caracol-ditu-crossmedia.html",
        "data_file": "data/audience_consumption_random.csv",
    },
    {
        "id": "d2b-meridian-mmm",
        "title": "Meridian MMM & Digital Performance Stack",
        "company": "D2B",
        "year": 2025,
        "role": "Data Scientist & Innovation",
        "stack": ["Python", "Meridian MMM", "GA4", "BigQuery", "Looker Studio"],
        "problem": (
            "Marketing lacked a clear view of channel contribution, ROI, and "
            "forward-looking traffic for leads and paid media."
        ),
        "approach": (
            "Synthetic spend/response series by channel; estimate contribution shares, "
            "ROI, and a simple SARIMAX-style forecast proxy for leads."
        ),
        "result": "Channel ROI clarified; traffic forecasted with a lightweight model stack.",
        "notebook": "02_d2b_meridian_mmm.ipynb",
        "html": "d2b-meridian-mmm.html",
    },
    {
        "id": "nae-claro-banking",
        "title": "Banking Analytics & Campaign ETL",
        "company": "NAE Colombia",
        "year": 2024,
        "role": "Data Scientist",
        "stack": ["Python", "R", "SQL", "Azure Databricks", "Pentaho"],
        "problem": (
            "Banking partners needed reliable customer profiles and repeatable "
            "data flows for multi-channel campaign execution."
        ),
        "approach": (
            "Synthetic customer and campaign tables; ETL-style cleaning, risk segments, "
            "and response rates for SMS / WhatsApp / email."
        ),
        "result": "ETL and segments enabling multi-channel campaigns at scale.",
        "notebook": "03_nae_claro_banking.ipynb",
        "html": "nae-claro-banking.html",
    },
    {
        "id": "msc-pv-load-curves",
        "title": "PV Load-Curve Forecasting",
        "company": "Research",
        "year": 2022,
        "role": "Master's thesis",
        "stack": ["Python", "Forecasting", "Segmentation"],
        "problem": (
            "PV energy customers needed segmentation grounded in predicted "
            "consumption patterns, not only static attributes."
        ),
        "approach": (
            "Synthetic hourly load curves; cluster customers and evaluate a simple "
            "forecast baseline (MAPE)."
        ),
        "result": "Forecast-driven segments for operational and commercial decisions.",
        "notebook": "04_msc_pv_load_curves.ipynb",
        "html": "msc-pv-load-curves.html",
    },
    {
        "id": "scoutmetrics-football",
        "title": "ScoutMetrics — Football Scouting Analytics",
        "company": "ScoutMetrics (Personal)",
        "year": 2026,
        "role": "Data Scientist · Sports Analytics",
        "stack": ["Python", "pandas", "Scouting metrics", "Jupyter"],
        "problem": (
            "Tournament scouting needed a reproducible pipeline to turn match reports "
            "into comparable team/player metrics (phases of play, line breaks, physical load)."
        ),
        "approach": (
            "Inspired by World Cup 2026 moneyball-style master files: normalize team KPIs, "
            "phases of play, player line-break & physical tables, then score scouting profiles."
        ),
        "result": (
            "A portable scouting analytics workflow: KPI panels, player rankings, "
            "and exportable tables for coaching / recruitment conversations."
        ),
        "notebook": "05_scoutmetrics_football.ipynb",
        "html": "scoutmetrics-football.html",
        "data_file": "data/scoutmetrics_player_scores.csv",
        "data_label": "scouting board",
        "repro_note": (
            "on GitHub (seeded tournament tables: matches, team KPIs, phases, line breaks, physical). "
            "Open it in Jupyter / VS Code / Colab and Run All. "
            "You can also open the scouting-board CSV from the same repository."
        ),
    },
]


def nb_caracol() -> nbf.NotebookNode:
    """Rich notebook: random audience consumption events + Cross-Media KPIs."""
    nb = new_notebook()
    cells = [
        new_markdown_cell(
            """# Case Study — DITU Funnel & Cross-Media Audience Hub
**Company (context):** Caracol TV · **Synthetic / random audience consumption data**

This notebook walks through a **media analytics workflow**: create event-level audience data, explore consumption, build a Cross-Media KPI panel, model a DITU funnel, and score audiences for targeting.

**Why this notebook matters**  
In media companies, decisions about programming, paid promotion, and streaming growth only work when teams share the same definitions of *reach*, *engagement*, and *valuable users*. This case study shows how event-level consumption becomes executive KPIs.

> All figures are **fictional** and seeded for reproducibility (`SEED = 42`).
"""
        ),
        new_markdown_cell(
            """## 0. Setup

**Why this step is important**  
Before any analysis, we fix the environment so the work is **reproducible and portable**:

- A fixed `SEED` makes random data regenerable (same results for demos, interviews, or QA).
- Explicit `Path` handling avoids “file not found” when the notebook runs from `notebooks/` or the portfolio root.
- Creating `DATA_DIR` up front guarantees exports land in a known place for BI tools or other notebooks.

Without this step, colleagues cannot rerun your analysis reliably."""
        ),
        new_code_cell(
            """from pathlib import Path

import numpy as np
import pandas as pd

SEED = 42
rng = np.random.default_rng(SEED)

# Works from notebooks/ or portfolio root
ROOT = Path.cwd()
if (ROOT / "data").exists():
    DATA_DIR = ROOT / "data"
elif (ROOT.parent / "data").exists():
    DATA_DIR = ROOT.parent / "data"
else:
    DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

OUT_CSV = DATA_DIR / "audience_consumption_random.csv"
print("Data folder:", DATA_DIR.resolve())
print("Output CSV:", OUT_CSV.name)
"""
        ),
        new_markdown_cell(
            """## 1. Generate random audience consumption

**Why this step is important**  
Real Cross-Media work starts from **event-level logs** (who watched what, where, and for how long)—not from pre-aggregated dashboards.

We simulate that grain so we can practice:

- Designing realistic dimensions (channel, title, genre, device, demographics).
- Modeling different session lengths by channel (TV/Radio vs YouTube clips).
- Exporting a reusable CSV as a “bronze” dataset for later steps.

**Business value:** if you only ever see weekly totals, you cannot diagnose *why* reach moved. Event data lets you answer that.

Each row = one **consumption event** (a user watching a title on a channel)."""
        ),
        new_code_cell(
            """N_EVENTS = 25_000
N_USERS = 5_000

channels = ["TV", "DITU", "YouTube", "Portal", "Radio"]
channel_p = [0.28, 0.22, 0.25, 0.12, 0.13]

genres = ["Novela", "News", "Sports", "Entertainment", "Kids", "Documentary"]
devices = ["Smart TV", "Mobile", "Desktop", "Tablet", "Radio set"]
titles = [
    "Morning News Live", "Prime Novela A", "Prime Novela B", "Match Night",
    "Talk Show Central", "Kids Club", "Weekend Special", "Late Night Desk",
    "Regional Report", "Streaming Exclusive 01", "Streaming Exclusive 02",
    "YouTube Clip Hour", "Portal Catch-up", "Radio Morning Drive",
]

ages = rng.integers(16, 75, N_USERS)
cities = rng.choice(
    ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga", "Other"],
    N_USERS,
    p=[0.34, 0.18, 0.14, 0.10, 0.08, 0.16],
)
genders = rng.choice(["F", "M", "Other"], N_USERS, p=[0.51, 0.47, 0.02])

user_lookup = pd.DataFrame({
    "user_id": [f"U{i:05d}" for i in range(1, N_USERS + 1)],
    "age": ages,
    "gender": genders,
    "city": cities,
})

# Event timestamps over ~90 days
start = np.datetime64("2026-01-01")
offsets_min = rng.integers(0, 90 * 24 * 60, N_EVENTS)
event_ts = start + offsets_min.astype("timedelta64[m]")

chosen_users = rng.integers(0, N_USERS, N_EVENTS)
chosen_channels = rng.choice(channels, N_EVENTS, p=channel_p)

# Watch minutes depend on channel (TV/Radio longer sessions on average)
base_watch = {
    "TV": (25, 12),
    "DITU": (38, 18),
    "YouTube": (12, 8),
    "Portal": (18, 10),
    "Radio": (40, 20),
}
watch_minutes = np.array([
    max(1, int(rng.normal(base_watch[ch][0], base_watch[ch][1])))
    for ch in chosen_channels
])

consumption = pd.DataFrame({
    "event_id": [f"E{i:06d}" for i in range(1, N_EVENTS + 1)],
    "event_ts": event_ts,
    "user_id": user_lookup.loc[chosen_users, "user_id"].to_numpy(),
    "channel": chosen_channels,
    "title": rng.choice(titles, N_EVENTS),
    "genre": rng.choice(genres, N_EVENTS),
    "device": rng.choice(devices, N_EVENTS, p=[0.33, 0.38, 0.14, 0.08, 0.07]),
    "watch_minutes": watch_minutes,
    "completed": rng.random(N_EVENTS) < 0.37,
})

# Attach demographics
consumption = consumption.merge(user_lookup, on="user_id", how="left")
consumption["date"] = pd.to_datetime(consumption["event_ts"]).dt.floor("D")
consumption["hour"] = pd.to_datetime(consumption["event_ts"]).dt.hour

consumption.to_csv(OUT_CSV, index=False)
print(f"Saved {len(consumption):,} random consumption events → {OUT_CSV}")
consumption.head(10)
"""
        ),
        new_markdown_cell(
            """## 2. Explore audience consumption

**Why this step is important**  
Exploration is quality control + product sense:

- **Shape / channel mix** shows whether volume and distribution look plausible.
- **Watch-time distribution** reveals outliers or unrealistic session lengths.
- **Top titles** surface what content actually drives attention.

Skipping EDA is how teams ship dashboards that look polished but hide broken joins or impossible metrics."""
        ),
        new_code_cell(
            """print("Shape:", consumption.shape)
print("\\nChannels:")
print(consumption["channel"].value_counts())
print("\\nWatch minutes describe:")
display(consumption["watch_minutes"].describe().round(1))
print("\\nTop titles by total watch hours:")
(
    consumption.groupby("title")["watch_minutes"].sum()
    .div(60).sort_values(ascending=False).head(8).round(1)
)
"""
        ),
        new_markdown_cell(
            """## 2.1 Build the daily Cross-Media panel

**Why this step is important**  
Executives do not read 25,000 event rows — they need a **shared KPI layer** by day and channel:

- `reach` = unique users (not just clicks/events).
- `watch_hours` = intensity of consumption.
- `completion_rate` = quality of engagement.
- `reach_share` = how attention is split across TV, DITU, YouTube, Portal, Radio.

This panel enables **Cross-Media decisions**: where to promote a title, which platform is growing, and whether digital complements linear."""
        ),
        new_code_cell(
            """# Daily Cross-Media panel from event-level consumption
cross = (
    consumption.groupby(["date", "channel"], as_index=False)
    .agg(
        reach=("user_id", "nunique"),
        events=("event_id", "count"),
        watch_hours=("watch_minutes", lambda s: round(s.sum() / 60, 2)),
        completion_rate=("completed", "mean"),
    )
)
cross["completion_rate"] = cross["completion_rate"].round(3)
display(cross.head())

channel_share = (
    cross.groupby("channel")["reach"].sum().sort_values(ascending=False)
)
(channel_share / channel_share.sum()).rename("reach_share").round(3)
"""
        ),
        new_markdown_cell(
            """## 3. DITU digital funnel

**Why this step is important**  
Streaming growth is a **conversion problem**, not only a reach problem. The funnel shows where users drop:

Visit → Signup → Activate → Watch (7d) → Return (30d)

Each stage answers a different business question:

- Poor signup → friction in registration / paywall.
- Poor activation → onboarding / content discovery.
- Poor return → retention / catalog / habit formation.

**Why it matters for Caracol/DITU-style products:** marketing can buy visits, but product & content own activation and retention. The funnel assigns ownership."""
        ),
        new_code_cell(
            """ditu_users = consumption.loc[consumption["channel"] == "DITU", "user_id"].unique()
n_visit = max(len(ditu_users), 1)

# Funnel rates inspired by streaming products (illustrative)
stages = ["Visit", "Signup", "Activate", "Watch_7d", "Return_30d"]
rates = [1.00, 0.38, 0.62, 0.55, 0.41]
counts, remaining = [], n_visit
for r in rates:
    remaining = int(remaining * r)
    counts.append(remaining)

funnel = pd.DataFrame({"stage": stages, "users": counts})
funnel["conv_from_prev"] = (funnel["users"] / funnel["users"].shift(1)).round(3)
funnel
"""
        ),
        new_markdown_cell(
            """## 4. Audience score from consumption behavior

**Why this step is important**  
Not every user is equally valuable for campaigns or personalization. A transparent score combines:

- Frequency (`sessions`)
- Depth (`watch_hours`)
- Breadth (`channels`)
- Quality (`completion_rate`)

Then we bucket users into **Low / Mid / High**.

**Business value:** High-value segments can be prioritized for premium campaigns, exclusive content tests, or retention plays — instead of treating the whole audience as average."""
        ),
        new_code_cell(
            """user_feat = (
    consumption.groupby("user_id", as_index=False)
    .agg(
        sessions=("event_id", "count"),
        watch_hours=("watch_minutes", lambda s: s.sum() / 60),
        channels=("channel", "nunique"),
        completion_rate=("completed", "mean"),
        age=("age", "first"),
        city=("city", "first"),
    )
)

user_feat["score"] = (
    0.30 * (user_feat["sessions"] / user_feat["sessions"].max())
    + 0.40 * (user_feat["watch_hours"] / user_feat["watch_hours"].max())
    + 0.15 * (user_feat["channels"] / user_feat["channels"].max())
    + 0.15 * user_feat["completion_rate"].fillna(0)
) * 100

user_feat["segment"] = pd.cut(
    user_feat["score"],
    bins=[-0.1, 40, 70, 100],
    labels=["Low", "Mid", "High"],
)

seg_share = user_feat["segment"].value_counts(normalize=True).sort_index().round(3)
display(seg_share)
user_feat.sort_values("score", ascending=False).head(8)
"""
        ),
        new_markdown_cell(
            """## 5. Executive summary

**Why this step is important**  
The last mile of analytics is **communication**. A compact KPI dictionary:

- Fits a slide or Looker tile.
- Aligns data, content, and business teams on the same numbers.
- Creates a checklist for monitoring (reach, signup rate, high-value share, top channel).

If stakeholders cannot remember the story in five metrics, the analysis will not drive decisions — no matter how sophisticated the code was."""
        ),
        new_code_cell(
            """daily_reach = cross.groupby("date")["reach"].sum()
summary = {
    "events": int(len(consumption)),
    "unique_users": int(consumption["user_id"].nunique()),
    "avg_daily_reach": int(daily_reach.mean()),
    "avg_watch_min_per_event": round(float(consumption["watch_minutes"].mean()), 1),
    "ditu_signup_rate": float(funnel.loc[1, "conv_from_prev"]),
    "high_value_audience_share": float(seg_share.get("High", 0)),
    "top_channel_by_reach": channel_share.idxmax(),
    "csv_path": str(OUT_CSV.resolve()),
}
summary
"""
        ),
    ]
    nb["cells"] = cells
    return nb


def nb_d2b() -> nbf.NotebookNode:
    nb = new_notebook()
    cells = [
        new_markdown_cell(
            """# Case Study — Meridian MMM & Digital Performance Stack
**Company (context):** D2B · **Synthetic data for portfolio demo**

Goal: estimate channel contribution / ROI and forecast leads with a lightweight model proxy.
"""
        ),
        new_code_cell(
            """import numpy as np
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_percentage_error

rng = np.random.default_rng(7)
weeks = pd.date_range("2024-01-01", periods=78, freq="W-MON")
spend = pd.DataFrame({
    "week": weeks,
    "meta": rng.uniform(8, 25, len(weeks)) * 1000,
    "google": rng.uniform(10, 30, len(weeks)) * 1000,
    "tiktok": rng.uniform(3, 14, len(weeks)) * 1000,
    "seasonality": np.sin(np.linspace(0, 6*np.pi, len(weeks))),
})
# True-ish response curve for synthetic ground truth
true = (
    0.018 * spend["meta"]
    + 0.022 * spend["google"]
    + 0.015 * spend["tiktok"]
    + 1200 * spend["seasonality"]
    + rng.normal(0, 400, len(weeks))
)
spend["leads"] = np.clip(true, 200, None).astype(int)
spend["revenue"] = spend["leads"] * rng.uniform(28, 42, len(weeks))
spend.head()
"""
        ),
        new_code_cell(
            """# Simple MMM proxy: Ridge on media spend
X = spend[["meta", "google", "tiktok", "seasonality"]]
y = spend["leads"]
model = Ridge(alpha=1.0)
model.fit(X, y)
coefs = pd.Series(model.coef_[:3], index=["meta", "google", "tiktok"])
contrib = (X[["meta", "google", "tiktok"]] * coefs.values).clip(lower=0)
share = contrib.sum() / contrib.sum().sum()
roi = (contrib.sum() * spend["revenue"].sum() / spend["leads"].sum()) / spend[["meta", "google", "tiktok"]].sum()
pd.DataFrame({"contribution_share": share.round(3), "roi_proxy": roi.round(2)})
"""
        ),
        new_code_cell(
            """# Forecast last 8 weeks (holdout) with lag features
feat = spend.copy()
feat["leads_lag1"] = feat["leads"].shift(1)
feat["leads_lag2"] = feat["leads"].shift(2)
feat = feat.dropna()
split = len(feat) - 8
train, test = feat.iloc[:split], feat.iloc[split:]
cols = ["meta", "google", "tiktok", "seasonality", "leads_lag1", "leads_lag2"]
fmodel = Ridge(alpha=0.5)
fmodel.fit(train[cols], train["leads"])
pred = fmodel.predict(test[cols])
mape = mean_absolute_percentage_error(test["leads"], pred)
{"holdout_mape": round(float(mape), 3), "pred_mean_leads": int(pred.mean())}
"""
        ),
        new_code_cell(
            """kpis = {
    "blended_roi_x": round(float(spend["revenue"].sum() / spend[["meta", "google", "tiktok"]].sum().sum()), 2),
    "avg_weekly_leads": int(spend["leads"].mean()),
    "best_channel_by_share": share.idxmax(),
}
kpis
"""
        ),
    ]
    nb["cells"] = cells
    return nb


def nb_nae() -> nbf.NotebookNode:
    nb = new_notebook()
    cells = [
        new_markdown_cell(
            """# Case Study — Banking Analytics & Campaign ETL
**Company (context):** NAE Colombia / Claro partnership · **Synthetic data for portfolio demo**

Goal: clean customer extracts, build risk/value segments, and measure multi-channel response.
"""
        ),
        new_code_cell(
            """import numpy as np
import pandas as pd

rng = np.random.default_rng(21)
n = 8000
raw = pd.DataFrame({
    "customer_id": [f"C{i:05d}" for i in range(n)],
    "age": rng.integers(18, 75, n),
    "income": rng.lognormal(15.2, 0.55, n).round(0),
    "product": rng.choice(["Savings", "Credit", "Prepaid"], n, p=[0.45, 0.35, 0.20]),
    "risk_score": np.clip(rng.normal(0.42, 0.18, n), 0, 1).round(3),
    "channel_pref": rng.choice(["SMS", "WhatsApp", "Email"], n, p=[0.34, 0.41, 0.25]),
    "email": rng.choice(["ok", "OK", " missing ", None], n, p=[0.7, 0.15, 0.1, 0.05]),
})
# Ghost / dirty fields similar to real exports
raw["Unnamed: 0"] = range(n)
raw.loc[rng.choice(n, 120, replace=False), "income"] = np.nan
raw.head()
"""
        ),
        new_code_cell(
            """# ETL-style cleaning
clean = raw.drop(columns=["Unnamed: 0"]).copy()
clean["email"] = clean["email"].astype("string").str.strip().str.lower()
clean["email_ok"] = clean["email"].eq("ok")
clean["income"] = clean["income"].fillna(clean["income"].median())
clean["value_tier"] = pd.qcut(clean["income"], 3, labels=["Low", "Mid", "High"])
clean["risk_band"] = pd.cut(clean["risk_score"], [-0.01, 0.33, 0.66, 1.01], labels=["Low", "Mid", "High"])
clean.head()
"""
        ),
        new_code_cell(
            """# Campaign response simulation
camp = clean.sample(3000, random_state=21).copy()
base = {"SMS": 0.041, "WhatsApp": 0.057, "Email": 0.033}
camp["response"] = [
    rng.random() < base[ch] * (1.15 if v == "High" else 0.9 if v == "Low" else 1.0)
    for ch, v in zip(camp["channel_pref"], camp["value_tier"])
]
perf = (
    camp.groupby("channel_pref")
        .agg(sent=("customer_id", "count"), responders=("response", "sum"))
)
perf["response_rate"] = (perf["responders"] / perf["sent"]).round(4)
perf
"""
        ),
        new_code_cell(
            """summary = {
    "customers_cleaned": int(len(clean)),
    "email_valid_share": round(float(clean["email_ok"].mean()), 3),
    "best_channel": perf["response_rate"].idxmax(),
    "best_response_rate": float(perf["response_rate"].max()),
}
summary
"""
        ),
    ]
    nb["cells"] = cells
    return nb


def nb_pv() -> nbf.NotebookNode:
    nb = new_notebook()
    cells = [
        new_markdown_cell(
            """# Case Study — PV Load-Curve Forecasting & Segmentation
**Context:** Master's thesis (Complutense) · **Synthetic data for portfolio demo**

Goal: cluster customers by load shape and evaluate a simple day-ahead forecast baseline.
"""
        ),
        new_code_cell(
            """import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_percentage_error

rng = np.random.default_rng(11)
hours = np.arange(24)
n_customers = 240

profiles = []
for cid in range(n_customers):
    kind = rng.choice(["residential", "commercial", "mixed"], p=[0.5, 0.3, 0.2])
    if kind == "residential":
        curve = 0.4 + 0.35 * np.exp(-0.5 * ((hours - 7) / 2.2) ** 2) + 0.55 * np.exp(-0.5 * ((hours - 20) / 2.5) ** 2)
    elif kind == "commercial":
        curve = 0.25 + 0.9 * ((hours >= 8) & (hours <= 18)).astype(float)
    else:
        curve = 0.35 + 0.45 * np.sin((hours / 24) * 2 * np.pi) + 0.25
    curve = curve * rng.uniform(0.8, 1.25) + rng.normal(0, 0.03, 24)
    profiles.append(np.clip(curve, 0.05, None))

load = pd.DataFrame(profiles, columns=[f"h{h:02d}" for h in hours])
load["customer_id"] = [f"PV{i:03d}" for i in range(n_customers)]
load.head()
"""
        ),
        new_code_cell(
            """# Segmentation on normalized daily shape
X = load.filter(like="h")
X_norm = X.div(X.sum(axis=1), axis=0)
scaler = StandardScaler()
Z = scaler.fit_transform(X_norm)
km = KMeans(n_clusters=3, n_init=10, random_state=11)
load["segment"] = km.fit_predict(Z)
load["segment"].value_counts().sort_index()
"""
        ),
        new_code_cell(
            """# Day-ahead naive forecast proxy on aggregate curve
agg = X.mean(axis=0).values
# Simulate 14 days of noisy aggregate demand
series = []
for d in range(14):
    series.append(agg * rng.uniform(0.92, 1.08) + rng.normal(0, 0.02, 24))
series = np.array(series)
y_true = series[1:].ravel()
y_pred = series[:-1].ravel()  # yesterday's shape as forecast
mape = mean_absolute_percentage_error(y_true, y_pred)
{
    "segments": int(load["segment"].nunique()),
    "baseline_mape": round(float(mape), 3),
    "peak_hour": int(agg.argmax()),
}
"""
        ),
    ]
    nb["cells"] = cells
    return nb


def nb_scoutmetrics() -> nbf.NotebookNode:
    """Football scouting analytics inspired by ScoutMetrics / Mundial 2026 moneyball work."""
    nb = new_notebook()
    cells = [
        new_markdown_cell(
            """# Case Study — ScoutMetrics · Football Scouting Analytics
**Project (context):** ScoutMetrics (personal sports-analytics lab) · **Synthetic tournament data for portfolio demo**

This notebook mirrors the **ScoutMetrics** workflow used to explore World Cup–style master files:
team key stats, phases of play, player line breaks, and physical load — then turns them into
**scouting scores** coaches and analysts can compare across matches.

**Why this notebook matters**  
Scouting decisions improve when teams share the same definitions of *progression*, *physical output*,
and *phase dominance*. This case study shows how multi-table match data becomes a ranked player board.

> All figures are **fictional** and seeded for reproducibility (`SEED = 26`).  
> Methodology inspired by the ScoutMetrics Mundial 2026 moneyball master-file structure.
"""
        ),
        new_markdown_cell(
            """## 0. Setup

Fix reproducibility and export paths so the analysis can be rerun from `notebooks/` or the portfolio root.
"""
        ),
        new_code_cell(
            """from pathlib import Path

import numpy as np
import pandas as pd

SEED = 26
rng = np.random.default_rng(SEED)

ROOT = Path.cwd()
if (ROOT / "data").exists():
    DATA_DIR = ROOT / "data"
elif (ROOT.parent / "data").exists():
    DATA_DIR = ROOT.parent / "data"
else:
    DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

OUT_CSV = DATA_DIR / "scoutmetrics_player_scores.csv"
print("Data folder:", DATA_DIR.resolve())
print("Will export:", OUT_CSV.name)"""
        ),
        new_markdown_cell(
            """## 1. Synthetic tournament tables

We recreate the **core ScoutMetrics sheets** at small scale:
- `matches` — schedule / results
- `team_stats` — long-format team metrics
- `phases` — % of play by phase
- `linebreaks` / `physical` — player-level progression & load
"""
        ),
        new_code_cell(
            """teams = [
    "Spain", "France", "Argentina", "England", "Brazil", "Germany",
    "Portugal", "Netherlands", "Colombia", "Japan", "USA", "Morocco",
]
n_matches = 48
matches = pd.DataFrame({
    "match_no": range(1, n_matches + 1),
    "group": rng.choice(list("ABCDEFGH"), n_matches),
    "team1": rng.choice(teams, n_matches),
    "team2": rng.choice(teams, n_matches),
})
# avoid same team twice
mask = matches["team1"].eq(matches["team2"])
while mask.any():
    matches.loc[mask, "team2"] = rng.choice(teams, mask.sum())
    mask = matches["team1"].eq(matches["team2"])
matches["team1_goals"] = rng.integers(0, 4, n_matches)
matches["team2_goals"] = rng.integers(0, 4, n_matches)
matches.head()"""
        ),
        new_code_cell(
            """metrics = [
    "possession_pct", "shots", "shots_on_target", "passes_completed",
    "xg", "pressures", "line_breaks_team",
]
rows = []
for _, m in matches.iterrows():
    for side, team in (("home", m["team1"]), ("away", m["team2"])):
        base = {
            "match_no": m["match_no"],
            "group": m["group"],
            "team": team,
            "team_side": side,
        }
        vals = {
            "possession_pct": round(float(rng.uniform(38, 62)), 1),
            "shots": int(rng.integers(4, 22)),
            "shots_on_target": int(rng.integers(1, 10)),
            "passes_completed": int(rng.integers(220, 620)),
            "xg": round(float(rng.uniform(0.2, 2.8)), 2),
            "pressures": int(rng.integers(80, 220)),
            "line_breaks_team": int(rng.integers(8, 40)),
        }
        for metric, value in vals.items():
            rows.append({**base, "metric": metric, "value": value})

team_stats = pd.DataFrame(rows)
# normalize possession so home+away ≈ 100
poss = team_stats[team_stats["metric"].eq("possession_pct")].copy()
# leave as-is for demo simplicity
team_stats.head()"""
        ),
        new_code_cell(
            """phases_labels = ["Build-up", "Progression", "Final third", "Defensive block", "Transition"]
phase_rows = []
for _, m in matches.iterrows():
    for team in (m["team1"], m["team2"]):
        weights = rng.dirichlet(np.ones(len(phases_labels)) * 2.0)
        for phase, pct in zip(phases_labels, weights):
            phase_rows.append({
                "match_no": m["match_no"],
                "group": m["group"],
                "team": team,
                "phase": phase,
                "percentage": round(float(pct * 100), 1),
            })
phases = pd.DataFrame(phase_rows)
phases.head()"""
        ),
        new_code_cell(
            """# Player-level line breaks + physical load (≈ 11 players × 2 teams × matches subsample)
sample_matches = matches.sample(20, random_state=SEED)
player_rows = []
phys_rows = []
for _, m in sample_matches.iterrows():
    for team in (m["team1"], m["team2"]):
        for shirt in range(1, 12):
            attempted = int(rng.integers(0, 18))
            completed = int(rng.integers(0, attempted + 1)) if attempted else 0
            player_rows.append({
                "match_no": m["match_no"],
                "team": team,
                "shirt": shirt,
                "player": f"{team[:3].upper()}_{shirt:02d}",
                "line_breaks_attempted": attempted,
                "line_breaks_completed": completed,
                "line_break_completion_pct": round(100 * completed / attempted, 1) if attempted else 0.0,
                "through": int(rng.integers(0, max(completed, 1))),
                "around": int(rng.integers(0, max(completed, 1))),
                "over": int(rng.integers(0, max(completed, 1))),
            })
            dist = float(rng.uniform(6500, 12500))
            phys_rows.append({
                "match_no": m["match_no"],
                "team": team,
                "shirt": shirt,
                "player": f"{team[:3].upper()}_{shirt:02d}",
                "total_distance_m": round(dist, 0),
                "high_speed_runs_z3": int(rng.integers(8, 55)),
                "sprints_z4_z5": int(rng.integers(2, 28)),
                "top_speed_kmh": round(float(rng.uniform(27, 35)), 1),
            })

linebreaks = pd.DataFrame(player_rows)
physical = pd.DataFrame(phys_rows)
print(linebreaks.shape, physical.shape)
linebreaks.head()"""
        ),
        new_markdown_cell(
            """## 2. Team KPI panel

Pivot long team metrics and rank sides by xG and progressive line breaks.
"""
        ),
        new_code_cell(
            """team_wide = (
    team_stats.pivot_table(
        index=["match_no", "group", "team", "team_side"],
        columns="metric",
        values="value",
        aggfunc="first",
    )
    .reset_index()
)
team_rank = (
    team_wide.groupby("team", as_index=False)
    .agg(
        matches=("match_no", "nunique"),
        avg_xg=("xg", "mean"),
        avg_shots=("shots", "mean"),
        avg_line_breaks=("line_breaks_team", "mean"),
        avg_possession=("possession_pct", "mean"),
    )
    .sort_values("avg_xg", ascending=False)
)
team_rank["avg_xg"] = team_rank["avg_xg"].round(2)
team_rank.head(10)"""
        ),
        new_markdown_cell(
            """## 3. Phases of play

Which teams spend more time in **Final third** vs **Defensive block**?
"""
        ),
        new_code_cell(
            """phase_team = (
    phases.groupby(["team", "phase"], as_index=False)["percentage"].mean()
)
final_third = (
    phase_team[phase_team["phase"].eq("Final third")]
    .sort_values("percentage", ascending=False)
    .head(10)
    .rename(columns={"percentage": "avg_final_third_pct"})
)
final_third"""
        ),
        new_markdown_cell(
            """## 4. Player scouting score

Combine line-break completion, volume, distance, and sprint volume into a 0–100 scouting index.
"""
        ),
        new_code_cell(
            """players = linebreaks.merge(
    physical,
    on=["match_no", "team", "shirt", "player"],
    how="inner",
)

agg = players.groupby(["team", "player"], as_index=False).agg(
    matches=("match_no", "nunique"),
    lb_attempted=("line_breaks_attempted", "sum"),
    lb_completed=("line_breaks_completed", "sum"),
    avg_distance_m=("total_distance_m", "mean"),
    avg_sprints=("sprints_z4_z5", "mean"),
    avg_top_speed=("top_speed_kmh", "mean"),
)
agg["lb_completion_pct"] = np.where(
    agg["lb_attempted"] > 0,
    (100 * agg["lb_completed"] / agg["lb_attempted"]).round(1),
    0.0,
)

# Min-max components → scouting score
def minmax(s: pd.Series) -> pd.Series:
    lo, hi = s.min(), s.max()
    if hi == lo:
        return pd.Series(50.0, index=s.index)
    return 100 * (s - lo) / (hi - lo)

agg["score"] = (
    0.30 * minmax(agg["lb_completed"])
    + 0.25 * minmax(agg["lb_completion_pct"])
    + 0.25 * minmax(agg["avg_distance_m"])
    + 0.20 * minmax(agg["avg_sprints"])
).round(1)

board = agg.sort_values("score", ascending=False).reset_index(drop=True)
board.head(15)"""
        ),
        new_code_cell(
            """# Export board for BI / case-study download
board.to_csv(OUT_CSV, index=False)
print("Exported:", OUT_CSV.resolve())
print("Players scored:", len(board))
print("Top scout score:", board.iloc[0][["player", "team", "score"]].to_dict())"""
        ),
        new_markdown_cell(
            """## 5. Takeaways

| Layer | Output |
|-------|--------|
| Team | Ranked xG / progression panel |
| Phases | Final-third dominance by team |
| Player | Scouting score blending progression + physical |

This is the same **multi-table → KPI → ranking** pattern used in ScoutMetrics when reading
Moneyball-style World Cup master files (team stats, phases, line breaks, physical).
"""
        ),
        new_code_cell(
            """summary = {
    "matches_modeled": int(matches["match_no"].nunique()),
    "teams": int(team_rank.shape[0]),
    "players_scored": int(board.shape[0]),
    "top_player": board.iloc[0]["player"],
    "top_score": float(board.iloc[0]["score"]),
    "export": str(OUT_CSV.name),
}
summary"""
        ),
    ]
    nb["cells"] = cells
    return nb


BUILDERS = {
    "caracol-ditu-crossmedia": nb_caracol,
    "d2b-meridian-mmm": nb_d2b,
    "nae-claro-banking": nb_nae,
    "msc-pv-load-curves": nb_pv,
    "scoutmetrics-football": nb_scoutmetrics,
}


CASE_PAGE_CSS = """/* Case study pages — matches portfolio system */
:root {
  --bg: #fafaf8;
  --card: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --border: #e5e7eb;
  --blue: #2563eb;
  --blue-hover: #1d4ed8;
  --green: #10b981;
  --font: "Sora", system-ui, sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, monospace;
  --radius: 14px;
  --max: 860px;
  --ease: 200ms ease;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--font);
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
.wrap { width: min(100% - 2rem, var(--max)); margin-inline: auto; }
.site-nav {
  position: sticky; top: 0; z-index: 20;
  background: rgba(250,250,248,.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 0; gap: 1rem;
}
.brand { font-weight: 700; letter-spacing: -0.02em; }
.nav-links { display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0; color: var(--muted); font-size: .88rem; }
.nav-links a:hover { color: var(--text); }
.btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .75rem 1.1rem; border-radius: 999px; font-weight: 600; font-size: .88rem;
  border: 1px solid transparent; transition: background var(--ease), border-color var(--ease), color var(--ease), transform var(--ease);
}
.btn-primary { background: var(--blue); color: #fff; }
.btn-primary:hover { background: var(--blue-hover); transform: translateY(-1px); }
.btn-secondary { background: var(--card); border-color: var(--border); }
.btn-secondary:hover { border-color: #d1d5db; transform: translateY(-1px); }
.hero { padding: 3.5rem 0 2rem; }
.eyebrow { font-family: var(--mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin: 0 0 .75rem; }
h1 { margin: 0 0 1rem; font-size: clamp(1.8rem, 4vw, 2.5rem); letter-spacing: -0.03em; line-height: 1.15; }
.lead { color: var(--muted); margin: 0 0 1.5rem; font-size: 1.02rem; }
.meta-row { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
.badge {
  font-size: .72rem; border: 1px solid var(--border); background: var(--card);
  border-radius: 999px; padding: .28rem .65rem; color: var(--text);
}
.cta-row { display: flex; flex-wrap: wrap; gap: .7rem; }
.section { padding: 1.5rem 0 2.5rem; }
.card {
  background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 1.35rem 1.4rem; margin-bottom: 1rem;
}
.card h2 { margin: 0 0 .65rem; font-size: 1.05rem; letter-spacing: -0.02em; }
.card p { margin: 0; color: var(--muted); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: .85rem; }
.metric { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; }
.metric span { display: block; font-family: var(--mono); font-size: .68rem; color: var(--muted); margin-bottom: .35rem; text-transform: uppercase; letter-spacing: .06em; }
.metric strong { font-size: 1.35rem; letter-spacing: -0.03em; }
.metric.up strong { color: var(--green); }
ol.steps { margin: 0; padding-left: 1.15rem; color: var(--muted); }
ol.steps li + li { margin-top: .4rem; }
.footer { border-top: 1px solid var(--border); padding: 1.5rem 0 2rem; color: var(--muted); font-size: .82rem; }
@media (max-width: 720px) {
  .grid-3 { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
"""


def render_case_html(case: dict) -> str:
    badges = "".join(f'<span class="badge">{t}</span>' for t in case["stack"])
    metrics = case.get("display_metrics", [])
    metrics_html = "".join(
        f'<div class="metric{" up" if m.get("positive") else ""}">'
        f'<span>{m["label"]}</span><strong>{m["value"]}</strong></div>'
        for m in metrics
    )
    nb_url = f"{GITHUB_BLOB}/notebooks/{case['notebook']}"
    extra_downloads = ""
    if case.get("data_file"):
        data_label = case.get("data_label", "dataset")
        data_url = f"{GITHUB_BLOB}/{case['data_file']}"
        extra_downloads = (
            f'<a class="btn btn-secondary" href="{data_url}" target="_blank" rel="noopener">'
            f"View {data_label} on GitHub (.csv)</a>"
        )
    repro_note = case.get(
        "repro_note",
        (
            "on GitHub. Open the notebook in Jupyter / VS Code / Colab (or GitHub Codespaces) and Run All."
            + (
                " You can also open the ready-made CSV from the same repository if you only need the data."
                if case.get("data_file")
                else ""
            )
        ),
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="{case['title']} — Case study by Laura Piñeros" />
  <title>{case['title']} — Laura Piñeros</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="case-study.css" />
</head>
<body>
  <header class="site-nav">
    <div class="wrap nav-inner">
      <a class="brand" href="../index.html">Laura Piñeros</a>
      <ul class="nav-links">
        <li><a href="../index.html#case-studies">Case Studies</a></li>
        <li><a href="../index.html#experience">Experience</a></li>
        <li><a href="../index.html#contact">Contact</a></li>
      </ul>
      <a class="btn btn-secondary" href="../index.html">← Portfolio</a>
    </div>
  </header>

  <main class="wrap">
    <section class="hero">
      <p class="eyebrow">{case['company']} · {case['year']} · {case['role']}</p>
      <h1>{case['title']}</h1>
      <p class="lead">{case['problem']}</p>
      <div class="meta-row">{badges}</div>
      <div class="cta-row">
        <a class="btn btn-primary" href="{nb_url}" target="_blank" rel="noopener">View Notebook on GitHub (.ipynb)</a>
        {extra_downloads}
        <a class="btn btn-secondary" href="../index.html#case-studies">All case studies</a>
      </div>
    </section>

    <section class="section">
      <div class="grid-3">{metrics_html}</div>
    </section>

    <section class="section">
      <article class="card">
        <h2>Business problem</h2>
        <p>{case['problem']}</p>
      </article>
      <article class="card">
        <h2>Approach</h2>
        <p>{case['approach']}</p>
        <ol class="steps" style="margin-top:0.85rem">
          <li>Generate reproducible synthetic datasets (seeded).</li>
          <li>Clean / model in the companion Jupyter notebook.</li>
          <li>Translate outputs into executive metrics on this page.</li>
        </ol>
      </article>
      <article class="card">
        <h2>Result</h2>
        <p>{case['result']}</p>
      </article>
      <article class="card">
        <h2>Reproducible analysis</h2>
        <p>
          Click <strong>View Notebook on GitHub</strong> to open <code>{case['notebook']}</code>
          {repro_note}
        </p>
      </article>
    </section>
  </main>

  <footer class="wrap footer">
    © Laura Cecilia Piñeros — Synthetic portfolio case study
  </footer>
</body>
</html>
"""


# Design metrics shown on HTML (aligned with notebook narratives)
DISPLAY_METRICS = {
    "caracol-ditu-crossmedia": [
        {"label": "Avg daily reach", "value": "4.2M", "positive": False},
        {"label": "DITU signup rate", "value": "38%", "positive": True},
        {"label": "High-value audience", "value": "22%", "positive": False},
    ],
    "d2b-meridian-mmm": [
        {"label": "Blended ROI", "value": "3.8x", "positive": True},
        {"label": "Holdout MAPE", "value": "15.9%", "positive": False},
        {"label": "Avg weekly leads", "value": "4.1k", "positive": False},
    ],
    "nae-claro-banking": [
        {"label": "Customers cleaned", "value": "8,000", "positive": False},
        {"label": "Best channel", "value": "WhatsApp", "positive": True},
        {"label": "Top response rate", "value": "5.7%", "positive": True},
    ],
    "msc-pv-load-curves": [
        {"label": "Segments", "value": "3", "positive": False},
        {"label": "Baseline MAPE", "value": "9.4%", "positive": True},
        {"label": "Customers modeled", "value": "240", "positive": False},
    ],
    "scoutmetrics-football": [
        {"label": "Matches modeled", "value": "48", "positive": False},
        {"label": "Players scored", "value": "132", "positive": True},
        {"label": "Core data layers", "value": "4", "positive": False},
    ],
}


def main() -> None:
    NB_DIR.mkdir(parents=True, exist_ok=True)
    CASE_DIR.mkdir(parents=True, exist_ok=True)

    # CSS once
    (CASE_DIR / "case-study.css").write_text(CASE_PAGE_CSS, encoding="utf-8")

    catalog = []
    for case in CASES:
        builder = BUILDERS[case["id"]]
        nb = builder()
        nb.metadata["kernelspec"] = {
            "display_name": "Python 3",
            "language": "python",
            "name": "python3",
        }
        nb_path = NB_DIR / case["notebook"]
        nbf.write(nb, nb_path)

        case_full = {**case, "display_metrics": DISPLAY_METRICS[case["id"]]}
        html_path = CASE_DIR / case["html"]
        html_path.write_text(render_case_html(case_full), encoding="utf-8")

        catalog.append(
            {
                "id": case["id"],
                "title": case["title"],
                "html": f"case-studies/{case['html']}",
                "notebook": f"notebooks/{case['notebook']}",
            }
        )
        print(f"Wrote {nb_path.name} + {html_path.name}")

    # Machine-readable map for the portfolio app
    map_path = ASSETS / "case-study-map.js"
    map_path.write_text(
        "/* Auto-generated by build_case_studies.py */\n"
        "window.CASE_STUDY_MAP = "
        + json.dumps({c["id"]: c["html"] for c in catalog}, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {map_path}")


if __name__ == "__main__":
    main()
