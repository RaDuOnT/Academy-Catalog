import {
    Modal, message
  } from "antd";
import { deleteStudentAction } from "../../../store/actions/studentsActions";

export default function deleteStudent(props1,studentId, deleteAction) {
  
  
  const deletedId = studentId;
    Modal.confirm({
    title: "Are you sure, you want to delete this student record?",
    okText: "Yes",
    okType: "danger",
    onOk: () => {
      deleteAction(deletedId);
      message.info("Student deleted");
    },
  });
}

