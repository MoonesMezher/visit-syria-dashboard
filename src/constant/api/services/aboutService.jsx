import axios from "axios";
import { toast } from 'react-toastify';


const token = localStorage.getItem("token");
export async function getItemInfo(id) {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/about/" + id);

        if (response.status === 200) {
            const itemInfo = response.data;
            return itemInfo;
        } else {
            throw new Error(`Failed to get landmark with id=  ${id}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}




export async function editItem(data, id) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/about/" + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        console.log(response)
        if (response.status === 200) {
            toast.success('تم التعديل بنجاح');
            const ItemUpdatedData = response.data;
            return ItemUpdatedData;
        } else {
            throw new Error('Failed to update landmark');
        }
    } catch (error) {
        console.log(error.message)
        throw new Error(`Error: ${error.message}`);
    }
}