import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigation/Routes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetail() {
const queryParam = useQuery()
const navigate = useNavigate()
const[product, setProduct] = useState()

useEffect(()=>{
  getProductDetail()
},[])

function getProductDetail(){
  try {
    axios.get("http://localhost:8090/productDetail?id=" + queryParam.get("id")).then((d)=>{
      setProduct(d.data.prdData)
    })
  } catch (error) {
    alert("Fail to fetch the data..!")
  }
}

function renderImages(){
  return product?.images?.map((item) => {
    return (
      <img className='card-img-top' src={"http://localhost:8090/" + item} style={{ height: "", width: "" }} />
    )
  })
}


  return (
    
    <div>ProductDetail
      <Header />
      <div className='row m-2 p-2'>
        <div class="card mx-auto" >
          <div style={{display:"flex",flexDirection:"row"}}>{renderImages()}</div>
          <div class="card-body">
            <h5 class="card-title">Product Name : {product?.name}</h5>
            <h5 class="card-title">Product Description : {product?.description}</h5>
            <h5 class="card-title">Product Price : {product?.price}</h5>
            <h5 class="card-title">Product Quantity : {product?.quantity}</h5>

            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary" onClick={()=>{
              navigate(ROUTES.home.name)
            }}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ProductDetail