import React, { useState, useEffect } from "react";

// Daily checklist tasks
const tasks = ["Coding Practice", "Interview Prep", "Project Work", "Job Hunting"];

const CalendarGrid = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("calendarData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const toggleTask = (date, task) => {
    const newData = { ...data };
    if (!newData[date]) newData[date] = {};
    newData[date][task] = !newData[date][task];
    setData(newData);
    localStorage.setItem("calendarData", JSON.stringify(newData));
  };

  const taskCount = (date) => {
    if (!data[date]) return 0;
    return Object.values(data[date]).filter(Boolean).length;
  };

  const getColor = (count) => {
    if (count === 0) return "bg-gray-600";
    if (count === 1) return "bg-green-900";
    if (count === 2) return "bg-green-700";
    if (count === 3) return "bg-green-500";
    return "bg-green-400"; // all tasks done
  };

  const generateCalendar = () => {
    const today = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 6); // last 2 months
    start.setDate(1);

    const days = [];
    const d = new Date(start);

    while (d <= today) {
      const key = d.toISOString().split("T")[0];
      days.push({
        key,
        weekday: d.getDay(),
        dateNum: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
        count: taskCount(key),
      });
      d.setDate(d.getDate() + 1);
    }

    return days;
  };

  const days = generateCalendar();
  const weeks = [];

  // Break into weeks
  let currentWeek = [];
  let prevWeekday = 0;
  days.forEach((day) => {
    if (day.weekday < prevWeekday) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
    prevWeekday = day.weekday;
  });
  weeks.push(currentWeek);

  return (
    
    <div>
      {/* Today’s Checklist */}
      <div className="border p-4 mt-6 rounded-lg">
        <h3 className="font-semibold mb-2">✅ Today’s Tasks</h3>
        {tasks.map((task) => {
          const todayKey = new Date().toISOString().split("T")[0];
          return (
            <label key={task} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={data[todayKey]?.[task] || false}
                onChange={() => toggleTask(todayKey, task)}
              />
              {task}
            </label>
          );
        })}
      </div>

      

      {/* Month headers */}
      <div className="flex mb-2">
        {weeks.map((week, wi) => {
          const firstDay = week[0];
          let monthLabel = '';

          if(firstDay){
            const isFirstWeekOfMonth = wi===0 || (weeks[wi - 1][0] && weeks[wi - 1][0].month !== firstDay.month);
            if(isFirstWeekOfMonth){
              monthLabel = firstDay.month;
            }
          }

           
          return (
            <div
              key={wi}
              className="flex-1 text-center text-[10px] font-medium text-gray-400 mb-0"
            >
              {monthLabel}
            </div>
          );
        })}
      </div>

      {/* Calendar grid */}
      <div className="flex gap-1 mt-0">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, di) => {
              const day = week.find((d) => d.weekday === di);
              return day ? (
                <div
                  key={day.key}
                  className={`w-3 h-3 flex text-black items-center justify-center text-[8px] rounded-[2px] cursor-pointer ${getColor(
                    day.count
                  )}`}
                  title={`${day.key}: ${day.count} tasks`}
                  onClick={() =>
                    alert(`Open checklist for ${day.key} (tasks: ${day.count})`)
                  }
                >
                  {day.dateNum}
                </div>
              ) : (
                <div key={di} className="w-8 h-8" />
              );
            })}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default CalendarGrid;
