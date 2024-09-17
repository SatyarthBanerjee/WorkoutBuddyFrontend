"use client";
import React, { useContext, useState } from "react";
import styles from "./workoutlist.module.css";
import Image from "next/image";
import { DataContext } from "../ContextAPIs/allcontext";
import axios from "axios";

// Helper function to calculate time ago
const timeAgo = (timestamp) => {
  const now = Date.now(); // current time in milliseconds
  const timeDifference = now - new Date(timestamp).getTime(); // difference in milliseconds

  // Calculate time in different units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};

const WorkoutList = () => {
  const { data, deleteData, fetchData } = useContext(DataContext);
  const [editId, setEditId] = useState(null); // To track the item being edited
  const [editedItem, setEditedItem] = useState({}); // To hold the current edit values

  const handleDelete = async (id) => {
    await deleteData(id);
  };

  const handleEdit = (item) => {
    setEditId(item._id); // Set the current workout to be edited
    setEditedItem({ load: item.load, reps: item.reps }); // Store the current values for editing
  };

  const handleSave = async(id) => {
    // Here you would send the editedItem to the server to save changes (via API)\
    try{
      const res = await axios.put(`https://wor-kout-buddy-server.vercel.app/api/updatedata/${id}`,editedItem)
      if(res.status===200){
        alert("Upadated successfully")
        setEditId(null);
        fetchData()
      }
    }
    catch(err){
      alert(err);
      console.log(err);
      
    }
    
    console.log("Save changes for item id:", id, editedItem);

     // Exit edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value }); // Dynamically update input values
  };

  return (
    <div className={styles.maindash}>
      {data.map((item, id) => {
        const isEditing = editId === item._id; // Check if the current item is being edited

        return (
          <div key={id} className={styles.workoutlistmain}>
            <div className={styles.headanddel}>
              <h3>{item.name}</h3>
              <div className={styles.delandup}>
                {isEditing ? (
                  <Image
                    src="/Assets/download.png"
                    height={15}
                    width={15}
                    alt="save"
                    onClick={() => handleSave(item._id)} // Save the current item
                  />
                ) : (
                  <Image
                    src="/Assets/pen.png"
                    height={15}
                    width={15}
                    alt="edit"
                    onClick={() => handleEdit(item)} // Enter edit mode
                  />
                )}
                <Image
                  src="/Assets/delete (1).png"
                  onClick={() => handleDelete(item._id)}
                  height={15}
                  width={15}
                  alt="delete"
                />
              </div>
            </div>

            <div className={styles.workoutlist}>
              {isEditing ? (
                <p>Load:<input
                  type="number"
                  name="load"
                  value={editedItem.load}
                  onChange={handleChange}
                  placeholder="Load"
                  
                /></p>
              ) : (
                <p>Load (Kg): {item.load}</p>
              )}

               {isEditing ? (
                <p>
                Reps: 
                <input
                  type="number"
                  name="reps"
                  value={editedItem.reps}
                  onChange={handleChange}
                  placeholder="Reps"
                />
                </p>
              ) :(
                <p>Reps: {item.reps}</p>
              )}

              <p>Time: {timeAgo(item.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutList;
