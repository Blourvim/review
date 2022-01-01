import React from "react";
const LogoutButton = () => {
    const logout = async () => {
      const domain = "dev-w-xp6bpi.us.auth0.com";
      const clientId = "jbc91AJy8dqxYcOEBKTDT5Kf9Qh6VuAr";
      const returnTo = "http://localhost:3000";
  
      const response = await fetch(
        `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
        { redirect: "manual" }
      );
  
      window.location.replace(response.url);
    };
  
    return (
      <button className="Login-button" onClick={() => logout()}>
        Log out
      </button>
    );
  };
  
  export default LogoutButton;