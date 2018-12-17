import React from "react";
import "./loginform.css";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
});

class LoginForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: "",
            password: "",
            role: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeUser = e => {
        this.setState({ username: e.target.value });
    };

    onChangePassword = e => {
        this.setState({ password: e.target.value });
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit');
        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ');
                console.log(response);
                if (response.status === 200) {
                    this.props.updateData({
                        loggedIn: true,
                        userId: response.data.userId,
                        role: response.data.role
                    });
                }
            }).catch(error => {
            console.log('login error: ');
            console.log(error);

        })
    }

    render() {
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
                    autoComplete="current-password"
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

export default withStyles(styles)(LoginForm);
