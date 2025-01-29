"use client"

import ListTitle from '@/components/ListTitle';
import NewListButton from '@/components/NewListButton';
import NewTaskButton from '@/components/NewTaskButton';
import TaskCard from '@/components/TaskCard';
import useSWR from 'swr'

const fetcher = (url:string) => fetch(url).then((res) => res.json());

export default function Home() {
  // Fetch lists
  const { data, error } = useSWR('http://localhost:3333/lists', fetcher);

  // Fetch tasks
  const { data: tasks, isLoading } = useSWR(`http://localhost:3333/tasks`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data || isLoading) return <div>loading...</div>;

  console.log(data);
  console.log(tasks);

  return (
    <div className="px-[80px] text-white">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {data.map((list: any, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-4 border border-[#4E4E4E] pt-[16px] px-[16px] pb-[24px] rounded-md"
          >
            <ListTitle key={list.id} listId={list.id} listTitle={list.title}></ListTitle>

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
                ></TaskCard>
              ))}

            <NewTaskButton listId={list.id}></NewTaskButton>
          </div>
        ))}
        <NewListButton></NewListButton>
      </div>
    </div>
  );
}

