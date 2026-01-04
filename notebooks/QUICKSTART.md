# Quick Start Guide

Get up and running with the Earth Engine landslide risk notebook in 3 minutes.

## Prerequisites

- Python 3.8+
- Google Earth Engine service account
- Google Cloud Storage bucket (for exports)

## Setup (Choose One Method)

### Method 1: Google Colab (Easiest) ⭐

1. **Upload notebook to Colab**
   - Go to [Google Colab](https://colab.research.google.com/)
   - File > Upload notebook
   - Select `earth_engine_landslide_risk.ipynb`

2. **Add credentials to Colab Secrets**
   - Click 🔑 icon in left sidebar
   - Add secret: `EE_SERVICE_ACCOUNT_KEY`
   - Paste your entire service account JSON

3. **Modify authentication cell**
   ```python
   # Replace the try/except block with:
   from google.colab import userdata
   import json
   
   SERVICE_ACCOUNT_KEY_JSON = json.loads(userdata.get('EE_SERVICE_ACCOUNT_KEY'))
   EE_SERVICE_ACCOUNT_EMAIL = SERVICE_ACCOUNT_KEY_JSON['client_email']
   # ... rest stays the same
   ```

4. **Run all cells** (Runtime > Run all)

### Method 2: Local Jupyter

1. **Install dependencies**
   ```bash
   pip install earthengine-api geemap jupyter
   ```

2. **Set up credentials**
   ```bash
   cd notebooks
   cp .env.template .env
   # Edit .env with your service account JSON
   nano .env  # or use your favorite editor
   ```

3. **Load environment and start Jupyter**
   ```bash
   source .env
   jupyter notebook
   ```

4. **Open** `earth_engine_landslide_risk.ipynb` and run all cells

## Get Service Account Credentials

If you don't have a service account yet:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create new one)
3. Enable Earth Engine API:
   - APIs & Services > Enable APIs and Services
   - Search "Earth Engine API" > Enable
4. Create service account:
   - IAM & Admin > Service Accounts
   - Create Service Account
   - Name: `earth-engine-analysis`
   - Grant role: `Earth Engine Resource Writer`
5. Create key:
   - Click on service account
   - Keys > Add Key > Create New Key
   - Type: JSON
   - Download and save securely

## Configuration

Before running, review these settings in the notebook:

```python
# Area of Interest
aoi_center = [-84.15911, 9.93404]  # Change to your location
buffer_km = 5  # Adjust buffer size

# Risk thresholds
max_pop_threshold = 200  # people/km² for "high density"
max_slope_threshold = 45  # degrees for "very steep"

# Export settings
GCS_BUCKET = 'macho-raster'  # Change to your bucket
```

## Expected Output

The notebook will:

1. ✅ Authenticate with Earth Engine
2. ✅ Load population data for your AOI
3. ✅ Calculate slope from elevation
4. ✅ Compute risk scores
5. ✅ Display interactive map with 3 layers
6. ✅ Export GeoTIFF to Google Cloud Storage

**Processing time:** 2-5 minutes (depending on AOI size)

## Troubleshooting

### "EE_SERVICE_ACCOUNT_KEY not found"
- **Colab:** Check that secret name matches exactly
- **Local:** Run `source .env` before starting Jupyter

### "No WorldPop data found"
- Check country code is correct (e.g., 'CRI' for Costa Rica)
- Verify year 2020 has data for your country
- Try different year: `ee.Filter.eq('year', 2019)`

### "Export task failed"
- Verify GCS bucket exists and you have write permissions
- Check bucket name doesn't have `gs://` prefix
- Ensure service account has Storage Admin role

### Import errors
```bash
pip install --upgrade earthengine-api geemap ipywidgets
# For Jupyter Lab:
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

## What You'll Get

After running the notebook:

1. **Interactive Map** - Toggle between:
   - Population Density (Severity)
   - Landslide Probability (Slope)
   - Total Risk (Combined)

2. **GeoTIFF File** - Cloud Optimized GeoTIFF at:
   ```
   gs://your-bucket/risk_layers/cr_2020.tif
   ```

3. **TiTiler-Ready** - Serve with:
   ```
   https://titiler.xyz/cog/tiles/{z}/{x}/{y}?url=gs://your-bucket/risk_layers/cr_2020.tif
   ```

## Next Steps

1. **Validate results** - Compare with historical landslide data
2. **Adjust thresholds** - Tune population/slope normalization
3. **Add factors** - Include rainfall, geology, land use
4. **Scale up** - Process entire country or region
5. **Web map** - Integrate with your frontend (see main project)

## Need Help?

- 📖 Full documentation: `notebooks/README.md`
- 📝 Detailed changes: `notebooks/CLEANUP_SUMMARY.md`
- 🌍 Earth Engine docs: https://developers.google.com/earth-engine
- 🗺️ geemap docs: https://geemap.org

## Security Reminder

⚠️ **NEVER commit `.env` or service account JSON files to git!**

Already in `.gitignore`:
- `.env`
- `Sensitive/`
- `.env.local`

Keep credentials secure:
- ✅ Use environment variables or secrets management
- ✅ Rotate keys periodically
- ✅ Limit service account permissions
- ❌ Never share credentials in chat, email, or code repos
