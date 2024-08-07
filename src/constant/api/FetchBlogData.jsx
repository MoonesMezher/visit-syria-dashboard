// import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");


export async function getBlogInfo(id) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog' + '/' + id);

        if (response.status === 200) {
            const hotelInfo = response.data;
            return hotelInfo;
        } else {
            throw new Error(`Failed to get landmark with id=  ${id}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}


export async function editBlog(data, id) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/update/" + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            toast.success('تم التعديل بنجاح');
            const blogUpdatedData = response.data;
            return blogUpdatedData;
        } else {
            throw new Error('Failed to update blog');
        }
    } catch (error) {
        console.log(error.message)
        throw new Error(`Error: ${error.message}`);
    }
}