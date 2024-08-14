import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = ({url}) => {

 // const url = "http://localhost:4000"

  const [List,setList] = useState([]);

  const fetchList = async ()=> {
    const response = await axios.get(`${url}/api/food/list`);
    
    if(response.data.success){
      setList(response.data.data);
    }
    else{
        toast.error("Error")
    }
  }

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList()
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {List.map((item,index)=>{
        return(
          <div className="list-table-format" key={index}>
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className='cursor'onClick={()=>removeFood(item._id)}>X</p>
          </div>
        )
      })}
    </div>
  )
}

export default List