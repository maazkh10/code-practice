import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function ProblemCard({ problem, onSolve ,email }) {

  const navigate = useNavigate()

  // 1. This object acts as a "lookup table"
  // Make sure the keys match your backend strings (e.g., "easy", "medium", "hard")
  const difficultyStyles = {
    easy: "border-zinc-800 text-zinc-500",
    medium: "border-white text-white font-medium",
    hard: "border-white bg-white text-black font-bold",
  };

  return (
    <div className="border border-zinc-800 p-8 bg-black hover:border-white transition-all duration-300 group flex flex-col justify-between min-h-[350px]">
      <div>
        <div className="flex justify-between items-center mb-7">
          {/* 2. Access the style object using the backend value as the key */}
          <span className={`text-[10px] tracking-[0.3em] uppercase px-3 py-1 border transition-colors ${difficultyStyles[problem.difficulty] || "border-zinc-700 text-zinc-400"}`}>
            {problem.difficulty}
          </span>
          
          <span className="text-zinc-800 font-mono text-[10px] group-hover:text-zinc-500 transition-colors">
           {problem._id?.slice(-4)}
          </span>
        </div>

        <h3 className="text-white text-2xl font-bold tracking-tighter mb-4 group-hover:text-zinc-300 transition-colors">
          {problem.title}
        </h3>

        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-8 italic">
          {problem.description}
        </p>
      </div>

      <button
        onClick={() => navigate(`/solve/${email}/${problem._id}`)}
        className="w-full py-4 border border-zinc-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        Open Terminal
      </button>
    </div>
  );
}

export default ProblemCard;