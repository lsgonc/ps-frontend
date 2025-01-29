"use client"

import ListTitle from '@/components/ListTitle';
import NewListButton from '@/components/NewListButton';
import NewTaskButton from '@/components/NewTaskButton';
import TaskCard from '@/components/TaskCard';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: lists, error: listsError } = useSWR('http://localhost:3333/lists', fetcher);
  const { data: tasks, isLoading: tasksLoading, mutate: mutateTasks } = useSWR('http://localhost:3333/tasks', fetcher);

  if (listsError) return <div>failed to load</div>;
  if (!lists || tasksLoading) return <div>loading...</div>;

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleUpdateTask = async (updatedTask: any) => {
    try {
        // Call the API to create the list
        const response = await fetch(`http://localhost:3333/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: updatedTask.title,
                description: updatedTask.description,
                priority: updatedTask.priority,
                finishAt: new Date(updatedTask.finishAt),
                listId: updatedTask.listId,
                isFinished: updatedTask.finishedAt === null ? false : true
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update the task");
        }

        mutate("http://localhost:3333/tasks");
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

  // Handle drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetListId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    // Find the task being dragged
    const task = tasks.find((task: any) => task.id === taskId);
    if (!task) return;

    // Update the task's listId
    const updatedTask = { ...task, listId: targetListId };

    // Send a request to update the task on the backend
    await handleUpdateTask(updatedTask)

    // Optimistically update the local state
    const updatedTasks = tasks.map((t: any) => (t.id === taskId ? updatedTask : t));
    mutateTasks(updatedTasks, false); // Revalidate with the server
  };

  // Allow drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="sm:px-[80px] px-[10px] text-white">
      <div className="flex max-md:flex-col gap-2 overflow-y-auto md:overflow-x-auto  h-screen">
        {lists.map((list: any) => (
          <div
            key={list.id}
            onDrop={(e) => handleDrop(e, list.id)}
            onDragOver={handleDragOver}
            className="flex flex-col h-fit gap-4 border border-[#4E4E4E] pt-[16px] px-[16px] pb-[24px] rounded-md md:min-w-[460px] sm:min-w-400"
          >
            <ListTitle listId={list.id} listTitle={list.title} />

            {tasks
              .filter((task: any) => task.listId === list.id)
              .map((task: any) => (
                <TaskCard
                  key={task.id}
                  date={task.finishAt <= Date.now() ? "onTime" : "late"}
                  priority={task.priority}
                  title={task.title}
                  description={task.description}
                  taskDate={task.finishAt}
                  isFinished={task.finishedAt}
                  id={task.id}
                  listId={list.id}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  draggable
                />
              ))}

            <NewTaskButton listId={list.id} />
          </div>
        ))}
        <NewListButton />
      </div>
    </div>
  );
}