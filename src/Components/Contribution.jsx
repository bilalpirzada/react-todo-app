import React, { useState, useEffect } from "react";

const tasks = ["Coding Practice", "Interview Prep", "Project Work", "Job Hunting"];

const ContributionGrid = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("contributions");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const toggleTask = (date, task) => {
    const newData = { ...data };
    if (!newData[date]) newData[date] = {};
    newData[date][task] = !newData[date][task];
    setData(newData);
    localStorage.setItem("contributions", JSON.stringify(newData));
  };

  const getSquares = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 60; i++) { // last 60 days
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const completed = newDataCount(key);
      days.push({ key, completed });
    }
    return days.reverse();
  };

  const newDataCount = (date) => {
    if (!data[date]) return 0;
    return Object.values(data[date]).filter(Boolean).length;
  };

  const getColor = (count) => {
    if (count === 0) return "bg-gray-200";
    if (count === 1) return "bg-green-200";
    if (count === 2) return "bg-green-400";
    if (count === 3) return "bg-green-600";
    return "bg-green-800"; // all 4 done
  };

  return (
    <div className="space-y-4">
      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {getSquares().map(({ key, completed }) => (
          <div
            key={key}
            className={`w-5 h-5 rounded cursor-pointer ${getColor(completed)}`}
            title={`${key} - ${completed} tasks done`}
            onClick={() => alert(`Open checklist for ${key}`)} // modal trigger
          />
        ))}
      </div>

      {/* Checklist Modal (for today only in MVP) */}
      <div className="border p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Today’s Tasks</h2>
        {tasks.map((task) => (
          <label key={task} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={data[new Date().toISOString().split("T")[0]]?.[task] || false}
              onChange={() => toggleTask(new Date().toISOString().split("T")[0], task)}
            />
            {task}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ContributionGrid;
