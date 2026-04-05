const API_BASE_URL = "http://localhost:8080";

function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    // Thêm object cấu hình { mode: 'cors' } vào fetch
    fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      mode: "cors", // Báo cho trình duyệt biết đây là kết nối chéo hợp lệ
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error(`HTTP error! status: ${response.status}`));
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data: data });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        reject(error);
      });
  });
}

export default fetchModel;
