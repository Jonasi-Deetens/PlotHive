import { useState, useEffect } from "react";

const Contribution = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        console.log("test trying fetch");
        const response = await fetch("/api/contributions");
        console.log(response);
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
