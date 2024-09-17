import React from 'react'
import style from "./listandform.module.css"
import WorkoutList from './WorkoutList'
import Form from './Form'
const Listandform = () => {
  return (
    <div className={style.listformmain}>
      <WorkoutList />
      <Form/>
    </div>
  )
}

export default Listandform
