import axios from 'axios';
import { toast } from 'react-toastify';
import APIS from "./../index";
const token = localStorage.getItem("token");
export async function getRestaurantInfo(id) {
    try {
        const response = await axios.get(APIS.GET.RESTURANT+id);

        if (response.status === 200) {
            const restaurantInfo = response.data;
            return restaurantInfo;
        } else {
            throw new Error(`Failed to get landmark with id=  ${id}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}


export async function editRestaurant(data, id) {
    try {
        const response = await axios.post(APIS.PUT.RESTURANT+id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            toast.success('تم التعديل بنجاح');
            const restaurantUpdatedData = response.data;
            return restaurantUpdatedData;
        } else {
            throw new Error('Failed to update landmark');
        }
    } catch (error) {
        console.log(error.message)
        throw new Error(`Error: ${error.message}`);
    }
}