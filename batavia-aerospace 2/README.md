# Batavia Aerospace — Website

> **Stack:** Pure HTML + CSS + vanilla JS · Content in JSON files · No build step required · GitHub Pages ready

---

## Quick Start (Local Preview)

```bash
# 1. Clone your repo
git clone https://github.com/YOUR-USERNAME/batavia-aerospace-site.git
cd batavia-aerospace-site

# 2. Start the local server (requires Python 3 — already on every Mac/Linux)
python3 serve.py

# 3. Open http://localhost:8080 in your browser
```

> ⚠️ You MUST use the dev server (not just open index.html directly) because  
> the browser blocks `fetch()` calls from local files. The server takes 1 second to start.

---

## Folder Structure

```
batavia-aerospace/
│
├── index.html              ← Main page (rarely needs editing)
├── serve.py                ← Local dev server
├── .gitignore
│
├── content/                ← ✅ EDIT THESE FILES for content updates
│   ├── config.json         ← Site name, email, social links, donate URL, stats
│   ├── updates.json        ← News/announcements (add new ones at the top)
│   ├── team.json           ← Team member names, roles, and photo paths
│   ├── rocketry-projects.json ← Rocket project cards and flight data
│   ├── aviation.json       ← RC aircraft, simulator, and goals
│   └── certifications.json ← L1/L2 certification records
│
├── assets/
│   ├── style.css           ← All site styling
│   └── images/
│       ├── logo-patch.png
│       ├── hcb-logo.png
│       ├── team/           ← Team headshots
│       ├── rocketry/       ← Rocket photos and CAD images
│       └── aviation/       ← RC aircraft photos
│
├── scripts/
│   └── render.js           ← Reads JSON files and builds the page (rarely edit)
│
└── docs/
    └── ANALYTICS.md        ← Analytics setup guide
```

---

## Common Tasks

### 📰 Add a New Update

Edit `content/updates.json`. Copy this block and paste it at the **top** of the array:

```json
{
  "date": "Friday, April 10, 2026",
  "title": "Your Update Title Here",
  "description": "Your description of what happened."
},
```

---

### 🖼️ Update an Image

1. Add your new image to the correct folder under `assets/images/`
   - Team photos → `assets/images/team/`
   - Rocketry photos → `assets/images/rocketry/`
   - Aviation photos → `assets/images/aviation/`

2. Update the path in the relevant JSON file:

**Team photo example** — edit `content/team.json`:
```json
{ "photo": "assets/images/team/your-new-photo.png" }
```

**Project image example** — edit `content/rocketry-projects.json`:
```json
{ "images": ["assets/images/rocketry/new-photo.png", "..."] }
```

**Use descriptive file names** like `g8-launch-april2026.png`, not `IMG_5123.jpg`.

---

### 👤 Add a Team Member

Edit `content/team.json`, add to the array:

```json
{
  "name": "First Last",
  "role": "Role Title",
  "subrole": "Program or Specialty",
  "photo": "assets/images/team/first-last.png"
}
```

---

### 🚀 Add a New Rocket Project

Edit `content/rocketry-projects.json`, add a new object to the array:

```json
{
  "id": "grainger-9",
  "name": "Grainger 9",
  "status": "progress",
  "statusLabel": "In Progress",
  "description": "Description of the project.",
  "designNotes": "Construction notes here.",
  "images": [
    "assets/images/rocketry/g9-photo1.png",
    "assets/images/rocketry/g9-photo2.png",
    "assets/images/rocketry/g9-photo3.png"
  ],
  "flightData": [],
  "meta": [
    { "label": "Launch Date",  "value": "TBD" },
    { "label": "Location",     "value": "QCRC, Princeton IL" },
    { "label": "Motor Class",  "value": "L-class" },
    { "label": "Objective",    "value": "Your objective here" }
  ],
  "cadLink": null
}
```

**Status options:** `launched` · `progress` · `planned`

---

### ✏️ Add Flight Data to a Project

In `content/rocketry-projects.json`, add to the project's `flightData` array:

```json
{
  "label": "J500 · March 2026",
  "id": "g8-j500",
  "stats": [
    { "label": "Altitude",     "value": "6,200 ft" },
    { "label": "Max Velocity", "value": "850 ft/s" },
    { "label": "Flight Time",  "value": "118 s"    },
    { "label": "Motor",        "value": "J500T (900 Ns)" }
  ]
}
```

