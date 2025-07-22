import React from 'react';

function TaskItem({
  task,
  index,
  editingTaskName,
  handleCheckbox,
  handleOnClickEdit,
  handleOnClickCancelEditing,
  handleEditingTask,
  handleUpdateTask,
  handleDelete,
  handleStartTimer,
  handleStopTimer,
  handleResetTimer,
  formatTime
}) {
  return (
    <li className='mb-3 flex justify-between items-center bg-[#f5f5f522] p-1 rounded-xl'>
      <div
        className='w-full flex justify-start'
        style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
      >
        {task.editing ? (
          <input
            autoFocus={true}
            value={editingTaskName}
            onChange={handleEditingTask}
            className='bg-[#f5f5f520] p-3 rounded-xl w-full mr-5'
          />
        ) : (
          <label className='flex justify-start items-center hover:bg-[#f5f5f536] w-full p-3 rounded-xl hover:cursor-pointer mr-5'>
            <input
              type='checkbox'
              onChange={() => handleCheckbox(index)}
              checked={task.checked}
              className='mr-3 h-6 w-6 hover:cursor-pointer hover:scale-110 hover:bg-[#27AE60]'
            />
            {task.taskName}
            {/* Timer display */}
            <span className="ml-4 text-xs text-gray-500">{formatTime(task.timer || 0)}</span>
            {/* Timer controls */}
            <span className="ml-4 flex gap-1">
              <button
                className={
                  `rounded px-2 py-1 text-xs ` +
                  (task.timerRunning || task.checked
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600')
                }
                onClick={e => { e.stopPropagation(); handleStartTimer(index); }}
                disabled={task.timerRunning || task.checked}
                title="Start"
              >▶</button>
              <button
                className={
                  `rounded px-2 py-1 text-xs ` +
                  (!task.timerRunning || task.checked
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-400 text-white hover:bg-yellow-600')
                }
                onClick={e => { e.stopPropagation(); handleStopTimer(index); }}
                disabled={!task.timerRunning || task.checked}
                title="Stop"
              >⏸</button>
              <button
                className="bg-gray-400 rounded px-2 py-1 text-xs hover:bg-gray-600"
                onClick={e => { e.stopPropagation(); handleResetTimer(index); }}
                disabled={task.timer === 0}
                title="Reset"
              >⟲</button>
            </span>
          </label>
        )}
      </div>
      <div className='flex justify-center items-center'>
        {task.editing ? (
          <>
            <button
              className='bg-[#27AE60] rounded-xl px-3 py-2 hover:cursor-pointer hover:bg-[#27AE6090]'
              onClick={() => handleUpdateTask(index)}
            >✔</button>
            <button
              className='bg-red-500 rounded-xl px-3 py-2 ml-2 mr-2 hover:cursor-pointer hover:bg-[#C0392B]'
              onClick={() => handleOnClickCancelEditing(index)}
            >✖</button>
          </>
        ) : (
          <>
            {!task.checked && (
              <button
                className='bg-blue-400 rounded-xl px-3 py-2 hover:cursor-pointer hover:bg-blue-500'
                onClick={() => handleOnClickEdit(index)}
              >✎</button>
            )}
            <button
              className='bg-red-500 rounded-xl px-3 py-2 ml-2 mr-2 hover:cursor-pointer hover:bg-[#C0392B]'
              onClick={() => handleDelete(index)}
            >🗑</button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem; 