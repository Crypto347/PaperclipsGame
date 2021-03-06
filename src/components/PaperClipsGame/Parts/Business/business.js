/**
* Libraries
*/

import React,{
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

/**
* Components
*/

import Button from '../../../../library/Button/button';
import RevTracker from './RevTracker/revTracker';

/**
* Styles
*/

import './business.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Selectors
*/

import * as Selectors from '../../../../reducers/selectors';

/**
* Utility
*/

import * as Utility from '../../../../utility';

/**
* Constants
*/

import * as projectsToAdd from '../../../../constants/projectsToAdd';

/**
* Business component definition and export
*/

export class Business extends Component {

    /**
    * Methods
    */

    componentDidMount() {
        this.props.startUpdatingUnsoldInventory();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.funds !== this.props.funds) {
            if(this.props.funds >= 100 && this.props.hostileTakeoverIsThrown === false){
                this.props.addProject(projectsToAdd.HostileTakeover);
                this.props.toggleThrownProject('hostileTakeover', true);
            }
        }
    }

    renderBusiness = () => {
        return(
            <div className="business">
                <div className="business-label">Business</div>
                <div className="business-line"/>
                <div className="business-section">
                    <div className="business-text">Available Funds: $ {Utility.commaSeparator(this.props.funds)}</div>
                    {this.props.revTracker ? <RevTracker avgRevPerSec={this.props.avgRevPerSec} avgClipsSoldPerSec={this.props.avgClipsSoldPerSec}/> : null}
                    <div className="business-text">Unsold Inventory: {Utility.commaSeparator(this.props.unsoldInventory)}</div>
                    <div className="business-wrapper1">
                        <Button
                            onClick={this.props.lowerPrice}
                            text={"lower"}
                            disabled={this.props.paperclipPrice <= 0.01}
                        />
                        <Button
                            onClick={this.props.raisePrice}
                            text={"raise"}
                        />
                        <div className="business-text">Price per Clip: $ {Utility.commaSeparator(this.props.paperclipPrice)}</div>
                    </div>
                    <div className="business-text">Public Demand: {Utility.commaSeparator(this.props.publicDemand)}%</div>
                </div>
                <div className="business-section">
                    <div className="business-wrapper2">
                        <Button
                            onClick={this.props.marketingNextLevel}
                            text={"Marketing"}
                            disabled={this.props.marketingButtonDisabled}
                        />
                        <div className="business-text">Level: {this.props.marketingLevel}</div>
                    </div>
                    <div className="business-text">Cost: ${Utility.commaSeparator(this.props.marketingCost.toFixed(2))}</div>
                </div>
            </div>
        )
    }

    /**
    * Markup
    */

    render(){
        return(
            <div>
                {this.props.businessSectionIsShown ? this.renderBusiness() : null}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            unsoldInventory: Selectors.getUnsoldInventoryState(state),
            funds: Selectors.getFundsState(state),
            paperclipPrice: Selectors.getPaperclipPriceState(state),
            publicDemand: Selectors.getPublicDemandState(state),
            marketingLevel: Selectors.getMarketingLevelState(state),
            marketingCost: Selectors.getMarketingCostState(state),
            marketingButtonDisabled: Selectors.getMarketingButtonDisabledState(state),
            revTracker: Selectors.getRevTrackerState(state),
            avgRevPerSec: Selectors.getAvgRevPerSecState(state),
            avgClipsSoldPerSec: Selectors.getAvgClipsSoldPerSecState(state),
            hostileTakeoverIsThrown: Selectors.getHostileTakeoverIsThrownState(state),
            businessSectionIsShown: Selectors.getBusinessSectionIsShownState(state)
        };
    },
    (dispatch) => {
        return {
            lowerPrice: bindActionCreators(Actions.lowerPrice, dispatch),
            raisePrice: bindActionCreators(Actions.raisePrice, dispatch),
            marketingNextLevel: bindActionCreators(Actions.marketing, dispatch),
            startUpdatingUnsoldInventory: bindActionCreators(Actions.startUpdatingUnsoldInventory, dispatch),
            addProject: bindActionCreators(Actions.addProject, dispatch),
            toggleThrownProject: bindActionCreators(Actions.toggleThrownProject, dispatch)
        };
    }
)(Business);
