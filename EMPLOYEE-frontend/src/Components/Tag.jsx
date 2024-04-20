import React, { useState } from 'react';


function Tag() {
  // State to hold the input value and submitted values
  const [inputValue, setInputValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setSubmittedValues([...submittedValues, inputValue]);
      setInputValue('');
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter submitted values based on search term
  const filteredValues = submittedValues.filter(value =>
    value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <p style={{fontSize:'40px'}}>Tags</p>
      <div className='row main-box' style={{ display: 'block', marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="row " style={{ float: 'right' }}>
            <div className="col-auto">
              <label htmlFor="inputTag" className="visually-hidden">Tag</label>
              <input
                type="text"
                className="form-control mb-3"
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
      </div>
      <div className='Searchbar col-md-3' >
        <input type="text" className='form-control mb-3' placeholder="Search By Name" id='Search' value={searchTerm} onChange={handleSearchChange} />
      </div>
      <table className="table mt-3 table">
        <thead>
          <tr>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {filteredValues.map((value, index) => (
            <tr key={index}>
              <td>{value} <span className='edit' style={{ float: 'right' }}>
              <i class="bi bi-pencil-fill" style={{ marginRight: '15px' }}> </i> 
              <i class="bi bi-three-dots-vertical"></i>
              </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tag;
