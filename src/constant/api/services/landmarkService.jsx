
import axios from 'axios';
import { LandMarkAPIURL } from '../LandMarksURLs';

// const token = localStorage.getItem("token");
const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTkwMDUwNTksImV4cCI6MTcxOTAwODY1OSwibmJmIjoxNzE5MDA1MDU5LCJqdGkiOiJzMExScTljNHRJZnRIWDhJIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.6r15cXWJzg75sof1vEtDW6lPtpRMxgsOuKsiG5YC0kw"


export async function getAllLandmarks(currentPage) {
    try {
        const response = await axios.get(LandMarkAPIURL+`?page=${currentPage}`);
        if (response.status === 200) {
            const landmarksData = response.data;
            return landmarksData;
        } else {
            throw new Error('Failed to get landmarks');
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}


export async function addNewLandmark(data) {
    try {
        const response = await axios.post(LandMarkAPIURL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            const landmarkData = response.data;
            return landmarkData.data;
        } else {
            throw new Error('Failed to create new landmark');
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}



export async function editLandmark(data, id) {
    try {
        const response = await axios.put(LandMarkAPIURL + '/' + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            const landmarkUpdatedData = response.data;
            return landmarkUpdatedData;
        } else {
            throw new Error('Failed to update landmark');
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}


export async function getLandmarkById(id) {
    try {
        const response = await axios.get(LandMarkAPIURL + '/' + id);

        if (response.status === 200) {
            const landmarkData = response.data;
            return landmarkData;
        } else {
            throw new Error(`Failed to get landmark with id=  ${id}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}


export async function deleteLandmarkById(id) {
    try {
        const response = await axios.delete(LandMarkAPIURL + '/' + id,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to delete landmark with id=  ${id}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}