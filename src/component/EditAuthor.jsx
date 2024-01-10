import React,{useEffect, useState} from 'react'
import { useFormik} from 'formik'
import { Authorapi } from '../App'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';

function EditAuthor() {
    let params=useParams()
    let [initialValues,setValues]=useState({
        name:"",
        bio:"",
        birthday:""
    })

    let navigate=useNavigate()

    const getUserData = async()=>{
        let {id} = params
        try {
          let res = await axios.get(`${Authorapi}/${id}`)
          if(res.status===200)
          {
            setValues({
              name:res.data.name,
              bio:res.data.bio,
              birthday:res.data.birthday
            })
          }
      } catch (error) {
          console.log(error)
      }
      }



    let formik=useFormik({
      initialValues:initialValues,
      validationSchema:Yup.object({
       name: Yup.string().required("*Author name is required"),
       bio:Yup.string().required("*Fill the  biography").max(50,"Only 50 words are allowed")
  
  
      }),
      enableReinitialize:true
      ,
      onSubmit:async(values)=>{
        try {
            let {id} = params
            values.id = id
          
          let res=await axios.put(`${Authorapi}/${id}`,values)
          if(res.status===200){

            navigate("/dashboard")
          }
         } catch (error) {
          console.log(error);
         }
      }
    })
    useEffect(()=>{
        getUserData()
    },[])
    
  
    return <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
        <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Edit Author Dtailes</h1>
                </div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control type="text" placeholder="Author Name" name='name' id='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
          </Form.Group>
          {formik.touched.name && formik.errors.name ? (
           <div style={{color:"red",fontSize:"small"}}>{formik.errors.name}</div>
         ) : null}
         <br />
  
          <Form.Group className="mb-3" >
            <Form.Label>Author Biography</Form.Label>
            <Form.Control as="textarea" placeholder="" name='bio' id='bio' onChange={formik.handleChange} value={formik.values.bio} onBlur={formik.handleBlur}/>
          </Form.Group>
          {formik.touched.bio && formik.errors.bio ? (
           <div style={{color:"red",fontSize:"small"}}>{formik.errors.bio}</div>
         ) : null}
         
  
          <Form.Group className="mb-3" >
            <Form.Label>D.O.B</Form.Label>
            <Form.Control type="date" name='birthday' id='birthday' onChange={formik.handleChange} value={formik.values.birthday} onBlur={formik.handleBlur}/>
          </Form.Group>
          {formik.touched.birthday && formik.errors.birthday ? (
           <div style={{color:"red",fontSize:"small"}}>{formik.errors.birthday}</div>
         ) : null}
          
          <Button variant="primary" type='submit'>
            Submit
          </Button>
    </Form>
        </div>
    </div>
  </div>
}

export default EditAuthor