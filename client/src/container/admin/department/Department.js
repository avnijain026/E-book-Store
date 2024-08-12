import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
// import University from '../university/University';
import axios from 'axios';
import ROUTES from '../../../navigation/Routes';

//hook  to acces the query string....//read data from the url by query from the hook 
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const queryParam = useQuery();
  const [form, setform] = useState({
    name: "", image: null,
    university: queryParam.get("id"),
  });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [departments, setDepartments] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    getAll();
  }, [])

  function SaveDepartment() {
    try {
      let formData = new FormData()
      formData.append("name", form.name)
      formData.append("image", form.image, form.image.name)
      formData.append("universityId", queryParam.get("id"));
      axios.post("http://localhost:8090/department", formData, { "content-type": "multipart/form-data", }).then((d) => {
        alert(d.data.message);
        getAll()
        resetForm()
      })
    } catch (error) {
      alert("Fail to Save the Department..!")
    }
  }

  function UpdateDepartment() {
    try {
      let formData = new FormData()
      formData.append('name', form.name)
      formData.append('image', form.image,form.image.name)
      formData.append("universityId", queryParam.get("id"))
      formData.append("id", departmentId)

      axios.put("http://localhost:8090/department", formData, {
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

  function DeleteDepartment(id) {
    try {
      let ans = window.confirm("You sure you want to delete..")
      if (!ans) return;
      axios.delete("http://localhost:8090/department", { data: { id: id } }).then((d) => {
        alert(d.data.message);
        getAll()
      })
    } catch (error) {
      alert("fail to delete data")
    }
  }


  function getAll() {
    try {
      axios.get("http://localhost:8090/department?universityId=" + queryParam.get("id")).then((d) => {
        setDepartments(d.data.deptData);
      })
    } catch (error) {
      alert("Fail to fetch the data...!")
    }
  }

  function resetForm() {
    setform({ name: "", image: null })
  }

  function OnDepartmentSubmit() {
    let errors = false
    let error = { name: "", image: "" }
    if (form.name.trim().length == 0) {
      errors = true
      error = { ...error, name: "Department name empty.." }
    }
    if (form.image == null) {
      errors = true
      error = { ...error, image: "Department image empty.Please select Image..." }
    }
    if (errors) {
      setFormError(error)
    }
    else {
      setFormError(error);
      departmentId ? UpdateDepartment() : SaveDepartment()
    }
  }

  function changeHandler(e){
    setform({ ...form, [e.target.name]: e.target.value })
  };


  function renderDepartment(){
    return departments?.map((item) => {
      return(
        <tr>
          <td>
            <img src={'http://localhost:8090/' + item.image} height="130px" weight="130px" />
          </td>
          <td>{item.name}</td>
          <td><button className='btn btn-info' onClick={()=>{
            navigate(ROUTES.productAdmin.name+"?id=" + item._id + "&name=" +item.name)
          }}>Add Product</button></td>
          <td><button className='btn btn-success' onClick={()=>{
            setDepartmentId(item._id)
            setform({...form, name: item.name});
          }}>Edit </button></td>
          <td><button className='btn btn-danger' onClick={()=>{
            DeleteDepartment(item._id)
          }}>Delete </button></td>
        </tr>
      )
    })
  }


  return (
    <div>
      <Header />
      <div className='row p-2 m-2'>
        <div class="card text-center mx-auto">
          <div class="card-header bg-info"><b>
            {departmentId ? "Edit Department" : "New Department"}</b>
          </div>
          <div class="card-body">
            <div className='form-group row'>
              <label className='col-4'>University Name</label>
              <div className='col-8'>
                <input type="text" className='form-control' value={queryParam.get("name")} disabled />
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'> Department Name </label>
              <div className='col-8'>
                <input type="text" className='form-control' placeholder='Department Name' name="name" onChange={changeHandler} value={form.name}/>
                <p className='text-danger'>{formError.name}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'> Department Image </label>
              <div className='col-8'>
                <input type="file" className='form-control' onChange={(e) => {
                  let file = e.target.files[0];
                  setform({ ...form, image: file });
                }} />
                <p className='text-danger'>{formError.image}</p>
              </div>
            </div>

           
          </div>
          <div class="card-footer text-muted">
              <button className='btn btn-primary' onClick={() => {
                OnDepartmentSubmit();
              }} >
                {departmentId ? "Update Department" : "Save Department"}
              </button>
            </div>
        </div>
      </div>

      <div className='border p-2 m-2'>
        <table className='table table-bordered table-stripped table-active'>
          <thead>
            <tr>
            <th>Department Image</th>
            <th>Department Name</th>
            <th>Add Product</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {renderDepartment()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Department