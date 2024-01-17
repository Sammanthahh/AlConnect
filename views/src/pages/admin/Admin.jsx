import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import AlumniRecord from '../../components/cards/AlumniRecord';
import './admin.css';
import Footer from '../../components/footer/Footer';

export default function Admin() {
  const [searchUsername, setSearchUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [names, setNames] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (names) {
      // Trigger any logic or API calls when the names state changes
      console.log('Fetching data for:', names);
    }
  }, [names]);

  const submitName = () => {
    if (!searchUsername.trim()) {
      setErrorMessage('Enter alumni username');
    } else {
      setErrorMessage('');
      setNames(searchUsername);
    }
  };

  const handleAddAlumni = async (formData) => {
    try {
      const response = await fetch('https://ab-6ybe.onrender.com/api/alumni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Alumni added successfully');
      } else {
        setErrorMessage('Error adding alumni');
      }
    } catch (error) {
      console.error('Error adding alumni:', error);
      setErrorMessage('Error adding alumni');
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Collect form data and call handleAddAlumni
    const formData = {
      username: event.target.username.value,
      email: event.target.email.value,
      graduationYear: event.target.graduationYear.value,
      contactInformation: event.target.contactInformation.value,
      professionalInformation: event.target.professionalInformation.value,
      // Include other fields as needed
    };
    handleAddAlumni(formData);
  };

  return (
    <div className="admin">

      <h2 style={{ textAlign: 'center' }}>Alumni Records</h2>

      <div className="search">
        <input
          placeholder="Search Alumni Records"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <Button
          text="Search"
          classs="btn-action"
          style={{ padding: '10px', marginLeft: '-34%' }}
          onClick={submitName}
        />
      </div>

      <AlumniRecord name ={names}/>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      

      <div className="add-btn">
        <Button
          text={showAddForm ? 'Cancel Adding' : 'Add Alumni Record'}
          classs="btn-action"
          onClick={() => {
            setShowAddForm(!showAddForm);
            setSuccessMessage('');
          }}
        />
      </div>

      {showAddForm && (
        <form onSubmit={handleFormSubmit} style={{display:'flex',flexDirection:'column',justifyContent:'center',background:"lightgray",alignItems:'center',marginLeft:"35%"}} className=' admin-c'>
          <h2>Add Alumni</h2>
          <label>
            Username:
            <input type="text" name="username" required />
          </label>

          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Graduation Year:
            <input type="number" name="graduationYear" />
          </label>
          <label>
            Contact Information:
            <input type="text" name="contactInformation" />
          </label>
          <label>
            Professional Information:
            <input type="text" name="professionalInformation" />
          </label>
          <button type ='submit' className='button btn-action'>Submit</button>
          {/* Include other form fields as needed */}
          <Button type="submit" classs="btn-action" text="Add Alumni" onClick={handleFormSubmit}/>
        </form>
      )}

      <Footer/>
    </div>
  );
}
