//DEPENDENCIES
import React, { Component } from 'react';

//INTERACTION LOGIC
import gameInteractions from '../../../interactions/ManageGames'

//STYLES
import './style_module.css';


class GameInfo extends Component {

    constructor (props) {
        super(props)
        this.state = {
            reviewers: null,
            displayName: null,
            icon: null,
            category: null,
            desc: null,
            developer: null,
            avgRating: null,
            reviews: []
        }
    }

    async getGameObject () {
        const gameName = this.props.match.params.gameName;
        const gameObject = await gameInteractions.getGames.getGameObject(gameName);
        return gameObject
    }

    async getReviewerName () {
        const gameName = this.props.match.params.gameName;
        const parentName = await gameInteractions.getGames.getGameReviewer(gameName);
        return parentName
    }

    async componentDidMount () {
        const {displayName, icon, category, desc, developer, avgRating, reviews} = await this.getGameObject();
        const reviewers = await this.getReviewerName()
        this.setState({reviewers, displayName, icon, category, desc, developer, avgRating, reviews})
    }

    render () {
        return (
            <div className='gameInfo_wrapper'>

                <div className= 'gameInfo_Info_wrapper'>
                    <div className= 'gameInfo_Info_icon'
                    style = {{
                        backgroundImage: `url(${this.state.icon})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}></div>
                    <div className ='gameInfo_content_wrapper'>
                        <h1>{this.state.displayName}</h1>
                        <div className='gameInfo_brief'>
                            <p>Average Rating: {this.state.avgRating}</p>
                            <p>Category: {this.state.category}</p>
                            <p>Developer: {this.state.developer}</p>
                        </div>
                        <div className='gameInfo_desc'>
                            <p>{this.state.desc}</p>
                        </div>
                    </div>
                </div>

                <div className= 'gameInfo_Review_wrapper'>
                    <h2>Game Reviews</h2>
                    {this.state.reviews.map((review, index) => {
                        return (
                            <div className='review_content_wrapper'>
                                <div className='reviewer_profile'>
                                    <h4>{this.state.reviewers[index]}</h4>
                                    <p>Rating: {review.reviewRating}</p>
                                </div>
                                <div className='review_content'>
                                    <p>{review.reviewDesc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default GameInfo
