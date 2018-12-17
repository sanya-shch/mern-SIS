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

class TeacherAddPanel extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            surname: "",
            // login: "",
            // password: "",
            response: ""
        };
    }

    onChangeName = e => {
        this.setState({ name: e.target.value });
    };
    onChangeSurname = e => {
        this.setState({ surname: e.target.value });
    };
    addTeacher = async e => {
        e.preventDefault();
        try {
            const newUser = await axios.post("/api/teachers", {
                name: this.state.name,
                surname: this.state.surname,
                // login: this.refs.login.value,
                // password: this.refs.password.value,
                subjects: []
                }
            );
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
                    // autoComplete="current-password"
                    margin="normal"
                    onChange={this.onChangeName}
                />
                <TextField
                    id="standard-password-input"
                    label="Surname"
                    className={classes.textField}
                    type="surname"
                    // autoComplete="current-password"
                    margin="normal"
                    onChange={this.onChangeSurname}
                />
                <br/>
                <br/>
                <Button variant="contained" onClick={this.addTeacher} >
                    Додати
                </Button>
                <p>{this.state.response}</p>
            </div>
            // <div className="AddUser-Wrapper">
            //     <form onSubmit={this.addTeacher}>
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
            //         <button type="submit" className="Add-User-Submit fa fa-plus"></button>
            //         <button type="reset" className="Add-User-Reset fa fa-eraser"></button>
            //     </form>
            //     <p>{this.state.response}</p>
            // </div>
        );
      }
}

export default withStyles(styles)(TeacherAddPanel);
