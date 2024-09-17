"use client"
import React, { useContext } from 'react'
import styles from "./form.module.css"
import { useState } from 'react'
import axios from 'axios'
import { DataContext } from '../ContextAPIs/allcontext'
const Form = () => {
  const {fetchData}= useContext(DataContext)
    const [formdet, setformdet] = useState({
        name: "",
        load:"",
        reps:""
    })
    const handleChange = (value, key)=>{
        setformdet((prevValue)=>{
            return {
                ...prevValue,
                [key]: value
            }
        })
        console.log(formdet);
        
    }
    const handleSubmit = async()=>{
      try{
        const res = await axios.post("https://wor-kout-buddy-server.vercel.app/api/postData", formdet)
        if(res.status===200){
          alert("Data Added")
          fetchData();
        }
        else{
          alert("Error")
        }
      } 
      catch(err){
        alert(err);
      }
      
    }
  return (
    <div className={styles.formmain}>
      <h3>Add a new workout</h3>
      <div className={styles.inputdet}>
        <p>Exercise Title:</p>
        <input value={formdet.name} onChange={(e)=>handleChange(e.target.value,"name")}/>
      </div>
      <div className={styles.inputdet}>
        <p>Load in KG:</p>
        <input value={formdet.load} onChange={(e)=>handleChange(e.target.value,"load")}/>
      </div>
      <div className={styles.inputdet}>
        <p>Reps:</p>
        <input value={formdet.reps} onChange={(e)=>handleChange(e.target.value,"reps")}/>
      </div>
      <button onClick={handleSubmit}>Add Workout</button>
    </div>
  )
}

export default Form
