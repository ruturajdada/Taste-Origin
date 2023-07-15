import React from 'react'
import { useEffect, useState } from 'react'
import productService from '../service/productService';
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import { Button } from 'reactstrap';

export default function AddProduct() {
    
    const [productTitle, setProductTitle] = useState('');
    const [price, setPrice] = useState('');
    const [harvestedDate, setHarvestedDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [availableStock, setAvailableStock] = useState('');
    const [proPic, setProPic] = useState('');
    const [subCatgId, setSubCatgId] = useState('');

    const {id} =useParams();

    console.log(id);
    
    const navigate = useNavigate();

    var farmerId = sessionStorage.getItem("farmerId")

    const saveProduct = (e) => {
        e.preventDefault();
        const product = { productTitle, price, harvestedDate, expiryDate, availableStock, proPic, subCatgId ,id}
        console.log("existing product"+product);

        if(id){
                productService.update_product(farmerId,id,product)
                .then(response => {
                    console.log("product data updated succesfully!!!",response.data)
                   
                })
                .catch(error => {
                    console.log("somethimg went wrong!!!");
                })
        }
        else{
            productService.create(subCatgId, farmerId, product)
            .then(response => {
                console.log("product added succefully!!!", response.data);
                sessionStorage.setItem("addProductId",response.data.productId);
                navigate("/product/upload/");
            })
            .catch(error => {
                console.log("somethimg went wrong!!!");
            })
        }
    }
            useEffect(() =>{
                if(id){
                    console.log("in product update");
                    productService.get_product(id)
                    .then(product => {
                        console.log(product.data);
                        setProductTitle(product.data.productTitle);
                        setPrice(product.data.price);
                        setHarvestedDate(product.data.harvestedDate);
                        setExpiryDate(product.data.expiryDate);
                        setAvailableStock(product.data.availableStock);
                        setProPic(product.data.proPic);
                        setSubCatgId(product.data.subCatgId);
                    })
                    .catch(error => {
                        console.log("somethimg went wrong!!!");
                    })
                }
            },[])
    // useEffect(()=>{
    //     setCategory(productCategories);
    // },[]);

    // const handleCategory = (id)=>{
    //     const sc = productSubCategory.filter(x=>x.categoryId===id);
    //     setSubCategory(sc);
    // }

    return (
        <div style={{backgroundColor: "#e2f2e6"}}>
            <div className="container mt-4 mb-4">
                <div className="row justify-content-center">
                    <div className="col-6 border" style={{backgroundColor: "#caf2d4"}}>
                        <h1 className="my-4">Add Product</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="productTitle" className="form-label">Product title</label>
                                <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} className="form-control" id="productTitle" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="harvestedDate" className="form-label">Harvested date</label>
                                <input type="date" value={harvestedDate} onChange={(e) => setHarvestedDate(e.target.value)} className="form-control" id="harvestedDate" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="form-control" id="expiryDate" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="availableStock" className="form-label">Available stock</label>
                                <input type="number" value={availableStock} onChange={(e) => setAvailableStock(e.target.value)} className="form-control" id="availableStock" />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="proPic" className="form-label">Product Picture</label>
                                <input type="file" value={proPic} onChange={(e) => setProPic(e.target.value)} className="form-control" id="proPic" />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="subCatgId" className="form-label">Enter SubCategory</label>
                                <input type="number" value={subCatgId}
                                 onChange={(e) => setSubCatgId(e.target.value)} className="form-control" id="subCatgId" />
                            </div>
                            {/* 
                            Select Category
                            <select id="category" className='form-control' onChange={(e)=>handleCategory(e.target.value)}>
                            <option value="0">Select Category</option>
                            {
                                category && category !== undefined ? 
                                category.map((ctg,index)=>{
                                    return(
                                        <option key={index} value={ctg.id}>{ctg.cat}</option>
                                    )
                                })
                                :"no product"
                            }
                            </select>
                            Select Sub-Category
                            <select id="subcategory" className='form-control'>
                            <option value="0">Select Sub-Category</option>
                            {
                                subCategory && subCategory !== undefined ? 
                                subCategory.map((ctg1,index)=>{
                                    return(
                                        <option key={index} value={ctg1.id}>{ctg1.subcat}</option>
                                    )
                                })
                                :"no product"
                            }
                            </select> */}
                            <button type="submit"  className="btn btn-primary" onClick={(e) => saveProduct(e)}>Submit</button>
                            <Link
                             className="btn btn-primary "
                               to="/farmer/farmerHome"
                               style={{marginLeft:"15px"}}
                            >
                                Go To HomePage
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
