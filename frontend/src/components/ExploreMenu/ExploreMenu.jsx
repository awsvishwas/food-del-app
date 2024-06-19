import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>
        Explore our diverse menu, featuring mouth-watering appetizers, 
        hearty main courses, delectable desserts, and refreshing beverages. 
        Discover your new favorite dish today!
        </p>
        <div className="explore-menu-list">
            {
                menu_list.map((item,index)=>{
                    return(
                        <div key={index} className='explore-menu-list-item' onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}>
                            <img src={item.menu_image} alt="" className={category===item.menu_name?'active':''}/>
                            <p>{item.menu_name}</p>

                        </div>
                    )
                })
            }

        </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
