//DEPENDENCIES
import React, { Fragment, useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

//INTERACTION LOGICS
import ChildProfileInteraction from '../../../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css';


export default function ParentProfileModal (props) {

    const [ParentData, setParentData] = useState({})
    const [KidsList, setKidsList] = useState([])

    useEffect(() => {
        getParentData()
    }, [props.update])

    const getParentData = async()=> {
        try {
        const currentID = await ChildProfileInteraction.getUser.getCurrentLocalID()
        const result = await ChildProfileInteraction.getUser.getParentDataByParentID(currentID)
        const authUser = await ChildProfileInteraction.getUser.getAuthUser()
        console.log(authUser.data)
        setParentData(result.data.data)
        setKidsList(result.data.data.kidsList)
        return result
        } catch(e) {
            console.log(e.message)
        }
    }

    let param = useParams()

    const toggleEditParentModal = () => {
        console.log('editparentprofile')
    }

    return (
        <Fragment>
            <div className='parentProfileContainer'>
                <h3>Hi {param.username},</h3>
                <h5> You have {KidsList.length || 0} kids</h5>
                <div className='actionList'>
                    <div className='edit'>
                        <div onClick={toggleEditParentModal}>Edit Personal Profile</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}