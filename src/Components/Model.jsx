import React, {useEffect, useState } from "react";
import Select from "react-select";
import axios from "../Features/axios"
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import { signUpSchema } from "../YupFile";
import { useSelector,useDispatch } from "react-redux";
import { updateApi,toggleModel } from "../Features/Counter/ProductSlice";
import "./Model.css";


const Model = () => {
  
  const animatedComponents = makeAnimated();
  const dispatch =  useDispatch()
  const editItem =useSelector((state) => state.products.editItem);
  const showModel = useSelector((state) => state.products.showModel);


  useEffect(()=>{ 
  if (!editItem[0]) {
 console.log("Array not found");
  } else {
    editItem[0];
    console.log(editItem[0]);
  }},[editItem])
  
  
  
  const initialValues = {
    id:editItem[0]?.id || "",
    name: editItem[0]?.name || "",
    phone: editItem[0]?.phone || "",
    email: editItem[0]?.email || "",
    address: editItem[0]?.address || "",
    status: editItem[0]?.status || "",
  };

  const [selectedGroup, setSelectedGroup] = useState(editItem[0]?.group || null);



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.target.classList.contains("model-container")
      ) {
        dispatch(toggleModel());
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const closeModal = () => {
    dispatch(toggleModel());
  };





  const options = [
    { value: "Group - A", label: "Group - A" },
    { value: "Group - B", label: "Group - B" },
    { value: "Group - C", label: "Group - C" },
    { value: "Group - D", label: "Group - D" },
  ];

 

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values,action) => {

        if (Object.values(initialValues).every(value => value === "")) {
         const finalData = {...values,"group":selectedGroup};
          const {name,phone,email,address,group,status}=finalData
          axios.post('/items',{name,phone,email,address,group,status},
          {headers: {'Content-Type': 'application/json'}})
          .then((res)=>console.log(res.data))
          .catch((err)=>console.log(err))
          dispatch(toggleModel());
          dispatch(updateApi())
        } else {
          
          const finalData = {...values,"group":selectedGroup};
          const {id,name,phone,email,address,group,status}=finalData
          axios.put(`/items/${id}`,{name,phone,email,address,group,status},
          {headers: {'Content-Type': 'application/json'}})
          dispatch(updateApi())
          dispatch(toggleModel());
        }
        

          action.resetForm();

      },
    });



  return (
    <div>
      {showModel && (
        <div className="model-container">
          <form className="model" onSubmit={handleSubmit}>
            <div className="model-header">
              <h1>Customer Details</h1>
              <div className="model-btns">
                <button id="cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button id="save" type="submit">
                  Save
                </button>
              </div>
            </div>
            <div className="model-body">


              <div className="text-input">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur = {handleBlur}
                  value={values.name}
                  placeholder="Name"
                  name="name"
                  id="name"
                />
                {errors.name && touched.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
                </div>

              

              <div className="text-input">
                <label htmlFor="phone">Phone :</label>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur = {handleBlur}
                  value={values.phone}
                  placeholder="Phone"
                  name="phone"
                  id="phone"
                />
                {errors.phone && touched.phone ? (
                  <p className="form-error">{errors.phone}</p>
                ) : null}
              </div>
              <div className="text-input">
                <label htmlFor="Email">Email :</label>
                <input
                  type="email"
                  onChange={handleChange}
                  onBlur = {handleBlur}
                  value={values.email}
                  placeholder="Email"
                  name="email"
                  id="Email"
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>

              <div className="text-input">
                <label htmlFor="Address">Address :</label>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur = {handleBlur}
                  value={values.address}
                  placeholder="Address"
                  name="address"
                  id="Address"
                />
                {errors.address && touched.address ? (
                  <p className="form-error">{errors.address}</p>
                ) : null}
              </div>








              <div className="group-container">
                <label htmlFor="groups">Group :</label>
                <Select
                  id="groups"
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={options}
                  // defaultValue={{value:editItem[0]?.group,label:editItem[0]?.group}}

                  placeholder="Select a Group"
                  onChange={(e) => {
                    setSelectedGroup(e.value);
                  }}
                />
              </div>



              <div className="text-input">
                <label htmlFor="status-container">Status :</label>
                <div id="status-container">
                  <div className="activeRadio">
                  <input
                    type="radio"
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    checked={values.status === "Active"}
                    value="Active"
                    name="status"
                    id="IsActive"
                  />
                  <label htmlFor="IsActive">Active</label>
                  </div>
                  <div className="inActiveRadio">
                  <input
                    type="radio"
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    checked={values.status === "InActive"}
                    value="InActive"
                    name="status"
                    id="InActive"
                  />
                  <label htmlFor="InActive">InActive</label>
                  </div>
                  {errors.status && touched.status ? (
                    <p className="form-error">{errors.status}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Model;
