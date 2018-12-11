import React from 'react';

import './StudentPage.css'

const Marks = ({object_text, objectMarks, objectPresents, objectCreatedt}) => {

    const tableHead = objectCreatedt.map(object => {
        return (<th key={object.id} scope="col">{object.createdt}</th>)
    });

    const tableBodyPresents = objectPresents.map(object => {
        return (<td key={object.id}>{object.present?"":"Н"}</td>)
    });

    const tableBodyMarks = objectMarks.map(object => {
        return (<td key={object.id}>{object.markN}</td>)
    });

    return(
        <div>
            <br/>
            <br/>
            <h4>{object_text}</h4>
            <br/>
            <div className="table-responsive whitespace border rounded">
                <table className="table">
                    <thead className="thead-light">

                    <tr>
                        <th scope="col">Дата</th>
                        {tableHead}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Оцінка</th>
                        {tableBodyMarks}
                    </tr>
                    <tr>
                        <th scope="row">Присутність</th>
                        {tableBodyPresents}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
    // return (<p className="list-group-item" onClick={() => {click(subject.id)}}>{subject.subjectName}</p>);

};

export default Marks;
