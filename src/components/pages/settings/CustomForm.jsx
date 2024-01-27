import React, { useEffect, useState } from 'react'

const CustomForm = () => {
    const [customForm, setCustomForm] = useState([
    ])
    const [newInputFeild, setNewInputFeild] = useState({
        label: "", type: ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewInputFeild((prev) => ({ ...prev, [name]: value }))
    }
    const addNewInput = (e) => {
        e.preventDefault()
        setCustomForm((prev) => [...prev, newInputFeild])
        setNewInputFeild({ label: "", type: "" })
    }
    useEffect(() => { console.log("customForm", customForm) })
    return (
        <div>CustomForm
            <form>
                <label>label</label>
                <input name="label" value={newInputFeild.label} type='text' onChange={handleInputChange} />
                <label>type</label>
                <select id="cars" name="type" value={newInputFeild.type} onChange={handleInputChange}>
                    <option value="">--select--</option>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="textarea">Text Area</option>
                    <option value="file">File</option>
                    {/* <option value="select">Select</option> */}
                </select>
                {/* <input name="type" value={newInputFeild.type} type='text' onChange={handleInputChange} /> */}
                <button onClick={addNewInput}>Add</button>
            </form>
            {customForm && customForm.length > 0 && customForm.map((input, index) => (
                <div>
                    <label>{input.label}</label>

                </div>
            ))}
        </div>
    )
}

export default CustomForm