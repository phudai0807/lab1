import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = (props) => {
  // Khởi tạo state để theo dõi trạng thái bật/tắt tính năng nâng cao
  const [advancedFeatures, setAdvancedFeatures] = useState(
    window.location.search.includes("photoIndex")
  );

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Truyền state và hàm thay đổi state xuống cho TopBar */}
            <TopBar
              advancedFeatures={advancedFeatures}
              setAdvancedFeatures={setAdvancedFeatures}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route
                  path="/photos/:userId"
                  /* Truyền state xuống UserPhotos để biết đường hiển thị Stepper hay List */
                  element={<UserPhotos advancedFeatures={advancedFeatures} />}
                />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
