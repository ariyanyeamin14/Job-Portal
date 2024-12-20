import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
    const applications = useLoaderData()

    const handleStatusUpdate = (e, id) => {
        console.log(e.target.value, id)
        const data = {
            status: e.target.value
        }
        fetch(`http://localhost:5000/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Status has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    console.log(applications)
    return (
        <div className='w-[90%] lg:w-[80%] mx-auto my-20'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Applicant email</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    {
                        applications.map((app, index) => <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{app.applicant_email}</td>
                                <td>
                                    <select
                                        onChange={(e) => handleStatusUpdate(e, app._id)}
                                        defaultValue={app.status || 'Change Status'}
                                        className="select select-bordered select-xs w-full max-w-xs">
                                        <option disabled selected>Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;