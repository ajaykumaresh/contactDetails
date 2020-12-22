import {GET_CONTACT,ADD_CONTACT,EDIT_CONTACT,DELETE_CONTACT} from './contactType';
import {DbDetails} from './localDB';

export const getContacts = () =>{
    return (dispatch)=>{
       dispatch(ContactsResponse(DbDetails))
    }
  }
  
  export const editContact= (data,dbData) =>{
    return (dispatch)=>{
      let copyObject=dbData
      let index=copyObject.findIndex(i=> i.id === data.id)
      copyObject[index].name=data.name;
      copyObject[index].email=data.email;
      copyObject[index].phonenumber=data.phonenumber;
      dispatch(editContactResponse(copyObject))
   }
  }

  export const addContact = (data,dbData) =>{
    return (dispatch)=>{
      let buf = new Uint8Array(3);
      window.crypto.getRandomValues(buf);
      data.id= buf[0]+buf[1]+buf[2];
      let copyObject=dbData
      copyObject.push(data)
       dispatch(addContactResponse(copyObject))
    }
  }

  export const deleteContact = (data) =>{
    return (dispatch)=>{
      dispatch(deleteContactResponse(data))
    }
  }

 export const ContactsResponse = (responce) =>{
    return {
        type:GET_CONTACT,
        payload:responce 
    }
}

export const addContactResponse = (responce) =>{
  return {
      type:ADD_CONTACT,
      payload:responce 
  }
}

export const editContactResponse = (responce) =>{
   return {
       type:EDIT_CONTACT,
       payload:responce 
   }
 }

 export const deleteContactResponse= (responce) =>{
  // console.log(responce)
  return {
      type:DELETE_CONTACT,
      payload:responce 
  }
}
 


