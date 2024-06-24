
import axios from 'axios';
import { LandMarkAPIURL } from '../LandMarksURLs';
import { toast } from "react-toastify";

// const token = localStorage.getItem("token");
const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTkwODk1MDYsImV4cCI6MTcxOTA5MzEwNiwibmJmIjoxNzE5MDg5NTA2LCJqdGkiOiJxU3NvcjdEWmtJeFJlT3IyIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.tzVyjGQnuMmpBv79KwdGoxd1IlE1-FQnBJqAUx719rw"


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
        console.log('data',data);
        const response = await axios.post(LandMarkAPIURL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            const landmarkData = response.data;
            console.log(data);
            toast.success('تمت الإضافة بنجاح');
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
        const response = await axios.post(LandMarkAPIURL + '/' + id, data, {
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
            toast.success('تم حذف المعلم بنجاح ');
            return response.data;
        } else {
            // toast.error('لم يتم حذف المعلم');
            throw new Error(`Failed to delete landmark with id=  ${id}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}