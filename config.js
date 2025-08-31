//creating different file for JWT_PASSWORD!! for(user nd admin!!)
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

module.exports = {   //here we exports the JWT_PASSWORDS
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD
}