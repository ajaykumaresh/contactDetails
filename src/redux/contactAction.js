import {GET_CONTACT,ADD_CONTACT,EDIT_CONTACT} from './contactType';
import {DbDetails} from './localDB';

export const getContacts = () =>{
    return (dispatch)=>{
       dispatch(ContactsResponse(DbDetails))
    }
  }
  
  export const editContact= (data) =>{
    return (dispatch)=>{
      let copyObject=DbDetails
      let index=copyObject.findIndex(i=> i.id === data.id)
      copyObject[index].name=data.name;
      copyObject[index].email=data.email;
      copyObject[index].phonenumber=data.phonenumber;
      dispatch(editContactResponse(copyObject))
   }
  }

  export const addContact = (data) =>{
    return (dispatch)=>{
      let buf = new Uint8Array(3);
      window.crypto.getRandomValues(buf);
      data.id= buf[0]+buf[1]+buf[2];
      let copyObject=DbDetails
      copyObject.push(data)
       dispatch(addContactResponse(copyObject))
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
 


