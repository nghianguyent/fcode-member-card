const queries = require('./../queries/queryModal');
const queryHelper = require('./../services/query-helper');

class Member {
	constructor(member) {
		this.id = member.id;
		this.memberId = member.memberId;
		this.firstName = member.firstName;
		this.lastName = member.lastName;
		this.dateOfBirth = member.dateOfBirth;
		this.schoolMail = member.schoolMail;
		this.personalMail = member.personalMail;
		this.phoneNumber = member.phoneNumber;
		this.major = member.major;
		this.sessionYear = member.sessionYear;
		this.position = member.position;
		this.facebook = member.facebook;
		this.portfolioId = member.portfolioId;
		this.activePoint = member.activePoint;
		this.avatar = member.avatar;
	}

	static getUserById(id, callback) {
		const query = queries.getUserById;
		queryHelper
			.getData(query, [id])
			.then((response) => {
				// this(response.data);
				if (response[0]) {
					callback(null, response[0]);
					return response[0];
				}
				callback(null, false);
				return null;
			})
			.catch((error) => {
				callback(error, false);
				return null;
			});
	}

	static changeActivePoint(id, points, callback) {
		// points = parseInt(points);
		if (!points) return callback(Error("Missing body 'points'"), null);
		const query = queries.changeActivePoint;
		queryHelper
			.setData(query, [points, id])
			.then((res) => {
				callback(null, res);
			})
			.catch((err) => {
				callback(err, null);
			});
	}
}

module.exports = Member;
