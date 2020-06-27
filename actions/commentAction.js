import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createComment = (comment) => {
  return fetch(`${API}/comment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: comment,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


  
export const getCommentsByBlogID = (blogId) => {
  
    return fetch(`${API}/comment/${blogId}`, {
      method: 'GET',
      
     
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  
export const createCommentReply = (replyComment) => {
    //console.log(replyComment)
  return fetch(`${API}/comment/reply`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: replyComment,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log('err: ',err));
};