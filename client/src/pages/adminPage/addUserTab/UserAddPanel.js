import React, { Component } from 'react';

import axios from "axios";

import "../AdminPage.css"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});

class UserAddPanel extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeName = e => {
        this.setState({ username: e.target.value });
    };
    onChangeSurname = e => {
        this.setState({ password: e.target.value });
    };

    handleSubmit(event) {
        console.log('sign-up handleSubmit, username: ');
        console.log(this.state.username);
        event.preventDefault();
        //request to server to add a new username/password
        axios.post('/user/', {
            username: this.state.username,
            password: this.state.password,
            role: 'a',
            userId: ''
        })
            .then(response => {
                console.log(response);
                if (!response.data.errmsg) {
                    console.log('successful signup');
                    // this.setState({ //redirect to login page
                    //     redirectTo: '/login'
                    // })
                } else {
                    console.log('username already taken')
                }
            }).catch(error => {
            console.log('signup error: ');
            console.log(error)

        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="form">
                <TextField
                    id="standard-password-input"
                    label="Username"
                    className={classes.textField}
                    type="username"
                    // name="username"
                    autoComplete="current-password"
                    margin="normal"
                    onChange={this.onChangeName}
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    // name="password"
                    autoComplete="current-password"
                    margin="normal"
                    onChange={this.onChangeSurname}
                />
                {/*<TextField*/}
                    {/*id="standard-password-input"*/}
                    {/*label="Role"*/}
                    {/*className={classes.textField}*/}
                    {/*type="role"*/}
                    {/*// name="role"*/}
                    {/*autoComplete="current-password"*/}
                    {/*margin="normal"*/}
                    {/*onChange={this.handleChange}*/}
                {/*/>*/}
                {/*<TextField*/}
                    {/*id="standard-password-input"*/}
                    {/*label="User ID"*/}
                    {/*className={classes.textField}*/}
                    {/*type="userId"*/}
                    {/*// name="userId"*/}
                    {/*autoComplete="current-password"*/}
                    {/*margin="normal"*/}
                    {/*onChange={this.handleChange}*/}
                {/*/>*/}
                <br/>
                <br/>
                <Button variant="contained" onClick={this.handleSubmit} >
                    Додати
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(UserAddPanel);
