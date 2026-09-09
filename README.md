# Laura Cecilia Piñeros — Portfolio

Premium English HTML portfolio with case-study notebooks (synthetic data).

## Open

Open `index.html` in a browser.

```bash
python generate_portfolio_data.py
python build_case_studies.py
```

## Structure

```
portfolio/
├── index.html
├── generate_portfolio_data.py
├── build_case_studies.py
├── assets/
├── notebooks/           # .ipynb with supposed data per project
│   ├── 01_caracol_ditu_crossmedia.ipynb
│   ├── 02_d2b_meridian_mmm.ipynb
│   ├── 03_nae_claro_banking.ipynb
│   ├── 04_msc_pv_load_curves.ipynb
│   └── 05_scoutmetrics_football.ipynb
└── case-studies/        # HTML pages linked from "Read Case Study"
    ├── caracol-ditu-crossmedia.html
    ├── d2b-meridian-mmm.html
    ├── nae-claro-banking.html
    ├── msc-pv-load-curves.html
    └── scoutmetrics-football.html
```

Each **Read Case Study** button opens the matching HTML page, which links to the downloadable notebook.
