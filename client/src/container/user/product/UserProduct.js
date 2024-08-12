import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigation/Routes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}



function UserProduct() {
const queryParam = useQuery()
const navigate = useNavigate()
const[products, setProducts] = useState();

useEffect(()=>{
  getAll()
},[])

function getAll(){
  try {
    axios.get("http://localhost:8090/product?departmentId=" + queryParam.get("id")).then((d)=>{
      setProducts(d.data.prdData);
    })

  } catch (error) {
   alert("Fail to fetch the data") 
  }
}

function renderProduct(){
  return products?.map((item)=>{
    return(
      <div className='col-3'>
        <div class="card">
              <img class="card-img-top" src={"http://localhost:8090/" + item.images[0]} style={{ height: "200px", width: "200px" }} alt="Card image " />
              <div class="card-body ">
                <h5 class="card-title">Product Name: {item.name}</h5>
                <h5 class="card-title">Product description: {item.description}</h5>
                <h5 class="card-title">Product price: {item.price}</h5>
                <h5 class="card-title">Product quantity:{item.quantity}</h5>
                <button class="btn btn-primary" onClick={() => {
                  navigate(ROUTES.productDetails.name + "?id=" + item._id);
                }}>View Product Details</button>
              </div>
            </div>
      </div>
    )
  })
}

  return (
    <div>UserProduct
         <Header />
    <div className='row m-2'>{renderProduct()}</div>
    </div>
  )
}

export default UserProduct