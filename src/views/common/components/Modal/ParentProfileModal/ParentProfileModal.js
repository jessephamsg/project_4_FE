//DEPENDENCIES
import React, { Fragment, useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

//COMMON COMPONENTS
// import Button from '../../../elements/Buttons';

//INTERACTION LOGICS
import ChildProfileInteraction from '../../../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css';
// import img from '../../../assets/game_container_wrapper_bg.png'


export default function ParentProfileModal (props) {

    const [ParentData, setParentData] = useState({})
    const [KidsList, setKidsList] = useState([])

    useEffect(() => {
        getParentData()
    }, [props.update])

    const getParentData = async()=> {
        try {
        const result = await ChildProfileInteraction.getUser.getAuthUser();
        console.log(result)
        setParentData(result)
        setKidsList(result.kidsList)
        return result
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
                <h3>Hi {param.username},</h3>
                <h5> You have {KidsList.length || 0} kids</h5>
                <div className='actionList'>
                    {/* <div className='add'>
                        <Button id='addChildBtn' text='Add' onClick={props.onClick} />
                    </div> */}
                    <div className='edit'>
                        <div onClick={toggleEditParentModal}>Edit Personal Profile</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}