import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import axios from 'axios'
import {Routes, useNavigate} from "react-router-dom"
import ROUTES from '../../../navigation/Routes';

function University() {
  const [form, setForm] = useState({name: "", image: null });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [universities, setUniversities] = useState(null);
  const [universityId, setUniversityId] = useState(null);
  const navigate=useNavigate();


  useEffect(() => {
    getAll()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, name: event.target.value });
  };

  function SaveUniversity() {
    try {
      let formData = new FormData()
      formData.append('name', form.name)
      formData.append('image', form.image)

      axios.post("http://localhost:8090/university", formData, {
        "content-type": "multipart/form-data"
      }).then((d) => {
        alert(d.data.message);
        getAll()
        resetForm()
      })
    } catch (error) {
      alert("Fail to save the data");
    }
  }

  function UpdateUniversity() {
    try {
      let formData = new FormData()
      formData.append('name', form.name)
      formData.append('image', form.image)
      formData.append("id", universityId)

      axios.put("http://localhost:8090/university", formData, {
        "content-type": "multipart/form-data"
      }).then((d) => {
        alert(d.data.message);
        getAll()
        resetForm()
      })
    } catch (error) {
      alert("fail to update data")
    }
  }

  function DeleteUniversity(id) {
    try {
      let ans = window.confirm("You sure you want to delete..")
      if (!ans) return;
      axios.delete("http://localhost:8090/university", { data: { id: id } }).then((d) => {
        alert(d.data.message);
        getAll()
      })
    } catch (error) {
      alert("fail to delete data")
    }
  }

  function getAll() {
    try {
      axios.get("http://localhost:8090/university").then((d) => {
        setUniversities(d.data.uniData)
      })
    } catch (error) {
      alert("fail to fetch the data")
    }
  }

  function resetForm() {
    setForm({ name: "", image: null })
  }

  function OnUniversitySubmit() {
    let errors = false
    let error = { name: "", image: "" }
    if (form.name.trim().length == 0) {
      errors = true
      error = { ...error, name: "University name empty.." }
    }
    if (form.image == null) {
      errors = true
      error = { ...error, image: "university image empty.." }
    }
    if (errors) {
      setFormError(error)
    }
    else {
      setFormError(error);
      universityId ? UpdateUniversity() : SaveUniversity()
    }
  }

  function renderUniversities() {
    return universities?.map((item) => {
      return (
        <tr>
          <td>
            <img src={'http://localhost:8090/' + item.image} height="120px" weight="120px"/>
          </td>
          <td>
            {item.name}
          </td>
          <td>
            <button className='btn btn-secondary' onClick={()=>{
              navigate(
                ROUTES.departmentAdmin.name + 
                "?id=" +
                 item._id + 
                 "&name=" + 
                 item.name)
            }}>Add Department</button>
          </td>
          <td>
            <button className='btn btn-warning'
              onClick={() => {
                setUniversityId(item._id)
                setForm({ ...form, name: item.name })
              }}
            >Edit</button>
          </td>
          <td>
            <button className='btn btn-danger' onClick={()=>{
              DeleteUniversity(item._id); 
            }}>
              Delete</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div>University
      <Header />
      <div className='row m-2 p-2'>
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            <b>
              {universityId ? "Edit University" : "New University"}
            </b>
          </div>
          <div class="card-body">
            <div className='form-group row'>
              <label className='col-4'>University Name</label>
              <div className='col-8'>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter University Name"
                  onChange={changeHandler}
                  value={form.name}
                />
                <p>{formError.name}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>University Image</label>
              <div className='col-8'>
                <input type="file" className="form-control" onChange={(e) => {
                  let file = e.target.files[0];
                  setForm({ ...form, image: file });
                }} />
                <p>{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button className='btn btn-info' onClick={() => {
              OnUniversitySubmit()
            }}>
              {universityId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className='border m-2 p-2'>
        <table className='table table-bordered table-striped table-active'>
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {renderUniversities()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default University