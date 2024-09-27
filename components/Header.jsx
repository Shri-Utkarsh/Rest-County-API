import { useState } from "react";

export default function Header() {
  const[isDark, setIsDark] = useState(false)
  console.log(JSON.parse(localStorage.getItem("isDarkMode")));

 
  return (
    <header className="header-container">
      <div className="header-content">
        <h2 className="title">Where in the World ?</h2>
        <p
          className="theme-change"
          
          onClick={() => {document.body.classList.toggle("dark")
            setIsDark(!isDark)
            localStorage.setItem('isDarkMode', !isDark)
          }}>
        
          <i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`}>
            </i>&nbsp;&nbsp; {isDark? 'Light' : 'Dark'} Mode
        </p>
      </div>
    </header>
  );
}
