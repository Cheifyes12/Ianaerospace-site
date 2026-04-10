# Analytics Setup Guide

## Option 1: Google Analytics 4 (Recommended — Free)

### Setup (5 minutes)
1. Visit [analytics.google.com](https://analytics.google.com) and sign in with a Google account
2. Click **Start measuring** → create an Account (e.g. "Batavia Aerospace")
3. Create a **Property** → Web → enter your site URL
4. Copy your **Measurement ID**: `G-XXXXXXXXXX`
5. In `index.html`, replace both instances of `G-XXXXXXXXXX` with your real ID
6. In `content/config.json`, set `"googleAnalyticsId": "G-YOURCODE"`

### What you can see (for free)
- **Realtime**: who is on the site right now
- **Users by day/week/month**
- **Traffic sources**: Google search, Instagram, direct links, etc.
- **Top pages** and how long people spend on them
- **Country / city** of visitors
- **Device type**: mobile vs desktop

### Accessing your dashboard
→ [analytics.google.com](https://analytics.google.com) — sign in, click your property  
→ Download the **Google Analytics** mobile app for quick stats on your phone

---

## Option 2: Plausible (Privacy-friendly — $9/month)

Plausible doesn't use cookies and is GDPR-compliant. Much simpler dashboard.

### Setup
Replace the GA script block in `index.html` with:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```
Then sign up at [plausible.io](https://plausible.io) and add your domain.

---

## Option 3: Umami (Self-hosted, free)

If you want full control and no monthly fees, [Umami](https://umami.is) can be self-hosted  
on a free [Railway](https://railway.app) or [Render](https://render.com) instance.

---

## Reading Your Analytics

### Key metrics to check monthly

| Metric | What it means | Good sign |
|--------|--------------|-----------|
| Users | Unique visitors | Growing over time |
| Sessions | Total visits (one user can have many) | Higher than users |
| Bounce rate | People who left immediately | Under 60% is good |
| Avg. session duration | How long people stay | Over 1 min is good |
| Top pages | Most visited sections | Use this to prioritize content |
| Traffic source | Where visitors come from | Instagram/social = your posts are working |

### Monthly review checklist
- [ ] Check total users vs last month
- [ ] See which social platform drives the most traffic
- [ ] Check if the Projects or Updates page is getting views
- [ ] Note any big spikes (correlates to launches, posts, events)
