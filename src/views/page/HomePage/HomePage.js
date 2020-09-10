//DEPENDENCIES
import React, { Component, Fragment } from 'react';

//COMMON COMPONENTS
import ChildCard from '../../common/components/Card/ChildCard';
import Error from './Error';

//INTERACTION LOGICS
import ChildProfileInteractions from '../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css';


export class HomePage extends Component {

    state = {
        kidlist: null
    }

    getAllChildByParentID = async (currentId) => {
        const result = await ChildProfileInteractions.getUser.getAllChildByParentID(currentId);
        this.setState({
            kidList: result.data.data.length ? result.data.data : null
        })
    }

    componentDidMount() {
        const currentId = ChildProfileInteractions.getUser.getCurrentLocalID();
        this.getAllChildByParentID(currentId)
    }

    render() {
        return (
            <Fragment>
                <div className='homepage'>
                    <div className='childList'>
                        {!this.state.kidList ?
                            <Error/>
                            :
                            this.state.kidList.map((kid) =>
                                <ChildCard childname={kid.name} icon={kid.icon} />
                            )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default HomePage
