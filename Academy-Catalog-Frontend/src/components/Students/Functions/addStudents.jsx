import {
    Button
  } from "antd";

export default function addStudent(props1,props2) {
    const randomNumber = parseInt(Math.random() * 100);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      mark: randomNumber,
      emailAddress: "test" + randomNumber + "@gmail.com",
      enabled: "Yes",
      details: (
        <Button type="primary" className="customizedButton" onClick={props2}>
          Details
        </Button>
      ),
    };
    props1((pre) => {
      return [...pre, newStudent];
    });
}