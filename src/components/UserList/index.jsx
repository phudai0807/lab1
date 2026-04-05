import "./styles.css";
import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; 

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/user/list")
      .then((response) => {
        setUsers(response.data); 
      })
      .catch((error) => console.log(error));
  }, []); 
  return (
    <div>
      <Typography variant="h6" style={{ padding: "16px" }}>
        Users List
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
