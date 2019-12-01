#!/usr/bin/python

# wget https://naciscdn.org/naturalearth/50m/cultural/ne_50m_admin_0_countries.zip
# unzip ne_50m_admin_0_countries.zip
# ogr2ogr -f GeoJSON ne_50m_admin_0_countries.geojson ne_50m_admin_0_countries.shp

import json

with open('public/ne/ne_50m_admin_0_countries.geojson', 'r') as f:
    countries = json.load(f)

for c in countries['features']:
    with open('public/ne/countries/{0}.json'.format(c['properties']['ISO_A2']), 'w+') as f:
        f.write(json.dumps(c))