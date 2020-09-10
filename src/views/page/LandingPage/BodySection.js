//DEPENDENCIES
import React from 'react';

//STYLES
import './style_module.css';


const BodySection = () => {
    return (
        <div className='bodySection' id='about'>
            <div className='leftBodySection'></div>
                <div className='rightBodySection'>
                    <h2>Kids will love to learn</h2>
                    <div className='pointWrapper'>
                        <div className='iconBullet' id='iconBullet_1'></div>
                        <div className='contentWrapper'>
                            <h3>Focused on the whole child</h3>
                            <p>Our program engages kids in core subjects like early literacy, reading, writing, language, and math, while encouraging creativity and building social-emotional skills.</p>
                        </div>
                    </div>
                    <div className='pointWrapper'>
                        <div className='iconBullet' id='iconBullet_2'></div>
                        <div className='contentWrapper'>
                            <h3>Joyful</h3>
                            <p>Five whimsical, charming characters—including narrator Kodi Bear—guide kids through activities and stories.</p>
                        </div>
                    </div>
                    <div className='pointWrapper'>
                        <div className='iconBullet' id='iconBullet_3'></div>
                        <div className='contentWrapper'>
                            <h3>Engaging</h3>
                            <p>Original interactive activities, books, animated videos, games, and creative lessons captivate children’s attention.</p>
                        </div>
                    </div>
                    <div className='pointWrapper'>
                        <div className='iconBullet' id='iconBullet_4'></div>
                        <div className='contentWrapper'>
                            <h3>Developed by experts</h3>
                            <p>Khan Academy Kids was developed in collaboration with learning experts at Stanford and aligned with the Head Start Early Learning Outcomes Framework and Common Core Standards.</p>
                        </div>
                    </div>
                    <div className='pointWrapper'>
                        <div className='iconBullet' id='iconBullet_5'></div>
                        <div className='contentWrapper'>
                            <h3>100% Free</h3>
                            <p>You’ll never see ads. You’ll never need a subscription.</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default BodySection;