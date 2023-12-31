import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  CircularProgress,
  Box,
  List,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    marginRight: "0.5rem",
    minWidth: 300,
  },
  submitButton: {
    marginTop: "1rem",
    width: "50%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    // display: "flex",
    flexDirection: "row",
  },
  textarea: {
    display: "flex",
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    // margin: "20px",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
}));

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function ReviewMessage() {
  const params = useParams();
  const classes = useStyles();
  const [allReviews, setAllReviews] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    async function GetReviewInfo() {
      try {
        const response = await axios.get(
          `https://mikos03.onrender.com/api/review/${params.id}/`
        );

        setAllReviews(response.data);
        setDataIsLoading(false);
      } catch (e) {}
    }
    GetReviewInfo();
  }, [params.id]);

  const totalReviews = allReviews.length;
  const totalStars = allReviews.reduce((sum, review) => sum + review.rate, 0);
  const averageRating = totalReviews > 0 ? totalStars / totalReviews : 0;

  if (dataIsLoading === true) {
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
      <Grid>
        <Typography variant="h6">
          Review Rating ({totalReviews} review)
        </Typography>
        <div>
          {Array.from({ length: 5 }).map((_, index) => {
            const filleds = index < averageRating;
            return (
              <FaStar
                key={index}
                fontSize="small"
                style={{
                  marginRight: 10,
                  color: filleds ? colors.orange : colors.grey,
                }}
              />
            );
          })}
        </div>
      </Grid>
      <Grid marginTop={"3rem"}>
        {allReviews.slice(0, 7).map((review) => (
          <List key={review.id}>
            <ListItemAvatar
              style={{ justifyContent: "space-between", display: "flex" }}
            >
              <Grid style={{ display: "flex" }}>
                <Avatar
                  alt={review.user_username}
                  src={review.user_avatar}
                  style={{ margin: "6px" }}
                />
                <Box>
                  <div>
                    <p>
                      <strong>{review.user_username}</strong>
                      <br />
                      {review.create_at.substring(0, 10)}
                    </p>
                  </div>
                </Box>
              </Grid>

              <div className={classes.stars}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const filled = index < review.rate;
                  return (
                    <FaStar
                      key={index}
                      fontSize="10px"
                      style={{
                        marginRight: 2,
                        color: filled ? colors.orange : colors.grey,
                      }}
                    />
                  );
                })}
              </div>
            </ListItemAvatar>
            <p>{review.comment}</p>
          </List>
        ))}
      </Grid>
    </>
  );
}

export default ReviewMessage;
