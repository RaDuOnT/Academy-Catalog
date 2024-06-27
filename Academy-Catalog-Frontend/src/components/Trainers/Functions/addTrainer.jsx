import {
    Button
  } from "antd";

export default function addTrainer(props1,props2) {
    const randomNumber = parseInt(Math.random() * 100);
    const newTrainer = {
      id: randomNumber,
      name: "Name " + randomNumber,
      cursuriPredate: "Curs" + randomNumber,
      emailAddress: "test" + randomNumber + "@gmail.com",
      enabled: "Yes",
      details: (
        <Button type="primary" className="customizedButton" onClick={props2}>
          Details
        </Button>
      ),
    };
    props1((pre) => {
      return [...pre, newTrainer];
    });
}