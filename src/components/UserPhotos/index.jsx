import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

// Nhận prop advancedFeatures từ App.js
function UserPhotos({ advancedFeatures }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.log(error));
  }, [userId]);

  // --- LOGIC CHO EXTRA CREDIT (DEEP LINKING) ---
  // Lấy vị trí ảnh hiện tại từ URL (ví dụ: ?photoIndex=1)
  const queryParams = new URLSearchParams(location.search);
  let currentIndex = parseInt(queryParams.get("photoIndex")) || 0;

  // Đảm bảo index không bị vượt quá giới hạn mảng
  if (currentIndex < 0) currentIndex = 0;
  if (photos.length > 0 && currentIndex >= photos.length)
    currentIndex = photos.length - 1;

  // Hàm xử lý nút Next / Prev (Thay đổi URL để deep-link hoạt động)
  const handleNext = () =>
    navigate(`/photos/${userId}?photoIndex=${currentIndex + 1}`);
  const handlePrev = () =>
    navigate(`/photos/${userId}?photoIndex=${currentIndex - 1}`);

  if (photos.length === 0) {
    return <Typography>Loading photos or no photos available...</Typography>;
  }

  // NẾU BẬT TÍNH NĂNG NÂNG CAO -> HIỂN THỊ TỪNG ẢNH (STEPPER)
  if (advancedFeatures) {
    const photo = photos[currentIndex];
    return (
      <Box>
        {/* Nút điều hướng */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            Prev
          </Button>
          <Typography variant="h6">
            Photo {currentIndex + 1} of {photos.length}
          </Typography>
          <Button
            variant="contained"
            disabled={currentIndex === photos.length - 1}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>

        {/* Khung hiển thị 1 ảnh duy nhất */}
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title={`Posted on: ${new Date(photo.date_time).toLocaleString()}`}
          />
          <CardMedia
            component="img"
            height="auto"
            image={require(`../../images/${photo.file_name}`)}
            alt="User post"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Comments:
            </Typography>
            {photo.comments ? (
              photo.comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{ mb: 2, pl: 2, borderLeft: "2px solid #eee" }}
                >
                  <Typography variant="subtitle2">
                    <Link
                      to={`/users/${comment.user._id}`}
                      style={{ fontWeight: "bold" }}
                    >
                      {`${comment.user.first_name} ${comment.user.last_name}`}
                    </Link>
                    <span style={{ marginLeft: "10px", color: "gray" }}>
                      {new Date(comment.date_time).toLocaleString()}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {comment.comment}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }

  // NẾU TẮT TÍNH NĂNG NÂNG CAO -> HIỂN THỊ DANH SÁCH CUỘN DÀI (Như cũ)
  return (
    <Box>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4 }}>
          <CardHeader
            title={`Posted on: ${new Date(photo.date_time).toLocaleString()}`}
          />
          <CardMedia
            component="img"
            height="auto"
            image={require(`../../images/${photo.file_name}`)}
            alt="User post"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Comments:
            </Typography>
            {photo.comments ? (
              photo.comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{ mb: 2, pl: 2, borderLeft: "2px solid #eee" }}
                >
                  <Typography variant="subtitle2">
                    <Link
                      to={`/users/${comment.user._id}`}
                      style={{ fontWeight: "bold" }}
                    >
                      {`${comment.user.first_name} ${comment.user.last_name}`}
                    </Link>
                    <span style={{ marginLeft: "10px", color: "gray" }}>
                      {new Date(comment.date_time).toLocaleString()}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {comment.comment}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
