import {Field,ErrorMessage,useFormik,FormikProvider} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import LoginPage from './LoginPage';
function SignInPage(){
    const [show,setShow]=useState(false);
    const formik=useFormik({
        initialValues:{
            name:'',
            role:'',psw:'',discription:''
        },
        validationSchema:Yup.object({
            name:Yup.string().required("Required"),
            role:Yup.string().required("Required"),
            psw:Yup.string().required("Required"),
            discription:Yup.string().required("Required"),
        }),
        onSubmit:(values)=>{
          let payload={
              "name":values?.name,
             "des":values?.discription,
             "role":values?.role,
             "password":values?.psw
          }
          axios.post('http://localhost:1299/kavya/UserSign', payload)
  .then(response => {
    Swal.fire(response?.data, 'success').then(function(){
        setShow(true);
    })
  })
  .catch(error => {
    console.error('Error:', error);
  });
        }
    })

    return(<>
    {(!show)&&
   <FormikProvider value={formik}>
   <div className="form-container">
     <form onSubmit={formik.handleSubmit}>
       <fieldset>
         <legend>SignIn Page</legend>
 
         <div className="form-field">
           <label>Name</label>
           <Field type="text" name="name" />
           <ErrorMessage name="name" component="div" className="error" />
         </div>
 
         <div className="form-field">
           <label>Role</label>
           <Field name="role" component="select">
             <option value="">---Select---</option>
             <option value="A">Admin</option>
             <option value="U">User</option>
           </Field>
           <ErrorMessage name="role" component="div" className="error" />
         </div>
 
         <div className="form-field">
           <label>Description</label>
           <Field type="text" name="discription" />
           <ErrorMessage name="discription" component="div" className="error" />
         </div>
 
         <div className="form-field">
           <label>Password</label>
           <Field type="password" name="psw" />
           <ErrorMessage name="psw" component="div" className="error" />
         </div>
 
         <div className="button-group">
           <button type="submit">SignIn</button>
           <button type="button" onClick={() => setShow(true)}>Login</button>
         </div>
       </fieldset>
     </form>
   </div>
 </FormikProvider>}
    {show&&
       <LoginPage/>}
    </>)
}
export default SignInPage;