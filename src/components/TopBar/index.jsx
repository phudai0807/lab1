import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

// Nhận props từ App.js
function TopBar({ advancedFeatures, setAdvancedFeatures }) {
  const location = useLocation();
  const [context, setContext] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (
      pathParts.length === 3 &&
      (pathParts[1] === "users" || pathParts[1] === "photos")
    ) {
      const userId = pathParts[2];
      fetchModel(`/user/${userId}`)
        .then((response) => {
          const user = response.data;
          if (pathParts[1] === "users") {
            setContext(`${user.first_name} ${user.last_name}`);
          } else {
            setContext(`Photos of ${user.first_name} ${user.last_name}`);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setContext("");
    }
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Nguyễn Phú Đại
        </Typography>

        {/* Ô Checkbox để bật/tắt Advanced Features */}
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={(e) => setAdvancedFeatures(e.target.checked)}
              sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
            />
          }
          label="Enable Advanced Features"
        />

        <Typography variant="h5" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
