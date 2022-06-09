# random-markers
Draw thousands of random points above Madrid on Google Maps


I need to paint 1M points on a map (with cluster points if necessary).
Google Maps API is unable to paint more than 100K points because the browser gets frozen (depending on hardware)

markerclusterer.js does not solve this problem because it creates clusters once the markers are rendered on the map.

Solution: use cartoDB
