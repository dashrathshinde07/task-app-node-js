import React, { useEffect, useState } from 'react'
import { getAllTasks } from '../../apis/TasksApi';

const AllTask = () => {
  const [allTaskData,setAllTaskData] = useState([]);

  const getAllTasksFromApi = async()=>{
    const responseData = await getAllTasks();
    if(responseData){
      setAllTaskData(responseData)
    }
  }
  useEffect(()=>{getAllTasksFromApi()},[])
  console.log("allTaskData---->",allTaskData)
  return (
    <div>
      
    </div>
  )
}

export default AllTask
