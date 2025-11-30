# 🚀 Quick Start

## Start the Server

Choose any of these methods:

### Option 1: Using npm (Easiest)
```bash
npm start
```

### Option 2: Using Python directly
```bash
python3 -m http.server 8081
```

### Option 3: Using the provided script
```bash
./start.sh
```

## View the App

Once the server is running, visit:
- **http://localhost:8081**

The Simple Browser should open automatically in VS Code.

## Stop the Server

Press `Ctrl+C` in the terminal where the server is running.

## Troubleshooting

**"Connection refused" error?**
- The server isn't running. Run `npm start` again.

**Port 8081 already in use?**
```bash
# Kill the process using port 8081
lsof -ti:8081 | xargs kill -9

# Then start again
npm start
```

**Maps not showing?**
- Check browser console (F12) for errors
- Make sure TiTiler service is accessible
- Check internet connection (loads tiles from Cloud Run)

## Files Structure

```
├── index.html          ← Entry point
├── package.json        ← npm scripts
└── src/
    ├── config/
    │   └── layers.js   ← LAYER DEFINITIONS (start here!)
    ├── components/
    │   ├── Legend.js
    │   ├── LayerControls.js
    │   └── MapComponent.js
    ├── styles.js
    └── App.js
```

## Making Changes

1. **Edit any file** in the `src/` folder
2. **Refresh browser** (Cmd+R / Ctrl+R)
3. **See changes** immediately!

No build step needed! 🎉
