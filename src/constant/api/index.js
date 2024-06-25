const apiUrl = 'http://127.0.0.1:8000/api';

const APIS = {
    GET: {
        hotels: apiUrl + '',
        ALLRESTURANT: apiUrl+'/restaurants',
        RESTURANT: apiUrl+'/restaurants/'
    },
    POST: {
        RESTURANT: apiUrl+'/restaurants/create'
    },
    PUT: {
        RESTURANT: apiUrl+'/restaurants/update/'
    },
    DELETE: {

    }
}



export default APIS

