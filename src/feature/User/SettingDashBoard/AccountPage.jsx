import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

class AccountPage extends Component {

    state = {
        count : 10 
    }

    incrementHandler = () => {
        this.setState({
            count : this.state.count + 1
        })
    }

    decrementHandler = () => {
        this.setState({
            count : this.state.count - 1
        })
    }

    render() {
        return (
            <div>
                <h2>Count Number : {this.state.count} </h2>
                <Button onClick={this.incrementHandler} variant="success" className="mr-3" >
                    Increment
                </Button>
                <Button onClick={this.decrementHandler}  variant="danger" >
                    Decrement
                </Button>
            </div>
        );
    }
}

export default AccountPage;