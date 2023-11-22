import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import {
  TextField,
  FormControl,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

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
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    minHeight: 100,
    width: '300px',
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
  },
}));

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Review() {
  const userId = useSelector((state) => state.auth.userId);
  const params = useParams();
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);

  const handleSubmit = (event) => {
    if (!isAuthenticated || !isCustomer) {
      Swal.fire({
        title: "Error",
        text: "Silakan Buat Account Customer Untuk Memulai Percakapan!",
        icon: "error",
      });
    } else {
   
   
    event.preventDefault();
    axios
      .post("https://mikos03.onrender.com/api/review/create", {
        comment: comment,
        rate: rate,
        rumah: params.id,
        user: userId,
      })
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        setError("There was an error submitting your review");
      });
    }
  };
  const handleClick = (value) => {
    setRate(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.container}>
        <h4>
          <strong>Beri Kami Penilaian</strong>
        </h4>
        <div className={classes.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || rate) > index ? colors.orange : colors.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
        <div style={{ margin: "20px",  marginTop:"1rem" }}>
          <FormControl className={classes.textarea}>
            <TextField
              id="comment"
              label="What's your experience?"
              multiline
              fullWidth
              rows={4}
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
             
            />
          </FormControl>
        </div>

        <Button
          className={classes.button}
          type="submit"
          // fullWidth
          variant="contained"
          // color="primary"
        >
          Submit
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="success"
          >
            Review added successfully!
          </Alert>
        </Snackbar>
      </form>
    </>
  );
}

export default Review;
