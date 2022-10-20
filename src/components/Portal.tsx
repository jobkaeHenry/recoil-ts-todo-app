import React, { ReactElement } from 'react'
import {createPortal} from 'react-dom'
import { selector } from 'recoil';


interface Props {
  children?:React.ReactNode
  selector?:string
}

const Portal:React.FC<Props> = ({children, selector}) => {
  // createPortal 은 첫번째인자로 elem을 받고, 두번째인자로 DOM Elem을 받는다
  const rootElem = selector && document.querySelector(selector)

  return (
    <>
    {
      rootElem ? createPortal(children, rootElem):children
    }
    </>
  )
}


export default Portal