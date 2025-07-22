import React from 'react';
import TaskItem from './TaskItem';

function TaskList({
  tasksArray,
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
    <ul className={'mt-10 flex flex-col bg-[#2C2C2C] rounded-2xl' + (tasksArray.length > 0 ? ' px-5 pt-5 pb-3' : '')}>
      {tasksArray.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          editingTaskName={editingTaskName}
          handleCheckbox={handleCheckbox}
          handleOnClickEdit={handleOnClickEdit}
          handleOnClickCancelEditing={handleOnClickCancelEditing}
          handleEditingTask={handleEditingTask}
          handleUpdateTask={handleUpdateTask}
          handleDelete={handleDelete}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
          handleResetTimer={handleResetTimer}
          formatTime={formatTime}
        />
      ))}
    </ul>
  );
}

export default TaskList; 