//DEPENDENCIES
import React from 'react';

//COMPONENT
import AllGames from '../../common/components/AllGamesSection';

//STYLES
import './style_module.css';


const Error = () => {

    return (
        <div className='error_page_container'>
            <div className='error_message'>
                Your child hasn't had any records with us yet
            </div>
            <div className='error_body_container'>
                <h3>Try our games</h3>
                <div className='gameList_parent_landing'>
                    <AllGames/>
                </div>
            </div>
        </div>
    )

}

export default Error