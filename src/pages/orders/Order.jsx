import React, { useEffect, useState } from 'react';
import './Order.css'
import axios from 'axios';
import { assets } from '../../assets/assets';
import { BASE_URL } from '../../../environment';

const Order = () => {
  const [orders, setOrders] = useState([]);
let url = `${BASE_URL}order/`
  
  useEffect(() => {
    getOrder()
  },[])

  const getOrder = async() => {
    const response = await axios.get(url+"list");
    if(response.data.success) {
      setOrders(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async(e, orderId) => {
    console.log(e.target.value, orderId);
    const responst = await axios.post(url+"/status", {
      orderId,
      status : e.target.value
    })
    if(responst.data.success) {
      getOrder()
    } else {
      toast.error("Error")
    }
  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders?.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items?.map((item, index) => {
                  if(index === order.items?.length -1 ) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })
                }
              </p>
              <p className='order-item-name'>
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="order-item-address">
              <p>{order.address.street + ", " + order.address.city + ", " +order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
            </div>
            <p>Items : {order.items?.length}</p>
            <p>${order.amount}</p>
            <select name="" id="" onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Proccessing">Food Proccessing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order