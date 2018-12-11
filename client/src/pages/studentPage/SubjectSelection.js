import React, {Component} from 'react'

import axios from "axios";

import SubjectList from './SubjectList'

import './StudentPage.css'

class SubjectSelection extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.getOneStudent();
    }

    getOneStudent = async ()  => {
        try {
            const students = await axios(`/api/students/${this.props.studentId}`);
            students.data.st.subjects.map(subject => {
                this.setState(state => {
                    const data = state.data.concat(({id: subject._id,subjectName: subject.subjectName}));
                    return {
                        data
                    };
                });
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleClick = (id) => {this.props.updateData(id)};

    render() {
        return (
            <div>
                {/*<Title text={"Виберіть предмет"}/>*/}
                <h2 className="ta">Виберіть предмет</h2>
                <SubjectList
                    subjects={this.state.data}
                    click={this.handleClick.bind(this)}
                />
            </div>
        )
    }
}

export default SubjectSelection;
