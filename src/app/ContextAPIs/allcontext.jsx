"use client"
import React,{createContext, useState, useEffect} from "react"
import axios from "axios"
const DataContext = createContext();
const DataProvider = ({children})=>{
    const [data, setData] = useState([]);
    const [loading, setloading]= useState(false);
  const fetchData = async () => {
    setloading(true)
    try {
      const res = await axios.get("https://wor-kout-buddy-server.vercel.app/api/getalldata");
      setData(res.data);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteData = async(id)=>{
    setloading(true)
    try{
        const res = await axios.put("https://wor-kout-buddy-server.vercel.app/api/deletedata", {id});
        if(res.status===200){
          alert("Deleted successfully");
          setloading(false);
          fetchData();
        }
    }
    catch(err){
      console.log(err);
      alert(err);
    }
  }
  return (
    <DataContext.Provider value={{ data, fetchData, deleteData }}>
        {children}
    </DataContext.Provider>
);
}
export {DataProvider, DataContext}