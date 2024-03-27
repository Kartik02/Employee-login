import React, {useState} from 'react'

const Leave = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    reason: '',
    numberOfDays: '',
    fromDate: '', 
    toDate: '', 
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for fromDate and toDate to ensure they are different
    if (name === 'fromDate') {
      setFormData(prevData => ({ ...prevData, [name]: value, toDate: value }));
    } else if (name === 'toDate') {
      if (value < formData.fromDate) {
        alert("To date must be after from date");
      } else {
        setFormData(prevData => ({ ...prevData, [name]: value }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the form data to the server or process it as needed
    setSubmittedData(formData);
  };


  return (
    <div className='flex '>
   <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="employeeId" className="block mb-1">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block mb-1">Reason for Leave:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="numberOfDays" className="block mb-1">Number of Days:</label>
          <input
            type="number"
            id="numberOfDays"
            name="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
            <label htmlFor="fromDate" className="block mb-1">From Date:</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block mb-1">To Date:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
      {submittedData && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Submitted Details:</h2>
          <ul>
            {Object.entries(submittedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}

export default Leave;
