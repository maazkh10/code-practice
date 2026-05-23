// FRONTEND
// Dashboard.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodaysChallenge } from "../api";
import ProblemCard from "../component/ProblemCard";

function Dashboard() {
  const { email } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data = await getTodaysChallenge(email);
        setChallenge(data);
      } catch (error) {
        setError("Failed to load challenge");
      }
    };

    fetchChallenge();
  }, [email]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!challenge) {
    return <h1>Loading...</h1>;
  }

  // HIDE SOLVED QUESTIONS
  const pendingProblems = challenge.problems.filter(
    (problem) =>
      !challenge.solvedIds.includes(problem._id)
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl mb-8">
        Day {challenge.currentDay}
      </h1>

      {pendingProblems.length === 0 ? (
        <h2 className="text-green-500 text-xl">
          All Questions Solved 🎉
        </h2>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {pendingProblems.map((item) => (
            <ProblemCard
              key={item._id}
              email={email}
              problem={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

