# random-markers
Draw thousands of random points above Madrid on Google Maps


I need to paint 1M points on a map (with cluster points if necessary).
Google Maps API is unable to pintarmás 100K points because the browser is locked (depending on hardware)

markerclusterer.js does not solve this problem because it creates clusters once the markers are rendered on the map.

Solution: use cartoDB
