const {BadRequestError, UnauthorizedError} =  require("../utils/errors")


class Session{

    static async addSession(info){
        
        console.log(info)


        return {hello:"world"}
    }


    static async testForErrors(info) {
        /* user should submit a password and username
        and if any of these fields are missing, throw an error */
        const requiredFields = ["second", "minute", "hour"];
        requiredFields.forEach((field) => {
          if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body`);
          }
        });
    
        // if username already exists in the system, throw an error
        const existingUser = await User.fetchUserByUsername(credentials.username);
        if (existingUser) {
          throw new BadRequestError(`duplicate username: ${credentials.username}`);
        }
      }

    
}

module.exports = Session