import React from "react";
import "./loginform.css";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 330,
    },
});

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            redirectTo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeUser = e => {
        this.setState({ username: e.target.value });
        // console.log(this.state.username);
    };

    onChangePassword = e => {
        this.setState({ password: e.target.value });
        // console.log(this.state.password);
    };

    // onSubmit = () => {
    //     this.props.updateData(this.state.username, this.state.password);
    // };

    handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit');
console.log(this.state);
        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ');
                console.log(response);
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateData({
                        loggedIn: true,
                        username: response.data.username
                    });
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/admin'
                    })
                }
            }).catch(error => {
            console.log('login error: ');
            console.log(error);

        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            const {classes} = this.props;
            return (
                <div className="login-form">
                    <Typography variant="display1" align="center">
                        Вхід до системи
                    </Typography>
                    <TextField
                        id="standard-password-input"
                        label="Username"
                        className={classes.textField}
                        type="username"
                        // autoComplete="current-password"
                        margin="normal"
                        onChange={this.onChangeUser}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.onChangePassword}
                    />
                    <br/>
                    <br/>
                    <Button onClick={this.handleSubmit} fullWidth={true}>Вхід</Button>
                </div>
            );
        }
    }
}

export default withStyles(styles)(LoginForm);
