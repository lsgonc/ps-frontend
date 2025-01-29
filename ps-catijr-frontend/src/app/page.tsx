"use client"

import ListTitle from '@/components/ListTitle';
import NewListButton from '@/components/NewListButton';
import NewTaskButton from '@/components/NewTaskButton';
import useSWR from 'swr'

const fetcher = (url:string) => fetch(url).then((res) => res.json());

export default function Home() {
  //Fetch lists
  const { data, error, isLoading } = useSWR('http://localhost:3333/lists', fetcher)

  //Fetch tasks
  const { data: tasks } = useSWR(`http://localhost:3333/tasks`, fetcher);


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data)
  console.log(tasks)

  return (
    <div className="flex gap-2 text-white px-[80px] ">
      {data.map((list:any, index:number) => (
        <div key={index} className="flex flex-col border border-[#4E4E4E] pt-[16px] px-[16px] pb-[24px] rounded-md">
          <ListTitle key={list.id} listId={list.id} listTitle={list.title}></ListTitle>

          {tasks.filter((task:any) => task.listId === list.id).map((task:any) => {
            <p>{task.name}</p>
          })}

          <NewTaskButton listId={list.id}></NewTaskButton>
        </div>
      ))}
      <NewListButton></NewListButton>
    </div>
  );
}
