import React, { useState, useEffect } from "react"
import API from "../utils/API"

const Main = () => {
    // adding comment to commit
    const [employeeCopy, setEmployeeCopy] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState({})
    const [toggle, setToggle] = useState(false)


    useEffect(() => {

        if (employees.length === 0) {
            API.getDirectory(100).then((res) => {
                console.log(res)
                setEmployees(res.data.results)
                setEmployeeCopy(res.data.results)
            })
        }
        if (toggle) {
            console.log("toggle true")
            let tempEmployee = [...employeeCopy].filter(item => { return item.name.first.toLowerCase().indexOf(search.searchName) > -1 })
            setEmployees(tempEmployee)
            console.log(tempEmployee)
            setToggle(false);
        }



    }, [employees, toggle])
    //name - email - picture - phone


    function sortEmployees(field) {

        // sort array by name:

        console.log(field)

        switch (field) {
            case "name":
                let sortedName = [...employees]
                sortedName.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
                setEmployees(sortedName);
                break;
            case "lastN":
                let sortedLast = [...employees]
                sortedLast.sort((a, b) => a.name.last > b.name.last ? 1 : -1);
                setEmployees(sortedLast);
                break;
            case "email":
                let sortedEmail = [...employees]
                sortedEmail.sort((a, b) => a.name.email > b.name.email ? 1 : -1);
                setEmployees(sortedEmail);
                break;
            default:

        }
    }

    const searchByName = (event) => {
        // setSearch({ searchName: event.target.value })
        const { name, value } = event.target;
        console.log(toggle)
        setSearch({ [name]: value })
        setToggle(true)
        console.log(toggle)


    }

    return (

        <div>
            <div className="jumbotron jumbotron-fluid" style={{textAlign:"center", backgroundColor: "lightGray"}}>
                <h1>Employee Directory</h1>
            </div>

            <div className="container">
                {/* form */}
                <div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput">Search by first Name</label>
                            <input

                                type="text"
                                className="form-control"
                                placeholder="Example input placeholder"
                                onChange={searchByName}
                                name="searchName"

                            />
                        </div>
                    </form>
                    {/* <p>{search.searchName}</p> */}

                </div>


                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Photo</th>
                            <th scope="col">First Name <button type="button" className="btn btn-light" onClick={() => sortEmployees("name")}>↓</button></th>
                            <th scope="col">Last Name<button type="button" className="btn btn-light" onClick={() => sortEmployees("lastN")}>↓</button></th>
                            <th scope="col">e-mail <button type="button" className="btn btn-light" onClick={() => sortEmployees("email")}>↓</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length ? (
                            employees.map((employee,id) => (
                                <tr key={employee.id.value}>
                                    
                                    <th scope="row">{id}</th>
                                        <td ><img src={employee.picture.thumbnail} alt={employee.name} /></td>
                                        <td >{employee.name.first}</td>
                                        <td >{employee.name.last}</td>
                                        <td >{employee.email} </td>
                                 
                                </tr>
                            ))

                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                        
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Main;