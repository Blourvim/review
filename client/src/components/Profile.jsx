import React,{ useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { user, isAuthenticated, isLoading,getAccessTokenSilently } = useAuth0();
  const [achivementsResponse, setAchivementResponse] = useState(null);
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-w-xp6bpi.us.auth0.com";
   
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://review-blourvim.herokuapp.com`,
          scope: "read:achivements write:achivements"
        });
       // const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const res = await axios.get('/api/achivements', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        });
        console.log(res)
  
        console.log(achivementsResponse)

      } catch (e) {
        console.log(e.message);
      }
    };
   
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);



  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
     <div>
       authenticated
      </div>
    )
  );
};

export default Profile;