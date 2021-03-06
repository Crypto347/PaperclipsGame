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
* Styles
*/

import './card.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Selectors
*/

import * as Selectors from '../../../../reducers/selectors';

/**
* Card component definition and export
*/

class Card extends Component {

    /**
    * Methods
    */

    componentDidMount () {
        this.intervalCheckCardValidity = setInterval(()=>{
            if(
                this.props.ops >= this.props.priceOps && this.props.priceCreat === 1 && this.props.priceTrust === 1 && this.props.priceYomi === 1 && this.props.priceMoney === 1||
                this.props.creativity >= this.props.priceCreat && this.props.priceOps === 1 && this.props.priceTrust === 1 && this.props.priceYomi === 1 && this.props.priceMoney === 1||
                this.props.trust >= this.props.priceTrust && this.props.priceCreat === 1 && this.props.priceOps === 1 && this.props.priceYomi === 1 && this.props.priceMoney === 1||
                this.props.funds >= this.props.priceMoney && this.props.priceCreat === 1 && this.props.priceTrust === 1 && this.props.priceOps === 1 && this.props.priceYomi === 1||

                this.props.yomi >= this.props.priceYomi && this.props.funds >= this.props.priceMoney && this.props.priceOps === 1 && this.props.priceCreat === 1 && this.props.priceTrust === 1||
                this.props.ops >= this.props.priceOps && this.props.creativity >= this.props.priceCreat && this.props.priceTrust === 1 && this.props.priceYomi === 1 && this.props.priceMoney === 1||
                this.props.ops >= this.props.priceOps && this.props.trust >= this.props.priceTrust && this.props.priceCreat === 1 && this.props.priceYomi === 1 && this.props.priceMoney === 1||
                this.props.ops >= this.props.priceOps && this.props.yomi >= this.props.priceYomi && this.props.priceTrust === 1 && this.props.priceCreat === 1 && this.props.priceMoney === 1||

                this.props.ops >= this.props.priceOps && this.props.creativity >= this.props.priceCreat && this.props.yomi >= this.props.priceYomi && this.props.priceTrust === 1 && this.props.priceMoney === 1 ||
                
                this.props.ops <= this.props.priceOps && this.props.priceCreat === 2 && this.props.priceTrust === 2 && this.props.priceYomi === 2 && this.props.priceMoney === 2
            ){
                this.props.checkCardValidity(this.props.id, true, this.props.i)
            }else{
                this.props.checkCardValidity(this.props.id, false, this.props.i)
            }
        }, 100);
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalCheckCardValidity)
    }
    
    /**
    * Markup
    */

    render(){
        return(
            <button 
                onClick={this.props.onClick} 
                className={this.props.valid ? "card" : "card-invalid"}
                disabled={!this.props.valid}
            >
                {this.props.children}
            </button>
        );
    }
}

export default connect(
    (state) => {
        return {
            ops: Selectors.getOpsState(state),
            creativity: Selectors.getCreativityState(state),
            trust: Selectors.getTrustState(state),
            yomi: Selectors.getYomiState(state),
            funds: Selectors.getFundsState(state)
        };
    },
    (dispatch) => {
        return {
            checkCardValidity: bindActionCreators(Actions.checkCardValidity, dispatch)
        };
    }
)(Card);
