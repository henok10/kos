import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useSelector } from "react-redux";

// Assets
import defaultProfilePicture from "../data/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "../components/ProfileUpdateOwner";

// MUI
import {
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function ProfileOwner() {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isCustomer) {
      navigate("/profileCustomer");
    }
  }, [isCustomer, navigate]);

  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
      address: "",
      profilePic: "",
      bio: "",
      userId: "",
      userListings: [],
    },
    dataIsLoading: true,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.address = action.profileObject.address;
        draft.userProfile.bio = action.profileObject.bio;
        draft.userProfile.userListings = action.profileObject.user_listings;
        draft.userProfile.userId = action.profileObject.user;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;

      default:
        // Kasus default: tidak ada perubahan pada draft
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/profiles/owner/${userId}/`
        );

        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {}
    }
    GetProfileInfo();
  }, [userId, dispatch]);

  function WelcomeDisplay() {
    if (
      state.userProfile.agencyName === null ||
      state.userProfile.agencyName === "" ||
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    ) {
      return (
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          Welcome {username}, please submit this form below to update your
          profile.
        </Typography>
      );
    } else {
      return (
        <Card
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "5px",
          }}
        >
          <CardMedia
            style={{
              display: "block",
              margin: "auto",
              height: "10rem",
              width: "10rem",
              marginTop: "1rem",
              borderRadius: "50%",
            }}
            image={
              state.userProfile.profilePic !== null
                ? state.userProfile.profilePic
                : defaultProfilePicture
            }
          />
          <CardContent>
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              Welcome Pemilik Kos {username}
            </Typography>
            <Typography></Typography>
          </CardContent>
        </Card>
      );
    }
  }

  if (state.dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Grid item container width="100%">
        <Grid item lg={6} md={6} sm={12} xs={12} marginTop={"2rem"}>
          <div>{WelcomeDisplay()}</div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} marginTop={"2rem"}>
          <ProfileUpdate userProfile={state.userProfile} />
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileOwner;
