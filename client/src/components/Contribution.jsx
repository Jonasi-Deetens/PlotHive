import React, { useState, useEffect } from "react";

const Contribution = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/contributions");
        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }
        const data = await response.json();

        setContributions(data);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div>
      <h1>Contributions</h1>
      <ul>
        {contributions.map((contribution) => (
          <li key={contribution._id}>
            <p>{contribution.text}</p>
            {/* Render other contribution properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contribution;
