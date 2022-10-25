import React, { useState, useEffect } from 'react'



function CategoryButton({text, onClick}) {

  
  useEffect( () => () => console.log({text}), [] );
  const [isActive, setIsActive] = useState(false)
  const handleClick = () => {
    onClick();
    setIsActive(!isActive);
  }
  return (
    <a className='category-btn' style={ isActive ? { backgroundColor:'#1363DF', color:'white'} : {}} onClick={handleClick}>{text}</a>
  )
}

export default CategoryButton