import React from "react";

const LoginButton = () => {
  const login = async () => {
    const domain = "dev-w-xp6bpi.us.auth0.com";
    const audience = "https://review-blourvim.herokuapp.com";
    const scope = "read:achivements";
    const clientId = "UZQ63NRbdq35npn85CpYnMQitlLtUTkZ";
    const responseType = "code";
    const redirectUri = "http://localhost:3000/achivements";

    const response = await fetch(
      `https://${domain}/authorize?` + 
      `audience=${audience}&` + 
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}`, {
        redirect: "manual"
      }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => login()}>
      Log In
    </button>
  );
};

export default LoginButton;