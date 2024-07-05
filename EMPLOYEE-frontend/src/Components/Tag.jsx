import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { universalurl } from '../helper';

function Tag() {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    // Fetch tags from Flask backend when component mounts
    axios.get(`${universalurl}/auth/tag_list`)
      .then(response => {
        setTags(response.data.tags);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      // Send the new tag to Flask backend
      axios.post(`${universalurl}/auth/add_tag`, { tag: inputValue })
        .then(response => {
          if (response.data.message) {
            // Add the new tag to the local state
            setTags([...tags, { id: tags.length + 1, tag: inputValue }]);
            setInputValue('');
            // Display success message using SweetAlert2
            Swal.fire({
              title: 'Success!',
              text: 'Tag added successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          } else {
            // Display error message using SweetAlert2
            Swal.fire({
              title: 'Error!',
              text: response.data.error || 'Something went wrong!',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch(error => {
          console.error('Error adding tag:', error);
          // Display error message using SweetAlert2
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  };

  return (
    <div className="container">
      <p style={{ fontSize: '40px' }}>Tags</p>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-auto">
            <label htmlFor="inputTag" className="visually-hidden">Tag</label>
            <input
              type="text"
               className="form-control mb-3 tw-bg-base-300 tw-text-base-content tw-border tw-border-base-content tw-placeholder-base-content"
              id="inputTag"
              placeholder="Add new tag"
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Add Tag</button>
          </div>
        </div>
      </form>
      <table className="tw-table tw-table-bordered tw-mt-8  tw-bg-transparent">
        <thead>
          <tr>
            <th>#</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{tag.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tag;
