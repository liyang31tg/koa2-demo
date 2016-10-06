 import UserService from '../service/UserService'
 class UserAction {


     getUser(ctx) {
         const userservice = new UserService()
         return userservice.getUser(ctx);
     }
 }


 export default UserAction
