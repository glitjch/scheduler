import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// main component for handling mode changes 
export default function Appointment(props) {
  const { bookInterview, id, interview, cancelInterview } = props;


  // modify form based on interview status
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  

  // creates the object of the interview
  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
      .then(() => {transition(SAVING)})
      .then(() => {transition(SHOW)})
      .catch((error)=> {
        transition(ERROR_SAVE);
      })
  };


  const deleteAppointment = (id) => {
    // additional transition(DELETING) for render flow
    transition(DELETING)
    cancelInterview(id)
      .then(() => {transition(DELETING)})
      .then(() => {transition(EMPTY)})
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  }

	return (
		<article className='appointment'>
			<Header time={props.time} />
        {mode === SHOW && <Show 
        student={interview.student} 
        interviewer={interview.interviewer} 
        cancelInterview={() => {transition(CONFIRM)}}
        onEdit={() => {transition(EDIT)}}
      />}
      {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form
        interviewers={props.interviewers} 
        onCancel={() => back(EMPTY)} 
        onSave={save}
      />}
      {mode === EDIT && <Form 
        onSave={save}
        onCancel={() => back()}
        interviewers={props.interviewers} 
        name={interview.student}
        interviewer={interview.interviewer.id}
      />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && 
        <Confirm message={"Are you sure you want to delete?"} 
        onCancel={back}
        onDelete={() => deleteAppointment(id)}
        />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment."} onClose={()=>{back()}}/>}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment."} onClose={()=>{back()}}/>}
      
		</article>
	);
}
