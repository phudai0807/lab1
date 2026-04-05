import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  if (!user) {
    return <Typography>Loading user details...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{`${user.first_name} ${user.last_name}`}</Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
        Location: {user.location}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Occupation: {user.occupation}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
        Description: {user.description}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${userId}`}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;
