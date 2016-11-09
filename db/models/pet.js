import db from '../db'


const pet = db.defineModel('pet',{
	name:{
		type:db.STRING(100)
		// unique:true
	},
	age:db.INTEGER,
	sex:db.STRING(15)
})

export default pet