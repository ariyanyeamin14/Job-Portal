import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyApplications = () => {
    const { user } = useContext(AuthContext)
    const [jobs, setJobs] = useState()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        // fetch(`http://localhost:5000/job-application?email=${user.email}`)
        // .then(res => res.json())
        // .then(data => setJobs(data))

        // axios.get(`http://localhost:5000/job-application?email=${user.email}`, { withCredentials: true})
        // .then(res => setJobs(res.data))

        // this is a custom hook 
        axiosSecure.get(`/job-application?email=${user.email}`)
        .then( res => setJobs(res.data))

    }, [user.email])
    
    console.log(jobs)
    return (
        <div>
            <h2>Totall Jobs : {jobs?.length} </h2>
        </div>
    );
};

export default MyApplications;