# HEMA Košice

Prototype site built with Vite + React.

## Manual Deployment to GitHub Pages (gh-pages branch)

We deploy as a project site at:

```
https://hawke922.github.io/hema-kosice/
```

`vite.config.ts` uses `base: '/hema-kosice/'` so assets load from the project path.

### Quick Deploy

```bash
npm install        # first time
npm run build      # outputs to dist/
npm run deploy     # pushes dist/ to gh-pages branch
```

Then in GitHub: Settings → Pages → set Source to `gh-pages` branch (root). After a minute the site is live.

### Pure Manual (No gh-pages package)

If you ever want to do it manually:

```bash
npm run build
git checkout --orphan gh-pages
git --no-pager add dist
git mv dist/* .
git commit -m "Publish"
git push -f origin gh-pages
git checkout main
```

(Simplify/massage as desired; current setup favors the npm script.)

### Development

```bash
npm install
npm run dev
```

### Notes

If you rename the repo or switch to a user site, update the `base` accordingly.
