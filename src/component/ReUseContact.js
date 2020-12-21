import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {addContact,editContact } from '../redux/contactAction';

const ReUseContact= (props)=>{
    let [ToDisplay,ToDoDisplay]= useState({})
    let [currentContact,TodoContact]= useState({
        id:"",
        name:"",
        email:"",
        phonenumber:"",
        errors:{
            name:"",
            email:"",
            phonenumber:""
        }
    })
    useEffect(()=>{
        if(props.pageAction.currentPage==="view"){
            console.log(props.pageAction)
           let display= props.responce.filter(el=>el.id===props.pageAction.selectedData)
           
           ToDoDisplay({DisplayData:display})
        }else if(props.pageAction.currentPage==="edit"){
            let display= props.responce.filter(el=>el.id===props.pageAction.selectedData)  
            TodoContact({...currentContact,
                name:display[0].name,
                email:display[0].email,
                phonenumber:display[0].phonenumber,
                id:display[0].id})
        }
    },[props.pageAction.currentPage,props.pageAction.selectedData,props.responce])

    const handleChange =(e)=>{
        TodoContact({
            ...currentContact,
            [e.target.name]:e.target.value.trim(),
            errors:{
                ...currentContact.errors,
                [e.target.name]:""
            }
        })
    }
    const validate= () =>{
        if(!currentContact.name){
            TodoContact({
                ...currentContact,
                errors:{
                    ...currentContact.errors,
                    name:"Enter the Name"
                }
            }) 
            return false
        }else if(!currentContact.email){
            TodoContact({
                ...currentContact,
                errors:{
                    ...currentContact.errors,
                    email:"Enter the Email Address"
                }
            }) 
            return false
        }
        else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(currentContact.email)){
            TodoContact({
                ...currentContact,
                errors:{
                    ...currentContact.errors,
                    email:"Enter the Valid Email Address"
                }
            }) 
            return false
        }
        else if(!currentContact.phonenumber){
            TodoContact({
                ...currentContact,
                errors:{
                    ...currentContact.errors,
                    phonenumber:"Enter the Phone Number"
                }
            }) 
            return false
        }
        return true

    }
    const AddContact=()=>{
        let isValid=validate();
        let {name,email,phonenumber}=currentContact
        if(isValid){
            props.addcontactstore({name,email,phonenumber},props.responce)
            props.forwardPage({currentPage:""})
        }
    }

    const editContact=()=>{
        let isValid=validate()
        let {id,name,email,phonenumber}=currentContact
        if(isValid){
            props.editcontactstore({id,name,email,phonenumber},props.responce)
            props.forwardPage({currentPage:""})
        }
        
    }
    return(
        <React.Fragment>
            {props.pageAction.currentPage === "add" || props.pageAction.currentPage === "edit" ?
                <div className="card p-4 detail-card" >
                    <div className="w-100" >
                        <div className="mr-auto  px-3">
                            <label className="mb-1 text-capitalize font-weight-bold">Name</label>
                            <input className="form-control mb-1"
                                type="text"
                                name="name"
                                onChange={(e) => handleChange(e)}
                                value={currentContact.name}
                            />
                            {currentContact.errors.name ? <p className="text-danger">{currentContact.errors.name}</p> : null}
                            <label className="mb-1 text-capitalize font-weight-bold">email</label>
                            <input className="form-control mb-1"
                                type="text"
                                name="email"
                                onChange={(e) => handleChange(e)}
                                value={currentContact.email}
                            />
                            {currentContact.errors.email ? <p className="text-danger">{currentContact.errors.email}</p> : null}
                            <label className="mb-1 text-capitalize font-weight-bold">Phone Number</label>
                            <input className="form-control mb-2"
                                type="number"
                                name="phonenumber"
                                onChange={(e) => handleChange(e)}
                                value={currentContact.phonenumber}
                            />
                            {currentContact.errors.phonenumber ? <p className="text-danger">{currentContact.errors.phonenumber}</p> : null}
                        </div>
                    </div>
                    {props.pageAction.currentPage === "edit" ?
                        <button className="btn btn-primary ml-3 align-self-center" onClick={editContact} > Edit Contact </button>
                        :
                        <button className="btn btn-primary ml-3 align-self-center" onClick={AddContact} > Add Contact </button>}
                </div>
                : props.pageAction.currentPage === "view" && ToDisplay.DisplayData ?
                    <div className="card p-4 detail-card" >
                        {/* <img src={Selecteditems.thumbnailUrl} alt="thumbnail" className="card-image" /> */}
                        <div className="profile-dp"> {(ToDisplay.DisplayData[0].name.match(/[a-zA-Z]/)||['NA']).pop()}</div>
                        <div className="contents">
                            <label className="mb-0 font-weight-bold">Name</label>
                            <div className="mb-4">{ToDisplay.DisplayData[0].name}</div>
                            <label className="mb-0 font-weight-bold">email</label>
                            <div className="mb-4">{ToDisplay.DisplayData[0].email}</div>
                            <label className="mb-0 font-weight-bold">Phone Number</label>
                            <div>{ToDisplay.DisplayData[0].phonenumber}</div>
                        </div>
                    </div>
                    : null
            }
        </React.Fragment>
    )
}

const mapStateToProps =state=>{
    return {
        responce:state.contact.contacts
    }
}
const mapDispatchToProps =dispatch=>{
    return {
         addcontactstore: (data,dbData) =>{dispatch(addContact(data,dbData))},
         editcontactstore: (data,dbData) =>{dispatch(editContact(data,dbData))}
    }
}

//export default ReUseContact
 export default connect(mapStateToProps,mapDispatchToProps)(ReUseContact);