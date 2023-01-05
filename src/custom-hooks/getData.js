import {useEffect, useState} from "react";
import {db} from "../firebase";
import {collection,onSnapshot} from "firebase/firestore";


const useGetData = (collectionName) => {
    const [data,setData]=useState([]);
    const conllectionRef=collection(db,collectionName);
    useEffect(()=>{
        const getData=async()=>{
            await onSnapshot(conllectionRef,(snapshot)=>{
                setData(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
            })

        }
        getData()
    },[conllectionRef]);
  return{data};
}
export default useGetData;