import { VStack ,FormControl,FormLabel,Input,InputGroup, InputRightElement,Button} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from "react-router-dom"


const SignUp = () => {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmpassword,setConfirmpassword]=useState()
    const [pic,setPic]=useState();
    const [show,setShow]=useState();
    const [loading,setLoading]=useState();
    const toast = useToast()
   const handleClick=()=>setShow(!show);
   const history=useHistory();
   
   const postDetails=(pics)=>{ 
        setLoading(true);
        if(pics===undefined){
            toast({
                title:"Please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            return;
        }
        if(pics.type==="image/jpeg" || pics.type==="image/png"){
           const data=new FormData();
           data.append("file",pics);
           data.append("upload_preset","chatsphere");
           data.append("cloud_name","dth27s6ft") ;
           fetch("https://api.cloudinary.com/v1_1/dth27s6ft/image/upload", {
            method: "POST",
            body: data,
          }).then((res)=> res.json())
           .then(data=>{
            setPic(data.url.toString())
            console.log(data.url.toString())
            setLoading(false)
           })
           .catch((err)=>{
            console.log(err);
            setLoading(false)
           })

        }else{
            toast({
                title:"Please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            setLoading(false)
            return;
        }
   }

   const submitHandler= async()=>{
        setLoading(true);
        if(!name || !email || !password ||!confirmpassword){
            toast({
                title:"Please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            setLoading(false)
            return;
        }  
        if(password !== confirmpassword){
            toast({
                title:"Please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            setLoading(false)
            return;
        }
        try{
          const config={
            headers:{
                "Content-type":"application/json",
            },
          }  
          const {data}=await axios.post("/api/user",{name,email,password,pic},config)
          toast({
            title:"Registration Successfull",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"bottom",})
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.pushState('/chats')
        }catch(error){
            toast({
                title:"Error occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            setLoading(false);
        }
   }

  return (
    <VStack spacing='5px' color="black">
        <FormControl id='first-name' isRequired >
            <FormLabel>Name</FormLabel>
            <Input
                placholder="Enter Your Name"
                onChange={(e)=>setName(e.target.value)}
            />
        </FormControl>
        <FormControl id='email' isRequired >
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="Enter Your Email"
                onChange={(e)=>setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id='password' isRequired >
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input
            type={show ?"text":"password"}
                placeholder="Enter Your Password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.7rem" size="sm" onClick={handleClick}>
                     {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='password' isRequired >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
            <Input
            type={show ?"text":"password"}
                placholder="Confirm Password"
                onChange={(e)=>setConfirmpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.7rem" size="sm" onClick={handleClick}>
                     {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="pic">
            <FormLabel>Upload Your Picture</FormLabel>
            <Input 
                type="file"
                p={.5}
                accept="image/*"
                onChange={(e)=>postDetails(e.target.files[0])}
            >
            </Input>
        </FormControl>
        <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop:15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default SignUp
