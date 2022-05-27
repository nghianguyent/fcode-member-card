module.exports = {
	getUserByEmail: 'SELECT * FROM member WHERE school_mail = ? or personal_mail= ?',
	getUserById: 'SELECT * FROM member WHERE id = ?',
	getEventById: 'SELECT * FROM event WHERE id = ?',
	getAttendance: 'SELECT * FROM attendance WHERE member_id = ? and event_id = ?',
	insertAttendance: 'INSERT INTO attendance (member_id, event_id, status) VALUES (?)',
};
