import React from "react";
import { Icon } from "leaflet";
import { Grid, Typography, Box, Button } from "@mui/material";
import wellknown from "wellknown";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import TheMapComponent from "./TheMapComponent";
import stadiumIconPng from "../data/Mapicons/stadium.png";
import hospitalIconPng from "../data/Mapicons/hospital.png";
import universityIconPng from "../data/Mapicons/university.png";
function Peta(props) {
  const { datapeta } = props;
  const stadiumIcon = new Icon({
    iconUrl: stadiumIconPng,
    iconSize: [40, 40],
  });
  const hospitalIcon = new Icon({
    iconUrl: hospitalIconPng,
    iconSize: [40, 40],
  });
  const universityIcon = new Icon({
    iconUrl: universityIconPng,
    iconSize: [40, 40],
  });
  const GoogleMapsShortcut = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${datapeta.latitude},${datapeta.longitude}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <Grid
        item
        container
        style={{ marginTop: "1rem" }}
        spacing={1}
        justifyContent="space-between"
      >
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Box style={{ height: "24rem", overflow: "auto" }}>
            {datapeta.listing_poi.map((poi) => {
              function DegreeToRadian(coordinate) {
                return (coordinate * Math.PI) / 180;
              }
              function CalculateDistance() {
                const lat1 = DegreeToRadian(datapeta.latitude);
                const lon1 = DegreeToRadian(datapeta.longitude);
                const coordinates = wellknown(poi.location).coordinates;
                if (coordinates && coordinates.length === 2) {
                  const lat2 = DegreeToRadian(coordinates[0]);
                  const lon2 = DegreeToRadian(coordinates[1]);
                  const centralAngle = Math.acos(
                    Math.sin(lat1) * Math.sin(lat2) +
                      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
                  );
                  const R = 6371;
                  const distance = R * centralAngle;
                  return distance.toFixed(2);
                } else {
                  return "Invalid Coordinates";
                }
              }
              return (
                <div
                  key={poi.id}
                  style={{
                    marginBottom: "0.5rem",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {poi.name}
                  </Typography>
                  <Typography variant="subtitle1" style={{ fontSize: "12px" }}>
                    {poi.type} |{" "}
                    <span style={{ fontWeight: "bolder", color: "black" }}>
                      {CalculateDistance()} Km
                    </span>
                  </Typography>
                </div>
              );
            })}
          </Box>
          <Button
            onClick={GoogleMapsShortcut}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              fontSize: "16px",
              padding: "10px 20px",
              marginTop: "0.5rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            startIcon={<AssistantDirectionIcon />}
          >
            google maps
          </Button>
        </Grid>
        <Grid
          item
          lg={9}
          md={9}
          sm={12}
          xs={12}
          style={{ height: "28rem", zIndex: 99 }}
        >
          <MapContainer
            center={[datapeta.latitude, datapeta.longitude]}
            zoom={16}
            scrollWheelZoom={true}
            zIndex={100}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {datapeta.listing_poi.map((poi) => {
              function PoiIcon() {
                if (poi.type === "Stadium") {
                  return stadiumIcon;
                } else if (poi.type === "Hospital") {
                  return hospitalIcon;
                } else if (poi.type === "University") {
                  return universityIcon;
                }
              }
              function DegreeToRadian(coordinate) {
                return (coordinate * Math.PI) / 180;
              }
              function CalculateDistance() {
                const lat1 = DegreeToRadian(datapeta.latitude);
                const lon1 = DegreeToRadian(datapeta.longitude);
                const coordinates = wellknown(poi.location).coordinates;
                if (coordinates && coordinates.length === 2) {
                  const lat2 = DegreeToRadian(coordinates[0]);
                  const lon2 = DegreeToRadian(coordinates[1]);
                  const centralAngle = Math.acos(
                    Math.sin(lat1) * Math.sin(lat2) +
                      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
                  );
                  const R = 6371;
                  const distance = R * centralAngle;
                  return distance.toFixed(2);
                } else {
                  return "Invalid Coordinates";
                }
              }
              const coordinates = wellknown(poi.location).coordinates;
              return (
                <Marker
                  key={poi.id}
                  position={[coordinates[0], coordinates[1]]}
                  icon={PoiIcon()}
                >
                  <Popup>
                    {poi.name} {CalculateDistance()} Km
                  </Popup>
                </Marker>
              );
            })}
            <TheMapComponent listingInfo={datapeta} />
          </MapContainer>
        </Grid>
      </Grid>
    </>
  );
}
export default Peta;
