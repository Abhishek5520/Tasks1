import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import "./App.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { DiBintray } from "react-icons/di";

function App() {
  const [strCount, setStrCount] = useState(0);

  useEffect(() => {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors",
      });
      // console.log(response.status);
    }
    postData("https://pmponline.co.in/sdetest/requests.php", {
      stars: strCount,
    });
  }, [strCount]);

  return (
    <div className="App">
      <h1>Star Rating</h1>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setStrCount(ratingValue)}
            />
            <FaStar
              color={ratingValue <= strCount ? "#ffc107" : "#e4e5e9"}
              size={100}
            />
          </label>
        );
      })}
      <h2>{strCount}</h2>
    </div>
  );
}

export default App;
