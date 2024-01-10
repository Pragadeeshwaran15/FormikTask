import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar'
import { Authorapi, Bookapi } from '../App';
import axios from 'axios';


function Dashboard() {
    let[book,setBook]=useState([])
    let[author,setAuthor]=useState([])

//book data by api
    let getData=async()=>{
        try {
            let res= await axios.get(Bookapi)
            if(res.status===200){
                  setBook(res.data)
            }
            
        } catch (error) {
            
        }
    }

    let navigate=useNavigate()
    let handleBookDelete=async(id)=>{
        try {
            let res=await axios.delete(`${Bookapi}/${id}`)
            if(res.status===200){
                getData()
            }
        } catch (error) {
            
        }  
    }

// author data
 const getAuthordata=async()=>{
        try {
            let res= await axios.get(Authorapi)
            if(res.status===200){
                  setAuthor(res.data)
            }
            
        } catch (error) {
            
        }
 }
 let handleAuthorDelete=async(id)=>{
    try {
        let res=await axios.delete(`${Authorapi}/${id}`)
        if(res.status===200){
            getAuthordata()
        }
    } catch (error) {
        
    }  
}

    useEffect(()=>{
        getData()
        getAuthordata()
    },[])
  return <>
  <div id="content-wrapper" >
             
            <div id="content" className="d-flex flex-row">
            <SideBar/>
                <div className="container-fluid">
                       
                <div className="row">
                    <h1>Book Info</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBM NO.</th>
                        <th>Date of publication</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            book.map((e,i)=>{
                                return <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{e.title}</td>
                                    <td>{e.author}</td>
                                    <td>{e.isbm}</td>
                                    <td>{e.date}</td>
                                    <td className='d-flex'>
                                        <Button variant='primary' onClick={()=>navigate(`/editbook/${e.id}`)}>Edit</Button>
                                        &nbsp;
                                        <Button variant='danger' onClick={()=>{handleBookDelete(e.id)}}>Delete</Button>
                                    </td>
                                </tr>
                            })
                       }
                    </tbody>
                </Table>
                </div>
                <div className="row mt-1">
                    <h1>Author Info</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>D.O.B</th>
                        <th>BIO</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            author.map((e,i)=>{
                                return <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{e.name}</td>
                                    <td >{e.birthday}</td>
                                    <td>{e.bio}</td>
                                    <td className='d-flex justify-content-center'>
                                        <Button variant='primary' onClick={()=>navigate(`/editauthor/${e.id}`)}>Edit</Button>
                                        &nbsp;
                                        <Button variant='danger' onClick={()=>{handleAuthorDelete(e.id)}}>Delete</Button>
                                    </td>
                                </tr>
                            })
                       }
                    </tbody>
                </Table>
                </div>

                       
                       

                </div>
           </div>
  </div>
  </>
}

export default Dashboard
