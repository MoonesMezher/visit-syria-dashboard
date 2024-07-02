import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");


// Custom Hook for Fetching Cities
export const useFetchCities = () => {
    const [cities, setCities] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    useEffect(() => {
        setIsLoadingCities(true);
        axios.get('http://127.0.0.1:8000/api/cities')
            .then(res => {
                setCities(res.data.data);
                const names = res.data.data.map(city => city.name);
                setCityNames(names);
            })
            .finally(() => setIsLoadingCities(false));
    }, []);

    return { cities, cityNames, isLoadingCities };
};

// Custom Hook for Fetching Hotels
export const useFetchHotels = (currentPage,getItem, selectedCity, sortBy) => {
    const [hotels, setHotels] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoadingHotels, setIsLoadingHotels] = useState(false);

    useEffect(() => {
        setIsLoadingHotels(true);
        const cityQuery = selectedCity ? `&city=${selectedCity}` : '';
        const sortQuery = sortBy ? `&sort_by=${sortBy}` : '';
        axios.get(`http://127.0.0.1:8000/api/hotels?page=${currentPage}${cityQuery}${sortQuery}`)
            .then(res => {
                setHotels(res.data.data);
                setTotalPages(res.data.pagination.total_pages);
            })
            .finally(() => setIsLoadingHotels(false));
        }, [currentPage, getItem, selectedCity, sortBy]);
        return { hotels, totalPages, isLoadingHotels };
    };

    export const deleteItem = (itemId,setGetItem) => {
        axios.delete(`http://127.0.0.1:8000/api/hotels/${itemId}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => {
            console.log(res.data);
            setGetItem((prev) =>!prev);
            toast.success('تمت حذف العنصر بنجاح');
        }).catch(error => {
            toast.error(error.message)
            // console.error("Failed to delete hotel:", error);
        });
    }


export async function getHotelInfo(id) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/hotels' + '/' + id);

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


export async function editHotel(data, id) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/hotels' + '/' + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            toast.success('تم التعديل بنجاح');
            const hotelUpdatedData = response.data;
            return hotelUpdatedData;
        } else {
            throw new Error('Failed to update landmark');
        }
    } catch (error) {
        console.log(error.message)
        throw new Error(`Error: ${error.message}`);
    }
}