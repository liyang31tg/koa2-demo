class UserDao {


    async getUser(ctx) {
        let a = []

        for (let i = 0; i < 10; i++) {
            let c = await ctx.mongo.db('test').collection('user').findOne();
            a.push(c)

        }

        return a
    }
}

export default UserDao
