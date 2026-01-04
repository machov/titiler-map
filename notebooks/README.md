# Earth Engine Landslide Risk Analysis Notebooks

This directory contains cleaned and simplified notebooks for Earth Engine landslide risk analysis.

## Files

- `earth_engine_landslide_risk.ipynb` - Complete workflow for calculating and exporting landslide risk maps

## Security Setup

**⚠️ IMPORTANT: Never commit service account credentials to git!**

### Option 1: Google Colab (Recommended)

1. Upload notebook to Google Colab
2. Add your service account JSON to Colab Secrets:
   - Click the 🔑 key icon in the left sidebar
   - Add a new secret named `EE_SERVICE_ACCOUNT_KEY`
   - Paste your entire service account JSON as the value

3. Modify the authentication cell to use Colab secrets:
```python
from google.colab import userdata
import json

SERVICE_ACCOUNT_KEY_JSON = json.loads(userdata.get('EE_SERVICE_ACCOUNT_KEY'))
```

### Option 2: Local Jupyter with Environment Variables

1. Create a `.env` file (already in `.gitignore`):
```bash
export EE_SERVICE_ACCOUNT_KEY='{"type": "service_account", ...}'
```

2. Load environment before running Jupyter:
```bash
source .env
jupyter notebook
```

3. The notebook will automatically read from `os.environ['EE_SERVICE_ACCOUNT_KEY']`

### Option 3: Google Cloud Secret Manager (Production)

For production deployments:

1. Store credentials in GCP Secret Manager
2. Access via:
```python
from google.cloud import secretmanager
client = secretmanager.SecretManagerServiceClient()
name = f"projects/{PROJECT_ID}/secrets/ee-service-account/versions/latest"
response = client.access_secret_version(request={"name": name})
SERVICE_ACCOUNT_KEY_JSON = json.loads(response.payload.data.decode("UTF-8"))
```

## Getting Your Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to: IAM & Admin > Service Accounts
4. Create or select a service account
5. Click "Keys" > "Add Key" > "Create New Key" > JSON
6. Download the JSON file (keep it secure!)
7. Store it using one of the methods above

## What Was Changed from Original Notebooks

### Security Improvements
✅ Removed hardcoded service account credentials  
✅ Added secure credential loading methods  
✅ Provided multiple security options (Colab Secrets, env vars, Secret Manager)

### Code Simplification
✅ Deduplicated repeated logic between `_latest` and base versions  
✅ Removed commented-out code  
✅ Streamlined to essential workflow only  
✅ Added clear documentation and comments

### Organization
✅ Moved from `Sensitive/` to `notebooks/` directory  
✅ Created single canonical version  
✅ Added this README with security best practices

## Workflow Overview

The notebook executes these steps:

1. **Install Dependencies** - `earthengine-api` and `geemap`
2. **Authenticate** - Load service account credentials securely
3. **Define AOI** - San José & Escazú area (5km buffer)
4. **Load Population** - WorldPop 2020 data (severity factor)
5. **Calculate Slope** - NASA DEM elevation data (probability factor)
6. **Compute Risk** - Multiply normalized population × slope
7. **Visualize** - Interactive map with geemap
8. **Export** - Cloud Optimized GeoTIFF to Google Cloud Storage

## Risk Formula

```
SEVERITY = min(population / 200, 1)
PROBABILITY = min(slope° / 45°, 1)
RISK = SEVERITY × PROBABILITY
```

Where:
- Population normalized to 200 people/km² threshold
- Slope normalized to 45° threshold
- Final risk score ranges from 0 (no risk) to 1 (critical)

## Output

The exported GeoTIFF can be served with TiTiler:
```
gs://macho-raster/risk_layers/cr_2020.tif
```

Access via:
```
https://titiler-service-{project-id}.run.app/cog/tiles/{z}/{x}/{y}?url=gs://macho-raster/risk_layers/cr_2020.tif
```

## Additional Resources

- [Earth Engine Python API](https://developers.google.com/earth-engine/guides/python_install)
- [geemap Documentation](https://geemap.org/)
- [TiTiler Documentation](https://developmentseed.org/titiler/)
- [WorldPop Dataset](https://developers.google.com/earth-engine/datasets/catalog/WorldPop_POP)
- [NASA DEM Dataset](https://developers.google.com/earth-engine/datasets/catalog/NASA_NASADEM_HGT_001)
