import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({name:'',description:'',price:'',category:'Rolls'})

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    const formData = new FormData()
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",Number(data.price))
    formData.append("image",image)

    const response = await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
      setData({
        name:'',description:'',price:'',category:'Rolls'
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="upload-image flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
          <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" required/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
          
        </div>
        <div className="product-name flex-col">
          <p>Product Name</p>
          <input type="text" placeholder='Enter Product Name' name='name' onChange={onChangeHandler} value={data.name} required/>
        </div>
        <div className="product-description flex-col">
          <p>Add Description</p>
          <textarea 
          onChange={onChangeHandler} 
          name="description" id="description" rows={6} placeholder='description' 
          value={data.description} required>
          </textarea>
        </div>
        <div className="product-category-price">
        <div className='product-category flex-col'>
          <p>Product Category</p>
          <select onChange={onChangeHandler} name="category" id="category">
            <option value="Rolls">Rolls</option>
            <option value="Salad">Salad</option>
            <option value="Desserts">Desserts</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
          </select>
        </div>
        <div className="product-price flex-col">
          <p>Product Price</p>
          <input onChange={onChangeHandler} type="number" name='price' placeholder='$20' value={data.price} required/>
        </div>
        </div>
        <button className='add-btn' type='submit'>Add Product</button>
      </form>
      
    </div>
  )
}

export default Add
