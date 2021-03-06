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

import Button from '../../../../../library/Button/button';

/**
* Styles
*/

import './autoWireBuyer.scss';

/**
* Actions
*/

import * as Actions from '../../../../../actions';

/**
* Selectors
*/

import * as Selectors from '../../../../../reducers/selectors';

/**
* AutoWireBuyer component definition and export
*/

export class AutoWireBuyer extends Component {

    /**
    * Markup
    */

    render(){
        return(
            <div className="autoWireBuyer-wrapper1">
                <Button
                    onClick={this.props.toggleAutoWireBuyer}
                    text={"WireBuyer"}
                />
                <div className="autoWireBuyer-text">{this.props.autoWireBuyerIsOn ? "ON" : "OFF"}</div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            autoWireBuyerIsOn: Selectors.getAutoWireBuyerIsOnState(state)
        };
    },
    (dispatch) => {
        return {
            toggleAutoWireBuyer: bindActionCreators(Actions.toggleAutoWireBuyer, dispatch)
        };
    }
)(AutoWireBuyer);
