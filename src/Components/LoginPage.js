import { FormikProvider, useFormik,Field,ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from "sweetalert2";
import ListofImages from "./ListofImages";
import { useState } from "react";
function LoginPage(){
    const [showForm,setShowForm]=useState(false);
    const [flag,setFlag]=useState('');
   let formik=useFormik({
    initialValues:{
        id:'',
        pwd:'',
    },
    validationSchema:Yup.object({
        id:Yup.string().required("required"),
        pwd:Yup.string().required("required"),
    }),
    onSubmit:(values)=>{
        axios.get('http://localhost:1299/kavya/userAuthnetication/'+values?.id+"/"+values?.pwd)
  .then(response => {
    if(response?.data!=="DATA NOT FOUND WITH GIVEN CREDENTIALS"){
    // Swal.fire(response.data,"success").then(function(){
            setShowForm(true);
        if(response?.data==="DATA EXITS WITH USERROLE U"){
            setFlag('U');
        }
        if(response?.data==="DATA EXITS WITH USERROLE A"){
            setFlag('A');
        }

//             axios.get('http://localhost:1299/kavya/image/'+response?.data[0]?.id)
//   .then(response => {
//     console.log(response.data); // Use the fetched data
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
        //   console.log(response.data); // Use the fetched data
    // })
}
else{
    Swal.fire(response.data,"warning")
}
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
    }
   })
    return(<>
    {(!showForm)&&
 <FormikProvider value={formik}>
 <div className="login-container">
   <form onSubmit={formik.handleSubmit}>
     <fieldset>
       <legend>Login</legend>

       <div className="form-field">
         <label htmlFor="id">ID</label>
         <Field type="text" name="id" />
         <ErrorMessage name="id" component="div" className="error" />
       </div>

       <div className="form-field">
         <label htmlFor="pwd">Password</label>
         <Field type="password" name="pwd" />
         <ErrorMessage name="pwd" component="div" className="error" />
       </div>

       <button type="submit">Login</button>
     </fieldset>
   </form>
 </div>
</FormikProvider>}
          {showForm&&
          <ListofImages flag={flag}/>}
         
    </>)
}
export default LoginPage;