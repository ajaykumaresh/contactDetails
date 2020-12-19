import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {getContacts } from '../redux/contactAction';


const Allcontact= (props)=>{
    const [DisplayData,ActionToDispalay]=useState({
        SelectedArray:[]
    })
    const [ProcessedData,ActionToProsses]=useState()
    const [PageState,ActionToPageState]=useState({
        inputValue:"",
        errordisplay:'Loading on your request...'
    })
   
   
    useEffect(()=>{
        props.getContact()
        if(props.responce){
        let processArray={...ProcessedData,DisplayArray:props.responce,SelectedArray:props.responce}
        ActionToProsses(processArray) 
        console.log(ProcessedData)  
        }    
    },[props.responce.length,DisplayData])


    
     const handleChange=(event)=>{
        let modifiedObject={...PageState,[event.target.name]:event.target.value};
        let value=modifiedObject.inputValue
        ActionToPageState(modifiedObject)
        let filteredArray=ProcessedData.DisplayArray.filter(dataToBe=>dataToBe.name.toLowerCase().startsWith(value.toLowerCase()));
        ActionToProsses({...ProcessedData,SelectedArray:filteredArray}) 
        if(!filteredArray.length) ActionToPageState({...PageState,errordisplay:"No Contact Found",[event.target.name]:event.target.value})
     }

    const addTo =() =>{
        props.forwardPage({currentPage:"add"})
    }
    const EditTo =(e) =>{
        props.forwardPage({currentPage:"edit", selectedData:e})
    }
    const viewTo =(e) =>{
        props.forwardPage({...props.pageAction,currentPage:"view", selectedData:e})
    }

    return(
        <div>
        <input
            className="form-control form-control-lg"
            type="text" 
            name="inputValue"
            placeholder="Enter song name to Search.."
            onChange={(e) => handleChange(e)}
            value={PageState.inputValue}
        ></input>
        <button className="btn btn-primary" onClick={addTo}>ADD</button>
        {ProcessedData && ProcessedData.SelectedArray && ProcessedData.SelectedArray.length? ProcessedData.SelectedArray.map((Selecteditems,index) => {
            return <div className="card p-3 my-3" key={Selecteditems.id}  >
                <div className="d-flex" >
                    {/* <img src={Selecteditems.thumbnailUrl} alt="thumbnail" className="card-image" /> */}
                    <div className="mr-auto  px-3" onClick={()=>viewTo(Selecteditems.id)}>
                        <label className="mb-0 font-weight-bold">Name :</label>
                        <div className="mb-2">{Selecteditems.name}</div>
                        <label className="mb-0 font-weight-bold">email :</label>
                        <div>{Selecteditems.email}</div>
                        <label className="mb-0 font-weight-bold">Phone Number :</label>
                        <div>{Selecteditems.phonenumber}</div>
                    </div>
                     <button className="btn btn-primary ml-3 align-self-center" onClick={(e)=>EditTo(Selecteditems.id)} > Edit Contact </button>
                </div>
            </div>
        }) : <div className="card my-3 p-3 text-center font-weight-bold">{PageState.errordisplay} </div>}
    </div>
    )
}



const mapStateToProps =state=>{
    return {
        responce:state.contact.contacts
    }
}
const mapDispatchToProps =dispatch=>{
    return {
        
        getContact: () =>{dispatch(getContacts())},
        
    }
}

//export default Allcontact;
 export default connect(mapStateToProps,mapDispatchToProps)(Allcontact);