import React from 'react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from "react-router-dom"
import { VStack ,FormControl,FormLabel,Input,InputGroup, InputRightElement,Button} from '@chakra-ui/react'

const Login = () => {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmpassword,setConfirmpassword]=useState()
    const [pic,setPic]=useState();
    const [show,setShow]=useState();
    const[loading,setLoading]=useState(false);
    const toast = useToast()
    const history=useHistory();
   const handleClick=()=>setShow(!show);
   
   const postDetails=(pics)=>{ }

   const submitHandler=async()=>{
    setLoading(true);
    if(!email || !password){
        toast({
                title:"Please fill all the feilds",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
        })
    }

   }
  return (
    <VStack spacing='5px' color="black">
        
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
       
       
        <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop:15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Login
        </Button>
        <Button
            variant="solid"
            colorScheme='red'
            width="100%"
           onClick={()=>{
            setEmail("guest@example.com");
            setPassword("1234");
           }}
        >
            Get Guest User Credentials
        </Button>
    </VStack>
  )
}
export default Login
