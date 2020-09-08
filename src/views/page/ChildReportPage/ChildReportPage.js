//DEPENDENCIES
import React, { Component } from 'react'
import {AuthService} from '../../../interactions/AuthService';

//COMPONENTS
import CompletionRate from './CompletionRate';
import TrialAndErrorStats from './TrialAndErrorStats';
import RecentGames from './RecentGames';

//INTERACTION LOGIC
import ChildProfileInteractions from '../../../interactions/ManageChildrenProfile';

//STYLES
import './style_module.css'


export class ChildReportPage extends Component {
    
    static contextType = AuthService

    constructor(props) {
        super (props) 
        this.state = {
            numberOfGamesPlayed: null, 
            totalScore: null, 
            avgAttemptsBeforeSuccess: null, 
            completionRate: null, 
            trialAndErrFreq: null, 
            recentGameObjects: null,
            gamesMostPlayed: null,
            allGamesAttempted: null,
        }
    }

    async getStats () {
        const kidName = this.props.match.params.childname;
        const parentID = this.context.userId;
        const {
            numberOfGamesPlayed, 
            totalScore, 
            avgAttemptsBeforeSuccess, 
            completionRate, 
            trialAndErrFreq, 
            recentGameObjects,
            gamesMostPlayed,
            allGamesAttempted
        } = await ChildProfileInteractions.getUser.getAnalysedChildStats(parentID, kidName);
        this.setState({numberOfGamesPlayed, totalScore, avgAttemptsBeforeSuccess, completionRate, trialAndErrFreq, recentGameObjects, gamesMostPlayed, allGamesAttempted});
    }

    async componentDidMount() {
        await this.getStats();
    }

    render() {
        if (this.state.avgAttemptsBeforeSuccess === null) {
            return (
                <div>Loading</div>
            )
        } else if (this.state.numberOfGamesPlayed == 0) {
            return (
                <div>No Records</div>
            )
        }
        return (
            <div className='stats_page_container'>
                <h1>Statistics for {this.props.match.params.childname}</h1>
                <div className='stats_page_summary'>
                    <div className='stats_page_sum_div'>Total Games Played 
                        <p className='stats_page_sum_figure'>{this.state.numberOfGamesPlayed}</p>
                    </div>
                    <div className='stats_page_sum_div'>Total Score 
                        <p className='stats_page_sum_figure'>
                            {this.state.totalScore}
                        </p>
                    </div>
                    <div className='stats_page_sum_div'>Average Attempts Before Success 
                        <p className='stats_page_sum_figure'>{this.state.avgAttemptsBeforeSuccess}</p>
                    </div>
                </div>
                <div className='stats_page_details'>
                    <div className='detail_wrapper'>
                        <h3>Game Completion Rate</h3>
                        <CompletionRate 
                            completionRate={this.state.completionRate}
                            allGamesAttempted = {this.state.allGamesAttempted}
                        />
                    </div>
                    <div className='detail_wrapper'>
                        <h3>Trial Frequency</h3>
                        <TrialAndErrorStats 
                            trialAndErrFreq={this.state.trialAndErrFreq}
                            allGamesAttempted = {this.state.allGamesAttempted}
                        />
                    </div>
                </div>
                <div className='gameCard-wrapper'>
                    <h3>Recently Played</h3>
                    <RecentGames
                        recentGameObjects={this.state.recentGameObjects}
                    />
                </div>
            </div>
        )
    }
}

export default ChildReportPage
