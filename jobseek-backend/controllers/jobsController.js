import fs from 'fs';
import path from 'path';

export const getJobs = (req, res) => {
    const filePath = path.resolve('data', 'jobs.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err){
            return res.status(500).json({message: "Error reading job data"});
        }
        const jobs = JSON.parse(data);
        res.json(jobs);
    });
};