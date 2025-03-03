import React, { useEffect, useState } from 'react';
import "./List.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, IMAGE_URL } from '../../../environment';

const List = () => {
  const [list, setList] = useState([]);
  const imageUrl =  IMAGE_URL

  useEffect(() => {
    getList()
  }, [])
  
  const getList = async () => {
    let url = `${BASE_URL}food/list`
    const response = await axios.get(url);
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    let url = `${BASE_URL}food/remove`
    const response = await axios.post(url, {
      id: foodId
    })

    await getList();
    if(response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
    
  }

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list && list.map((val,index) => {
          return(
            <div key={index} className="list-table-format">
              <img src={`${imageUrl}images/`+val.image} alt="" />
              <p>{val.name}</p>
              <p>{val.category}</p>
              <p>${val.price}</p>
              <p onClick={() => removeFood(val._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List