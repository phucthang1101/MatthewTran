import fetch from 'isomorphic-fetch';
import { API } from '../config';


export const createCategory = (category,token) => {
 
    return fetch(`${API}/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
       
        Authorization: `Bearer ${token}`
      },
      body: category,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  
export const getCategories = () => {

  return fetch(`${API}/categories`, {
    method: 'GET',
   
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const singleCategory = (slug,skip,limit) => {
  const data = { skip,limit };
  //console.log('data: ',data)
  return fetch(`${API}/category/${slug}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const removeCategory = (slug,token) => {
  
  return fetch(`${API}/category/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
   
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const updateCategory = (category, token, slug) => {
//   for (var value of category.values()) {
//     console.log('value: ',value); 
//  }
  return fetch(`${API}/category/${slug}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',

      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};