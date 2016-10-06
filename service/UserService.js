import UserDao from '../dao/UserDao.js'
class UserServie {

    getUser(ctx) {

        const userDao = new UserDao()
        return userDao.getUser(ctx);
    }
}

export default UserServie
