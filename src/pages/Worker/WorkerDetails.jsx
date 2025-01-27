import React from 'react';
import { useLoaderData } from 'react-router-dom';

const WorkerDetails = () => {
    const data=useLoaderData()
    console.log(data)
    return (
        <div>
            <h2>This is details</h2>
        </div>
    );
};

export default WorkerDetails;