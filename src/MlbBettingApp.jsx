import React, { useEffect, useState } from "react";

export default function MlbBettingApp() {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mlb-betting-app.onrender.com/api/mlb/picks")
      .then((res) => res.json())
      .then((data) => {
        setPicks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching MLB picks:", err);
        setPicks([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <h1 className="text-xl font-bold mb-4 text-center">MLB Daily Betting Picks</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : picks.length === 0 ? (
        <p className="text-center">No picks found for today.</p>
      ) : (
        <div className="space-y-4">
          {picks.map((pick, index) => (
            <div
              key={index}
              className="border rounded-xl shadow p-4 text-sm md:text-base"
            >
              <div className="font-semibold">Matchup: {pick.matchup}</div>
              <div>Recommendation: {pick.recommendation}</div>
              <div>Win Probability: {pick.winProb}</div>
              <div>Odds: {pick.odds}</div>
              <div>Expected Value: {pick.ev}</div>
              <div>Parlay Worthy: {pick.parlay ? "Yes" : "No"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}