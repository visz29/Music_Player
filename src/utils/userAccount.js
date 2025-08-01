import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast , Bounce, Flip, Zoom, Slide } from 'react-toastify';


const signup = async (data)=>{
    console.log(data);
    
    let res = await axios.post("/user/signUp",data)
    console.log(res);
    
    
    return res.data

}

const login = async (data)=>{
    
    
    if(!data.email || !data.password){
        alert("Please fill all the fields")
        return
    }else if(data.password.length < 8){
        alert("Password must be at least 8 characters long")
        return
        
    }
    if(!data.email.includes("@gmail.com")){
        alert("Please enter a valid email")
        return
    }
    // console.log(data);
    
    let res = await axios.post("/user/login",data)
    .then((res) => {
        // console.log(res);
        
        setTimeout(() => {
            
            toast.success(`Successfully Logged In `, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }, 2000);

        

        // console.log(res);
        
    return {response: res.data, status: true}
    })
    .catch((err) => {
        console.error(err.response.data);
        toast.error(`Login Failed : ${err.response.data.msg}`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
        // alert(`Login failed : ${err.response.data.msg}`);
        return {response: err.response.data.msg, status: false}
    });

    return res

}

const getUser = async (data)=>{
    // console.log(data);
    
    let res = await axios.post("/user/getUser",data)
    .then((res) => {
        // console.log(res);
        return {response: res.data, status: true}
    })
    .catch((err) => {
        console.error(err);
        return {response: err.response.data.msg, status: false}
    });

    return res

}

const updateUser = async (data)=>{
    // console.log(data);

    let res = await axios.post("/user/updateUser",data)
    .then((res) => {
        // console.log(res);
        return {response: res.data, status: true}
    })
    .catch((err) => {
        console.error(err);
        return {response: err.response.data.msg, status: false}
    });
    return res
}


export {signup, login, getUser, updateUser}