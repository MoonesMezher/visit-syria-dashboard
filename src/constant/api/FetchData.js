import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
export const useFetchHotels = (currentPage,getItem) => {
    const [hotels, setHotels] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoadingHotels, setIsLoadingHotels] = useState(false);

    useEffect(() => {
        setIsLoadingHotels(true);
        axios.get(`http://127.0.0.1:8000/api/hotels?page=${currentPage}`)
            .then(res => {
                setHotels(res.data.data);
                setTotalPages(res.data.pagination.total_pages);
            })
            .finally(() => setIsLoadingHotels(false));
    }, [currentPage,getItem]);

    return { hotels, totalPages, isLoadingHotels };
};

export const deleteItem = (itemId,setGetItem) => {
    axios.delete(`http://127.0.0.1:8000/api/hotels/${itemId}`, null)
    .then(res => {
        console.log(res.data);
        setGetItem((prev) =>!prev);
        toast.success('تمت حذف العنصر بنجاح');
    }).catch(error => {
        console.error("Failed to delete hotel:", error);
    });
}