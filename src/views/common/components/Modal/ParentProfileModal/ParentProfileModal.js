//DEPENDENCIES
import React, { Fragment, useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

//COMMON COMPONENTS
import Button from '../../../elements/Buttons';

//INTERACTION LOGICS
import ChildProfileInteraction from '../../../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css';


export default function ParentProfileModal (props) {

    const [ParentData, setParentData] = useState({})
    const [KidsList, setKidsList] = useState([])

    useEffect(() => {
        getParentData()
    }, [])

    const getParentData = async()=> {
        try {
        const result = await ChildProfileInteraction.getUser.getAuthUser();
        const data = result.data.data
        setParentData(data)
        setKidsList(data.kidsList)
        return data
        } catch(e) {
            console.log(e.message)
        }
    }

    let param = useParams()

    function toggleEditParentModal () {
        console.log('editparentprofile')
    }

    return (
        <Fragment>
            <div className='parentProfileContainer'>
                <h1>Hi {param.username},</h1>
                <h1> You have {KidsList.length || 0} kids</h1>
                <div className='actionList'>
                    <div className='add'>
                        <Button id='addChildBtn' text='Add' onClick={props.onClick} />
                    </div>
                    <div className='edit'>
                        <Button id='editProfileBtn' text='Edit' onClick={toggleEditParentModal}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}