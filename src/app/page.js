import React from 'react'
import styles from "./page.module.css"
import Listandform from './Components/Listandform'
const page = () => {
  return (
    <div className={styles.maindashboard}>
      <Listandform />
    </div>
  )
}

export default page