---

### 🏅 Add a Certification

Edit `content/certifications.json`:

```json
{
  "name": "First Last",
  "program": "High Power Rocketry",
  "certification": "L1 Certified",
  "description": "Brief description of when and where."
}
```

---

### ⚙️ Change Global Site Settings

Edit `content/config.json`:

| Field | What it controls |
|-------|-----------------|
| `email` | Contact email in Join section |
| `donateUrl` | HCB donation link (all donate buttons) |
| `googleAnalyticsId` | Your GA4 Measurement ID |
| `social.instagram` | Instagram profile URL |
| `social.tiktok` | TikTok profile URL |
| `social.youtube` | YouTube channel URL |
| `social.linkedin` | LinkedIn page URL |
| `stats` | The 4 stat numbers in the About section |
| `joinBullets` | Tags shown in the Join section |

---

## Analytics Setup (Google Analytics — Free)

### Step 1 — Create a GA4 Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** → **Create Property**
3. Name it "Batavia Aerospace", choose US / USD
4. Select **Web** → enter your site URL
5. Copy your **Measurement ID** (looks like `G-XXXXXXXXXX`)

### Step 2 — Add to the site
Open `content/config.json` and replace:
```json
"googleAnalyticsId": "G-XXXXXXXXXX"
```
with your real ID. Then open `index.html` and replace both instances of `G-XXXXXXXXXX` with your ID.

### Step 3 — View your dashboard
- Go to [analytics.google.com](https://analytics.google.com)
- Click your property → **Reports** → **Realtime** (live visitors)
- **Reports → Acquisition** → where visitors come from
- **Reports → Engagement** → most viewed pages

> 📊 You can also add GA4 to your phone with the **Google Analytics app** (iOS/Android) for quick stats.

### Alternative: Plausible (privacy-friendly, no cookies)
If you prefer a simpler/GDPR-friendly option, [Plausible.io](https://plausible.io) is $9/month  
and gives a cleaner dashboard. Add one script tag to `index.html` — see `docs/ANALYTICS.md`.

---

## GitHub Workflow

### First-time setup
```bash
# In the project folder:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/batavia-aerospace-site.git
git push -u origin main
```

### Deploying to GitHub Pages (free hosting)
1. Push to GitHub
2. Go to repo → **Settings** → **Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Your site will be live at `https://YOUR-USERNAME.github.io/batavia-aerospace-site/`

> ⚠️ **Important:** GitHub Pages serves files statically, so the JSON fetch() calls work  
> correctly. Always test locally with `python3 serve.py` first.

### Everyday update workflow
```bash
# 1. Edit content files (JSON or images)
# 2. Test locally: python3 serve.py

# 3. When happy, push to GitHub:
git add .
git commit -m "Add update: G8 launch report"
git push

# GitHub Pages auto-deploys within ~60 seconds
```

---

## Optional: Decap CMS (Visual Editing, No Code)

For a web-based admin panel where you can edit content without touching JSON:

1. Create `admin/index.html` and `admin/config.yml` (see [decapcms.org](https://decapcms.org))
2. Connect to your GitHub repo via OAuth
3. Team members can edit content at `yoursite.com/admin`

The JSON structure of this site maps directly to Decap CMS collections — it's a 30-minute setup.  
See `docs/CMS_SETUP.md` (create this when you're ready to implement it).

---

## Image Tips

| Situation | Recommended size | Format |
|-----------|-----------------|--------|
| Team headshots | 600×600px (square) | PNG or JPG |
| Rocket/launch photos | 1200×900px | JPG |
| CAD screenshots | 1400×700px | PNG |
| Hero background | 1920×1080px | JPG |

**Compress images** before adding them — use [squoosh.app](https://squoosh.app) (free, browser-based).  
Smaller images = faster page loads.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Page is blank / content missing | Make sure you're using `python3 serve.py`, not opening index.html directly |
| Image not showing | Check the path in the JSON exactly matches the filename (case-sensitive) |
| JSON edit broke the page | Check for missing commas — use [jsonlint.com](https://jsonlint.com) to validate |
| Analytics not showing data | It takes 24–48 hours for GA4 to start showing data after setup |
