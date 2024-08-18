import React, { useState } from 'react';

function UploadDish() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // FormData to handle file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8000/api/dishes/create', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      if (response.ok) {
        alert('Dish added successfully!');
        // Clear form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage(null);
      } else {
        setErrors(result.errors || [result.message]);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <form className='w-75 mt-5 mx-auto p-4 border rounded shadow' onSubmit={handleSubmit}>
      <h2 className='mb-4'>Upload Dish</h2>
      
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="dishName" className="form-label">Dish Name</label>
        <input
          type="text"
          className="form-control"
          id="dishName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter dish name"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="dishDescription" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="dishDescription"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter dish description"
        ></textarea>
      </div>
      
      <div className="mb-3">
        <label htmlFor="dishPrice" className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          id="dishPrice"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter dish price"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="dishCategory" className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          id="dishCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter dish category"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="dishImage" className="form-label">Upload Image</label>
        <input
          type="file"
          className="form-control"
          id="dishImage"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default UploadDish;
