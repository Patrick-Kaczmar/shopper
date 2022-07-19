import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = "pk.eyJ1Ijoiemh5bG93IiwiYSI6ImNsNXJrZzBpeDFhYmkzY292bGNjZnppcDIifQ.qbE1BTCATVEh2s6D-uaicg"

function App() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    })
  })

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then((res) => res.json())
    .then((data) => console.log(data))

  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  )
}

export default App
