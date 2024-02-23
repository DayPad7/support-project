import { useState, useEffect } from "react";
import {  useSelector } from "react-redux";

// this custom hook is for do the private route so basicly this function verify if its logged in or not 
export const useAuth = ()=>{
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)


    //geting user with reduc
    const {user} = useSelector((state)=> state.auth)

    useEffect(()=>{
        if(user){
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)



    }, [user])
    return{loggedIn, checkingStatus}
}