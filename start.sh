#!/bin/bash

# Start the landslide risk map server

echo "🗺️  Starting Landslide Risk Map Server..."
echo ""
echo "Server will be available at: http://localhost:8081"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8081
