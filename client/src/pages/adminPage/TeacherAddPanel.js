import React, { Component } from 'react';
// import './AddUser.css';
import axios from "axios";

class TeacherAddPanel extends Component {
    state = {
        name: "",
        surname: "",
        login: "",
        password: "",
        // subjectName: "",
        // groups: "",
        response: ""
    };

    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

    addTeacher = async e => {
        e.preventDefault();
        try {
            const newUser = await axios.post("/api/teachers", {
                name: this.refs.name.value,
                surname: this.refs.surname.value,
                login: this.refs.login.value,
                password: this.refs.password.value,
                subjects: []
                }
            );
            this.setState({ response: newUser.data.message });
        } catch (err) {
            this.setState({ response: err.message });
        }
    };

    render() {
        return (
            <div className="AddUser-Wrapper">
                <form onSubmit={this.addTeacher}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={this.onChangeHandler}
                        ref="name"
                        className="Add-User-Input"
                        required
                        minLength="3"
                        maxLength="33"
                        id="name"
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        name="surname"
                        onChange={this.onChangeHandler}
                        ref="surname"
                        className="Add-User-Input"
                        required
                        minLength="3"
                        maxLength="33"
                        id="surname"
                    />
                    <input
                        type="text"
                        placeholder="Login"
                        name="login"
                        onChange={this.onChangeHandler}
                        ref="login"
                        className="Add-User-Input"
                        required
                        minLength="3"
                        maxLength="33"
                        id="login"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        onChange={this.onChangeHandler}
                        ref="password"
                        className="Add-User-Input"
                        required
                        minLength="3"
                        maxLength="33"
                        id="password"
                    />
                    <button type="submit" className="Add-User-Submit fa fa-plus"></button>
                    <button type="reset" className="Add-User-Reset fa fa-eraser"></button>
                </form>
                <p>{this.state.response}</p>
            </div>
        );
      }
}

export default TeacherAddPanel;
