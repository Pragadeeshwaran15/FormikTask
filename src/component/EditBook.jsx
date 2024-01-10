import React,{useEffect, useState} from 'react'
import { useFormik} from 'formik'
import { Bookapi } from '../App'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
    let {id}=useParams()
    let [initialValues,setValues]=useState({
        title:"",
        author:"",
        isbm:"",
        date:""
    })

    let navigate=useNavigate()

    const getUserData = async()=>{
        
        try {
          let res = await axios.get(`${Bookapi}/${id}`)
          if(res.status===200)
          {
            setValues({
              title:res.data.title,
              author:res.data.author,
              isbm:res.data.isbm,
              date:res.data.date
            })
          }
      } catch (error) {
          console.log(error)
      }
      }



    let formik=useFormik({
      initialValues:initialValues,
      validationSchema:Yup.object({
        title: Yup.string().required("*Book title is required"),
        author:Yup.string().required("*Author name is required"),
        isbm:Yup.string().required("*Book code is required").max(10,"ISBM code is invalied").min(10,"ISBM code is can't be less than 10 Characters")
   
  
      }),
      enableReinitialize:true
      ,
      onSubmit:async(values)=>{
        try {
          
          let res=await axios.put(`${Bookapi}/${id}`,values)
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
        <Form.Group className="mb-3" >
          <Form.Label>title</Form.Label>
          <Form.Control type="text" placeholder="BooK Title" name='title' id='title' onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur}/>
        </Form.Group>
        {formik.touched.title && formik.errors.title ? (
         <div style={{color:"red",fontSize:"small"}}>{formik.errors.title}</div>
       ) : null} <br />
        <Form.Group className="mb-3">
          <Form.Label>Author Name</Form.Label>
          <Form.Control type="text" placeholder="Author Name" name='author' id='author' onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur}/>
        </Form.Group>
        {formik.touched.author && formik.errors.author ? (
         <div style={{color:"red",fontSize:"small"}}>{formik.errors.author}</div>
       ) : null}
       <br />

        <Form.Group className="mb-3" >
          <Form.Label>ISBM no.</Form.Label>
          <Form.Control type="text" placeholder="ISBM Number" name='isbm' id='isbm' onChange={formik.handleChange} value={formik.values.isbm} onBlur={formik.handleBlur}/>
        </Form.Group>
        {formik.touched.isbm && formik.errors.isbm ? (
         <div style={{color:"red",fontSize:"small"}}>{formik.errors.isbm}</div>
       ) : null}
       

        <Form.Group className="mb-3" >
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name='date' id='date' onChange={formik.handleChange} value={formik.values.date} onBlur={formik.handleBlur}/>
        </Form.Group>
        {formik.touched.date && formik.errors.date ? (
         <div style={{color:"red",fontSize:"small"}}>{formik.errors.date}</div>
       ) : null}
        
        <Button variant="primary" type='submit'>
          Submit
        </Button>
  </Form>
        </div>
    </div>
  </div>
}

export default EditBook