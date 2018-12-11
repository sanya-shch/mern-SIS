import React, {Component} from 'react'
import axios from "axios/index";

import SubjectSelection from './SubjectSelection'
import MarksList from './MarksList'

import './StudentPage.css'

class StudentPage extends Component {

    state = {
        studentId: "5bf9de4a89c3fd3664730079",
        subjectNameId: "",
        showStudentMarks: false,
        subjectName: "",
        objects: []
    };

    getOneMarks = async () => {
        try {
            const students = await axios(`/api/students/${this.state.studentId}`);
            students.data.st.subjects.map(subject => {
                if(subject._id === this.state.subjectNameId)
                    this.setState({subjectName: subject.subjectName});
            });
            const marks = await axios(`/api/marks/${this.state.studentId}/${this.state.subjectName}`);
            this.setState({ objects: marks.data.specificMarks });
        } catch (err) {
            console.log(err);
        }
    };

    updateData = (value) => {
        this.setState({ subjectNameId: value });
        this.getOneMarks();
        this.setState({ showStudentMarks: true });
    };

    render() {
        return (
            <div  className="boby_block displayed">
                <h1 className="display-4 ta">StudentPage</h1>
                <div className="inner60 ">
                    <SubjectSelection studentId={this.state.studentId} updateData={this.updateData}/>
                </div>
                <div className="inner">
                    { this.state.showStudentMarks
                        ? <MarksList objects={this.state.objects} subjectName={this.state.subjectName}/>
                        : null }
                </div>
            </div>
        )
    }
}

export default StudentPage;
