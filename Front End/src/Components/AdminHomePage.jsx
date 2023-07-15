import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
//import productService from "../service/productService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import agroService from "../service/agroService";
import axios from 'axios';
import customerService from "../service/customerService";


export default function AdminHomePage() {

  // const[firstname, setfirstName] = useState('');
  // const[lastName, setlastName] = useState('');
  // const[email, setemail] = useState('');


  // const[customerId] = useState('');
  // const[firstname, setfirstName] = useState('');
  // const[lastName, setlastName] = useState('');
  // const[email, setemail] = useState('');
  
  const [customers, setCustomers] = useState([]);
  const [farmers, setFarmers] = useState([]);

    const init = () => {
      console.log("hi akshay here");
      axios.get(`http://localhost:8080/admin/farmers`)
      .then((response)=> 
      setFarmers(response.data))
      .catch((error) => {
        console.log("Something went wrong", error);
      });
      
      axios.get(`http://localhost:8080/admin/customers`)
      .then((response)=> 
      setCustomers(response.data))
      .catch((error) => {
        console.log("Something went wrong", error);
      }); 
    }
    useEffect(()=>{
      init()
    },[])
  
  return (
    <div style={{backgroundColor: "#e2f2e6"}}>
    <div className="container" >
          <div className="row justify-content-center">
            <div className="col-11">
                
            <h3>List Of Farmers</h3>
              <table className="table table-success table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    {/* <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {farmers.map((farmer) => (
                    <tr key={farmer.farmerId}>
                      <td>{farmer.farmerId}</td>
                      <td>{farmer.firstName}</td>
                      <td>{farmer.lastName}</td>
                      <td>{farmer.email}</td>
                      <td>{farmer.contactNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3>List Of Customers</h3>
              <table className="table table-success table-striped">
                <thead>
                  <tr>
                  <th scope="col">Id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    {/* <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>{customer.customerId}</td>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.email}</td>
                      <td>{customer.contactNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
          </div>
  )
}


