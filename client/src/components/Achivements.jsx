
import React, { useState, useEffect } from "react";

import queryString from "query-string";

const Challenges = ({ location }) => {
  const { code } = queryString.parse(location.search);
  const [achivementsData, setAchivementsData] = useState("none");

  useEffect(() => {
    fetch(`http/challenges?code=${code}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(res => setAchivementsData(JSON.stringify(res)))
  }, [code]);

  return (
    <div className="Challenges-body">
      <h3>Challenges</h3>
      <h5 className="Content">{achivementsData}</h5>
    </div>
  );
};

export default Challenges;