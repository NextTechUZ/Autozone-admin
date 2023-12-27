import axios from "axios";

 const api=axios.create({baseURL:process.env.REACT_APP_BASE_API});

 const PRODUCT={

    product:"/product",
    post_product:"/product",
    delete_product:(id)=>`/product/${id}`,
    one_product:(id)=>`/product/${id}`,
    put_product:(id)=>`/product/${id}`,
    pagination_product: (page=1 , limit = 8) =>
    `/product?_page=${page}&_limit=${limit}`,

    country:"/country",
    post_country:"/country",
    delete_country:(id)=>`/country/${id}`,
    one_country:(id)=>`/country/${id}`,
    put_country:(id)=>`/country/${id}`,
    pagination_country: (page=1 , limit = 8) =>
    `/country?_page=${page}&_limit=${limit}`,

    car:"/car",
    post_car:"/car",
    delete_car:(id)=>`/car/${id}`,
    one_car:(id)=>`/car/${id}`,
    put_car:(id)=>`/car/${id}`,
    pagination_car: (page=1 , limit = 8) =>
    `/car?_page=${page}&_limit=${limit}`,

    category:"/category",
    post_category:"/category",
    delete_category:(id)=>`/category/${id}`,
    one_category:(id)=>`/category/${id}`,
    put_category:(id)=>`/category/${id}`,
    pagination_category: (page=1 , limit = 8) =>
    `/category?_page=${page}&_limit=${limit}`,
   
 }
 
 export {api,PRODUCT}