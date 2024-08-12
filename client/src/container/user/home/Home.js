import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigation/Routes';
function Home() {
  const [universities, setUniversities] = useState();
  const navigate = useNavigate()

  function getAllUniversities() {
    try {
      axios.get("http://localhost:8090/university").then((d) => {
        setUniversities(d.data.uniData)
      })

    } catch (error) {
      alert("Fail to fetch the data")
    }
  }

  useEffect(() => {
    getAllUniversities()
  }, [])

  function renderUniversities() {
    return universities?.map((item) => {
      return (
          <div className='col-3'>
            <div class="card">
              <img class="card-img-top" src={"http://localhost:8090/" + item.image} style={{ height: "300px", width: "300px" }} alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <button class="btn btn-primary" onClick={() => {
                  navigate(ROUTES.department.name + "?id=" + item._id);
                }}>View Department</button>
              </div>
            </div>
          </div>
      )
    })
  }

  return (
    <div>
      <Header />
      <div className='row m-2 p-2'>
        {renderUniversities()}
      </div>
    </div>
  )
}

export default Home