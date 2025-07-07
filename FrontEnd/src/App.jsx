import { useState, useEffect } from 'react';
import prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // dark theme default
import Editor from 'react-simple-code-editor';
import './App.css';
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // dark markdown highlight
import { GridLoader } from 'react-spinners';
import CustomNavbar from './Components/Navbar';

function App() {
  const [code, setCode] = useState(`function sum(){\n  return 1 + 1;\n}`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (theme === "dark") {
      import("./AppDark.css");
    } else {
      import("./AppLight.css");
    }
  }, [theme]);
  useEffect(() => {
    prism.highlightAll();
  }, [code]);
 

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  async function reviewCode() {
    setLoading(true);
    try {
      // const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      const response = await axios.post('https://aicodereviewer-17eq.onrender.com//ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview({ review: "Something went wrong. Please try again." });
    }
    setLoading(false);
  }

  return (
    

    <div className={`app ${theme}`}>
    <CustomNavbar theme={theme} toggleTheme={toggleTheme} />
  
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              backgroundColor: theme === "dark" ? "#161515" : "#f0f0f0",
              color: theme === "dark" ? "#ffffff" : "#000000",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
  
        <div
          onClick={!loading ? reviewCode : undefined}
          className="review"
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Loading..." : "Review"}
        </div>
      </div>
  
      <div className="right">
        {loading ? (
          <div className="loader-container">
            <GridLoader color={theme === "dark" ? "#ffffff" : "#000000"} size={15} />
          </div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review.review}</Markdown>
        )}
      </div>
    </main>
  </div>
  );
}

export default App;
