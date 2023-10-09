class UsersMongoRepository {
	constructor(dao) {
		this.dao = dao;
	}

	githubAuth = async () => {
		let result = await this.dao.get();

		return result;
	};
}

export default UsersMongoRepository;
