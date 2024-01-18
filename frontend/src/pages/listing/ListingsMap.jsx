import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import houseIconPng from "../../data/Mapicons/house.png";

const ListingsMap = (props) => {
  const { allListings, flyTo } = props;
  const navigate = useNavigate();
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  });
  const initialState = {
    mapInstance: null,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
      default:
        return draft;
    }
  }

  function TheMapComponents() {
    const map = useMap();
    useEffect(() => {
      dispatch({ type: "getMap", mapData: map });
    }, [map]);
    return null;
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  useEffect(() => {
    if (
      flyTo &&
      typeof flyTo.latitude === "number" &&
      typeof flyTo.longitude === "number" &&
      state.mapInstance
    ) {
      state.mapInstance.flyTo([flyTo.latitude, flyTo.longitude], 18);
    }
  }, [flyTo, state.mapInstance]);

  return (
    <Box position="sticky" top="0">
      <Box backgroundColor="white" height="70vh" border="8px solid white">
        <div style={{ height: "100%" }}>
          <MapContainer
            center={[-5.133746047427556, 119.4875580004916]}
            zoom={16}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {allListings.map((listing) => {
              return (
                <Marker
                  key={listing.id}
                  icon={houseIcon}
                  position={[listing.latitude, listing.longitude]}
                >
                  <Popup>
                    <Typography variant="h5">{listing.title}</Typography>
                    <img
                      alt="popup"
                      src={listing.picture1}
                      style={{
                        height: "14rem",
                        width: "18rem",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/listings01/${listing.id}`)}
                    />
                    <Typography variant="body1">
                      {listing.description.substring(0, 150)}...
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/listings01/${listing.id}`)}
                    >
                      Details
                    </Button>
                  </Popup>
                </Marker>
              );
            })}
            <TheMapComponents />
          </MapContainer>
        </div>
      </Box>
    </Box>
  );
};

export default ListingsMap;
