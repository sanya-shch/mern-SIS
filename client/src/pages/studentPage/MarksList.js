import React from 'react';

import Marks from './Marks';

const MarksList = ({objects, subjectName}) => {

    let objectMarks = [];
    let objectPresents = [];
    let objectCreatedt = [];

    const todoNode = objects.map(object => {
        objectMarks = [];
        objectPresents = [];
        objectCreatedt = [];
        object.marks.map(marks => {
            // let d = marks.createdt.toString('dd-MMM-yyyy')
            objectMarks.push({
                id:marks._id,
                markN: marks.markN.toString()
            });
            objectPresents.push({
                id:marks._id,
                present: marks.present.toString()
            });
            objectCreatedt.push({
                id:marks._id,
                createdt: marks.createdt
            });

        });
        // console.log(objectMarks,objectPresents,objectCreatedt,object.text);
        return (<Marks object_text={object.text} objectMarks={objectMarks} objectPresents={objectPresents} objectCreatedt={objectCreatedt} key={object.id}/>)
    });

    return (
        <div>
            <br/>
            <br/>
            <h2 className="ta">Оцінки та відвідуваність</h2>
            <h3 className="ta">з предмету {subjectName}</h3>
            {todoNode}
            <br/>
            <br/>
            <br/>
        </div>
    );
};

export default MarksList;
