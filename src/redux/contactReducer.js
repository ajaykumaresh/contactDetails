import {GET_CONTACT,ADD_CONTACT,EDIT_CONTACT,DELETE_CONTACT} from './contactType'
const InitialValue={
    loader:false,
    contacts:[]
}

const contactReducer= (state=InitialValue,action)=>{
      switch(action.type){
          case 'LOADING':
            return{
                ...state,
                loader:true,
            }  
          case GET_CONTACT:
            return{
                ...state,
                contacts:action.payload,
                loader:false, 
            }
            case ADD_CONTACT:
              return{
                ...state,
                contacts:action.payload,
                loader:false, 
            }
            
            case EDIT_CONTACT:
              return{
                ...state,
                contacts:action.payload,
                loader:false, 
            }

            case DELETE_CONTACT:
              return{
                ...state,
                contacts:action.payload,
                loader:false, 
              }
          default :
          return state
      }  
  }
  
export default contactReducer;