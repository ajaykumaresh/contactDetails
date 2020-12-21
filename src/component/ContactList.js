import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {getContacts,deleteContact } from '../redux/contactAction';


const Allcontact= (props)=>{
    const [DisplayData,ActionToDispalay]=useState({
        SelectedArray:[]
    })
    const [ProcessedData,ActionToProsses]=useState()
    const [PageState,ActionToPageState]=useState({
        inputValue:"",
        errordisplay:'No Contact Found'
    })
   
    useEffect(()=>props.getContact(),[])
    useEffect(()=>{
        
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
        let filteredArray=ProcessedData.DisplayArray.filter(dataToBe=>dataToBe.name.toLowerCase().includes(value.toLowerCase()));
        ActionToProsses({...ProcessedData,SelectedArray:filteredArray}) 
        if(filteredArray.length===0) ActionToPageState({...PageState,errordisplay:"No Contact Found",[event.target.name]:event.target.value})
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

    const DeleteTo =(e) =>{
        let resultDB=ProcessedData.DisplayArray.filter(i=> i.id !== e);
        props.isDeleteContact(resultDB)
    }

    return(
        <div>
        <div className="searchbar mb-4">
            <input
                className="form-control"
                type="text"
                name="inputValue"
                placeholder="Search Contacts"
                onChange={(e) => handleChange(e)}
                value={PageState.inputValue}
            ></input>
            <button className="btn btn-primary" onClick={addTo}><i className="fas fa-user-plus"/> Add</button>
        </div>
        {ProcessedData && ProcessedData.SelectedArray && ProcessedData.SelectedArray.length ? ProcessedData.SelectedArray.map((Selecteditems, index) => {
            return <div className="list-card card py-3 px-4" key={Selecteditems.id}  >
                {/* <img src={Selecteditems.thumbnailUrl} alt="thumbnail" className="card-image" /> */}
                <div className="profile-dp px-4 ">
                 {(Selecteditems.name.match(/[a-zA-Z]/)||['NA']).pop()}
                </div>
                <div className="mr-auto w-75  px-3" onClick={() => viewTo(Selecteditems.id)}>
                    <div className="font-weight-bolder text-capitalize">{Selecteditems.name}</div>
                    <div className="text-xs">{Selecteditems.email}</div>
                    <div className="text-xs">{Selecteditems.phonenumber}</div>
                </div>
                <button className="btn btn-primary m-1 align-self-center edit-btn" onClick={(e) => EditTo(Selecteditems.id)} > <i className="fas fa-edit"/> </button>
                <button className="btn btn-primary align-self-center edit-btn" onClick={(e) => DeleteTo(Selecteditems.id)} > <i className="fas fa-trash"/> </button>
            </div>
        }) : <div className="my-3 p-3 text-center font-weight-bold no-msg"><i className="fas fa-exclamation"></i> {PageState.errordisplay} </div>}
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
        isDeleteContact: (id) => {dispatch(deleteContact(id))}
    }
}

//export default Allcontact;
 export default connect(mapStateToProps,mapDispatchToProps)(Allcontact);