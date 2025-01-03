import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useStore } from '../../lib/store';
import { PlannerTask } from '../../types';
import { Check, Trash2 } from 'lucide-react';

export default function TaskList({ date }: { date: string }) {
  const { plannerTasks, updatePlannerTask, deletePlannerTask } = useStore();

  const tasks = plannerTasks.filter((task) => task.date === date);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order in the store
    items.forEach((task, index) => {
      updatePlannerTask(task.id, { ...task });
    });
  };

  const toggleTask = (task: PlannerTask) => {
    updatePlannerTask(task.id, { completed: !task.completed });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`retro-card flex items-center justify-between ${
                      task.completed ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleTask(task)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {task.completed && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </button>
                      <div>
                        <p
                          className={`font-medium ${
                            task.completed ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">{task.timeSlot}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePlannerTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}