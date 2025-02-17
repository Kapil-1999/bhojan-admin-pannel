import React, { useState } from 'react';
import "./Add.css"
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name : '',
        description : '',
        category : 'Salad',
        price : ''
    })

    const handleChange = (e) =>{
        setData({
            ...data, 
            [e.target.name] : e.target.value
        })
    }

    const submit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image", image)
        let url = 'http://localhost:4000/api/food//add'
        const response = await axios.post(url, formData);        
        if(response.data.success) {
            setData({
                
                    name : '',
                    description : '',
                    category : 'Salad',
                    price : ''
                
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)

        }

        
    }
    return (
        <div className='add'>
            <form className='flex-col' onSubmit={submit}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img  src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input type="text" name='name' value={data.name} onChange={handleChange} placeholder='Type here' />
                </div>
                <div className="add-product-discription flex-col">
                    <p>Product Description</p>
                    <textarea name="description" value={data.description} onChange={handleChange} rows="6" placeholder="write content here" id=""></textarea>
                </div>
                <div className='add-category-price'>
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select name='category' value={data.category} onChange={handleChange}>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input type="number" value={data.price} onChange={handleChange} name='price' placeholder='$20' />
                </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
            </form>
        </div>
    )
}

export default Add