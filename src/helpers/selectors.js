export function getAppointmentsForDay(state, day) {
	// match the day to the state and retrieve the array of appointments
	const appointmentsOfMatchedDay = state.days.filter(
		(filteredDay) => filteredDay.name === day
	)[0];

	// using the array of appointments render the appointment details
	const matchedAppointments = [];
	if (appointmentsOfMatchedDay) {
		appointmentsOfMatchedDay.appointments.map((appointment) =>
			matchedAppointments.push(state.appointments[appointment])
		);
	}
	return matchedAppointments;
}

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}
  // when re-rendering the same interviews, return the same (this prevents white-screen when clicking on a day twice consecutively)
  if (interview.interviewer.id) {
    return interview;
  }
  // replace the interview's id tag with the full description of the interviewer, found in state. 
	interview.interviewer = state.interviewers[interview.interviewer];
	return interview;
}