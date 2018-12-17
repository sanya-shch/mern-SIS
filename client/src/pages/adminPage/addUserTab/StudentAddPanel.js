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
    },
});

class StudentAddPanel extends Component {
    state = {
        name: "",
        surname: "",
        // login: "",
        // password: "",
        groupN: "",
        response: ""
    };

    onChangeName = e => {
        this.setState({ name: e.target.value });
    };
    onChangeSurname = e => {
        this.setState({ surname: e.target.value });
    };
    onChangeGroup = e => {
        this.setState({ groupN: e.target.value });
    };

    addStudent = async e => {
        e.preventDefault();
        try {
            const newUser = await axios.post('/api/students',{
                name: this.state.name,
                surname: this.state.surname,
                // login: this.refs.login.value,
                // password: this.refs.password.value,
                groupN: this.state.groupN,
                subjects: []
            });
            this.setState({ response: newUser.data.message });
        } catch (err) {
            this.setState({ response: err.message });
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className="form">
                <TextField
                    id="standard-password-input"
                    label="Name"
                    className={classes.textField}
                    type="name"
                    margin="normal"
                    onChange={this.onChangeName}
                />
                <TextField
                    id="standard-password-input"
                    label="Surname"
                    className={classes.textField}
                    type="surname"
                    margin="normal"
                    onChange={this.onChangeSurname}
                />
                <TextField
                    id="standard-password-input"
                    label="Group"
                    className={classes.textField}
                    type="groupN"
                    margin="normal"
                    onChange={this.onChangeGroup}
                />
                <br/>
                <br/>
                <Button variant="contained" onClick={this.addStudent} >
                    Додати
                </Button>
                <p>{this.state.response}</p>
            </div>
            // <div className="AddUser-Wrapper">
            //     <form onSubmit={this.addStudent}>
            //         <input
            //             type="text"
            //             placeholder="Name"
            //             name="name"
            //             onChange={this.onChangeHandler}
            //             ref="name"
            //             className="Add-User-Input"
            //             required
            //             minLength="3"
            //             maxLength="33"
            //             id="name"
            //         />
            //         <input
            //             type="text"
            //             placeholder="Surname"
            //             name="surname"
            //             onChange={this.onChangeHandler}
            //             ref="surname"
            //             className="Add-User-Input"
            //             required
            //             minLength="3"
            //             maxLength="33"
            //             id="surname"
            //         />
            //         <input
            //             type="text"
            //             placeholder="Login"
            //             name="login"
            //             onChange={this.onChangeHandler}
            //             ref="login"
            //             className="Add-User-Input"
            //             required
            //             minLength="3"
            //             maxLength="33"
            //             id="login"
            //         />
            //         <input
            //             type="text"
            //             placeholder="Password"
            //             name="password"
            //             onChange={this.onChangeHandler}
            //             ref="password"
            //             className="Add-User-Input"
            //             required
            //             minLength="3"
            //             maxLength="33"
            //             id="password"
            //         />
            //         <input
            //             type="text"
            //             placeholder="Group"
            //             name="groupN"
            //             onChange={this.onChangeHandler}
            //             ref="groupN"
            //             className="Add-User-Input"
            //             required
            //             minLength="3"
            //             maxLength="33"
            //             id="groupN"
            //         />
            //         <button type="submit" className="Add-User-Submit fa fa-plus"></button>
            //         <button type="reset" className="Add-User-Reset fa fa-eraser"></button>
            //     </form>
            //     <p>{this.state.response}</p>
            // </div>
        );
    }
}

export default withStyles(styles)(StudentAddPanel);
