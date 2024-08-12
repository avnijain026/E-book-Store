import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigation/Routes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UserDepartment() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [departments,setDepartments] = useState()

  useEffect(()=>{
    getAllDepartments()
  },[])

  function getAllDepartments(){
    try {
      axios.get("http://localhost:8090/department?universityId=" + queryParam.get("id")).then((d)=>{
        setDepartments(d.data.deptData)
    })} catch (error) {
      alert("Failed to Fetch Data")
    }
  }
  
  function renderDepartments() {
    return departments?.map((item) => {
      return (
          <div className='col-3'>
            <div class="card">
              <img class="card-img-top" src={"http://localhost:8090/" + item.image} style={{ height: "300px", width: "300px" }} alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <button class="btn btn-primary" onClick={() => {
                  navigate(ROUTES.product.name + "?id=" + item._id);
                }}>View Product</button>
              </div>
            </div>
          </div>
      )
    })
  }

  return (
    <div>UserDepartment
         <Header />
         <div class='row m-2 p-2'>{renderDepartments()}</div>
    </div>
  )
}

export default UserDepartment