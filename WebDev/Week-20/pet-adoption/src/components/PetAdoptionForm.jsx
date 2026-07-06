import React, { useReducer, useState } from 'react';
import AdopterData from "./AdopterData";
import { validation } from "../utils/validation";

const initialState = {
  data: { name: "", type: "", adopterName: "", email: "", phone: "" },
  errors: { petName: "", breed: "", adopterName: "", email: "", phone: "" }
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        errors: validation(action.errorField, action.value, { ...state.errors })
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const PetAdoptionForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formList, setFormList] = useState([]);
  const [showAdopterData, setShowAdopterData] = useState(false);

  const handleChange = (field, errorField, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, errorField, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data, errors } = state;
    
    if (Object.values(data).some(val => val === "")) {
      alert("Please fill out all the fields");
      return;
    }
    
    if (Object.values(errors).some(err => err !== "")) {
      alert("Please fix the errors before submitting");
      return;
    }

    setFormList((prev) => [...prev, data]);
    setShowAdopterData(true);
    dispatch({ type: 'RESET' });
  };

  if (showAdopterData) {
    return <AdopterData formData={formList} handleGoBack={() => setShowAdopterData(false)} />;
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor='petName'>Pet Name:</label>
        <input 
          onChange={(e) => handleChange("name", "petName", e.target.value)} 
          value={state.data.name} type="text" name="petName" placeholder='Pet Name' 
        />
        <small>{state.errors.petName}</small>

        <label htmlFor='petType'>Pet Type:</label>
        <select value={state.data.type} name="petType" onChange={(e) => handleChange("type", "breed", e.target.value)}>
          <option value="">Select Pet Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Birds</option>
          <option value="Others">Others</option>
        </select>
        <small>{state.errors.breed}</small>

        <label htmlFor='adopterName'>Your Name:</label>
        <input 
          onChange={(e) => handleChange("adopterName", "adopterName", e.target.value)} 
          value={state.data.adopterName} type="text" name="adopterName" placeholder='Your Name' 
        />
        <small>{state.errors.adopterName}</small>

        <label htmlFor='email'>Email:</label>
        <input 
          onChange={(e) => handleChange("email", "email", e.target.value)} 
          value={state.data.email} type="email" name="email" placeholder="Email" 
        />
        <small>{state.errors.email}</small>

        <label htmlFor='phone'>Phone:</label>
        <input 
          onChange={(e) => handleChange("phone", "phone", e.target.value)} 
          value={state.data.phone} type="text" name="phone" placeholder="Phone" 
        />
        <small>{state.errors.phone}</small>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PetAdoptionForm;