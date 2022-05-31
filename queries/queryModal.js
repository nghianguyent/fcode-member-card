module.exports = {
	getUserByEmail: 'SELECT * FROM member WHERE school_mail = ? or personal_mail= ?',
	getUserById: 'SELECT * FROM member WHERE id = ?',
	changeActivePoint: 'UPDATE member SET active_point = active_point + ? WHERE id = ?',
	getEventById: 'SELECT * FROM event WHERE id = ?',
	getAttendance: 'SELECT * FROM attendance WHERE member_id = ? and event_id = ?',
	getEvent: 'SELECT * FROM event ORDER BY id DESC',
	deleteEvent: 'DELETE FROM event WHERE id=?',
	updateEvent:
		'UPDATE event SET name=?, start_date=?, end_date=?, description=?, ' +
		'start_time=?, end_time=?, status=?, semester=?, location=?' +
		'WHERE id=?',
	insertEvent: 'INSERT INTO event VALUES(?,?,?,?,?,?,?,?,?,?)',
	insertAttendance: 'INSERT INTO attendance (member_id, event_id, status) VALUES (?)',
};
