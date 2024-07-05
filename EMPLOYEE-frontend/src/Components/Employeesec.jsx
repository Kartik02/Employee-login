import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { universalurl } from '../helper'

const Employeesec = () => {
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        axios.get(`${universalurl}/auth/category`)
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    const handleAddCategory = (e) => {
        e.preventDefault()
        axios.post(`${universalurl}/auth/category`, { name })
            .then(result => {
                if (result.data.Status) {
                    setCategory([...category, result.data.Result])
                    setName('') // clear the input field
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Category</h3>
            </div>
            <form onSubmit={handleAddCategory}>
                <div className="form-group">
                    <label htmlFor="name">Category Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success mt-3">Add Category</button>
            </form>
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

export default Employeesec
