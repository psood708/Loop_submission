import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';


interface FormData{
  email: string
  password: string
  remember: boolean
  
}

interface LoginResponse{
  success: boolean
  message: string
}

const SignUp = () => {
  // const [name,setName] = useState('Default');
  const {register,handleSubmit,formState:{errors} } = useForm<FormData>({mode:"onChange"});
  const AIRTABLE_API_KEY="keyfXgn8PL6pB3x32";
  const onSubmit = handleSubmit( async ({email,password}):Promise<LoginResponse>=>{
   
    try{
      const url = "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals/";
      const data = {
        filterByFormula: `AND(fields.email='${email}',fields.password='${password}')`,
        maxRecords:1,
        view:'Grid view'
      };
   
      const headers={
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type':'application/json',
      };
      console.log({email,password});
      // console.log(AIRTABLE_API_KEY);
      const response = await axios.get(url,{data,headers});
      const records = response.data.records;
      // console.log(records);
      let success = false;
      let message='Invalid email or password!'
      // console.log(success)
      for (const record of records) {
        if (record.fields.username == email && record.fields.password == password) {
          success = true;
          message = 'Login successful';
          break;
        }
      }
      // const message = success?'Login Successful' :'Invalid email or password';
      // console.log(recorda)
      console.log(success);
      console.log(message);
      return {success,message};
    }catch(error){
      console.error(error);
      return {success:false,message:"An error occured during login"}
    }
    // return {success:true,message:"Success"}
    // console.log(email,password,remember);
  });



  return (
     <>
      <div className="min-h-screen bg-gray-200 flex flex-col justify-center ">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">Take Home Interview</div>
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Loop</div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-lg">
          <form action="" className='space-y-6' onSubmit={onSubmit}>
            <div>
              <label htmlFor='' className={`text-sm font-bold text-gray-600 block `}>Email</label>
              <input type="text"
             {...register('email',{
              required:true,
              minLength:3,
               
              maxLength:30,
              
            })}
           
              name='email' className={`w-full p-2 border border-gray-300 rounded mt-1 ` }
              style={{borderColor: errors.email ? "red" : "" }}
              
              />
              { errors.email && "Email is invalid"}
              
            </div>
            <div>
              <label htmlFor='' className="text-sm font-bold text-gray-600 block">Password</label>
              <input type="password" {...register('password' ) } name='password' className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-300 rounded"  {...register('remember')}   />
                <label htmlFor="" className="ml-2 text-sm text-gray-600">Remember Me</label>
              </div>
              <div>
                <a href="" className="font-medium text-sm text-blue-500">Forgot Password</a>
              </div>
            </div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
          </form>
        </div>
      </div>

    </div>
     </>
  )
}

export default SignUp