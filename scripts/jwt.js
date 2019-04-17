import jwt from "../src/server/configurations/jwt";

console.log(jwt.sign({sub: '5cb68a367cd21c006d442567', scope: 'auth'}));