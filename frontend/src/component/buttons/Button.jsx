import React from 'react'

const Button = ({children,color}) => {
  return (
    <button className={`rounded bg-${color || blue}-500 `} >
        {children}
    </button>
  )
}

export default Button