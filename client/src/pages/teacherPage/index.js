import React, {Component} from 'react'

import SubjectSelection from './SubjectSelection'

import "./TeacherPage.css"
import axios from "axios/index";

import ReactTable from "react-table";
import "react-table/react-table.css";


class TeacherPage extends React.Component {
    constructor() {
        super();
        this.state = {
            teacherId: "5bfc632f4302e53330ab34cc",
            showStudentMarks: false,
            data: [],

            columns: [{
                Header: "Ім'я",
                accessor: "name",
                Cell: this.renderEditable
            },{
                Header: "Прізвище",
                accessor: "surname",
                Cell: this.renderEditable
            },],
            marks: [],
            visits: [],
            selectedDate: "",
            columnName: '',
        };
        this.renderEditable = this.renderEditable.bind(this);
    }
    updateColumnName = (e) => {
        const columnName = e.target.value;
        this.setState({ columnName });
    };
    addColumn = () => {
        const columns = [...this.state.columns];
        const column = {
            Header: this.state.columnName.toUpperCase(),
            accessor: this.state.columnName,
            Cell: this.renderEditable
        }
        columns.push(column);
        this.setState({ columns, columnName: '' });
    }
    // addColumn = () => {
    //     let today  = new Date();
    //     const columns = [...this.state.columns];
    //     const column = {
    //         Header: today.toLocaleDateString(),
    //         accessor: "mark",
    //         Cell: this.renderEditable
    //     };
    //     columns.push(column);
    //     this.setState({ columns });
    // };

    getMarks = async (subjectName, groups)  => {
        try {
            const marks = await axios(`/api/marks/marks/${groups}/${subjectName}`);
            this.setState({ data: marks.data.specificMarks });
            console.log(marks.data.specificMarks);
            if(marks.data.specificMarks.length===0){
                const students = await axios(`/api/students/${groups}/${subjectName}`);
                console.log(students.data.st);
                students.data.st.map(student => {
                    this.setState(state => {
                        const marks = state.marks.concat(({name: student.name, surname: student.surname}));
                        return {
                            marks
                        };
                    });
                });
            }

            // marks.data.specificMarks.subjects.map(subject => {
            //     this.setState(state => {
            //         const data = state.data.concat(({id: subject._id, subjectName: subject.subjectName, groups: subject.groups}));
            //         return {
            //             data
            //         };
            //     });
            // });
            //
            // const students = await axios(`/api/students/${this.state.studentId}`);
            // students.data.st.name
            // students.data.st.surname
            // this.setState({subjectName: subject.subjectName});

        } catch (err) {
            console.log(err);
        }
    };

    updateData = (value) => {
        this.state.columns = [{
            Header: "Ім'я",
            accessor: "name",
            Cell: this.renderEditable
        }, {
            Header: "Прізвище",
            accessor: "surname",
            Cell: this.renderEditable
        },];
        this.state.marks = [];
        this.state.visits = [];
        console.log(value);
        // this.setState({subjectName: value.subjectName, groups: value.groups, subjectsId: value.id });
        // console.log(this.state.groups);console.log(this.state.subjectName);
        this.getMarks(value.subjectName, value.groups);
        this.setState({ showStudentMarks: true });
        // // this.forceUpdate();
    };

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const marks = [...this.state.marks];
                    marks[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ marks });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.marks[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        return (
            <div className="boby_block displayed">
                <h1 className="display-4 ta">TeacherPage</h1>
                <div className="inner60">
                    <SubjectSelection teacherId={this.state.teacherId} updateData={this.updateData}/>
                </div>
                <br/>
                { this.state.showStudentMarks ?
                <div className="inner">
                    <br/>
                    <h2 className="ta">Оцінки</h2>
                    <br/>
                    <input placeholder="column name" onChange={this.updateColumnName} value={this.state.columnName} />
                    <button onClick={this.addColumn}>Add Column</button>
                    <br/>
                    <ReactTable
                        data={this.state.marks}
                        columns={this.state.columns}

                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                    <br/>
                    <ReactTable
                        data={this.state.visits}
                        columns={this.state.columns}

                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                    <br/>
                </div>
                    : null }
            </div>
        )
    }
}

export default TeacherPage;
