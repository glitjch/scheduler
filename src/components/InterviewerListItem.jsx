import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// renders individual interviewer and name when selected
export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  
  const style = classNames("interviewers__item", {"interviewers__item--selected": selected});

  return (
    <li className={style} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
