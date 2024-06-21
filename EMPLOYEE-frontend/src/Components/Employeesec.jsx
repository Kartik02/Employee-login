import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

const Employeesec = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('https://ten-tuuo.onrender.com/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)

                } else {
                    alert(result.data.Error)
                }


            }).catch(err => console.log(err))

    }, [])
    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Category</h3>
            </div>
            <Link to='/admindashboard/add_category' className="btn btn-success">Add Category</Link>
            <div className="mt-3 tw-border tw-border-base-content">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="bg-transparent text-left px-4 py-2">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((c, index) => (
                                <tr key={index} className="bg-transparent">
                                    <td className="bg-transparent text-left px-4 py-2">{c.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Employeesec;
