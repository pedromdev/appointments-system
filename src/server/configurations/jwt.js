import jsonwebtoken from 'jsonwebtoken'

const tokenSecretKey = process.env.JWT_SECRET_KEY_TOKEN

export default {
  sign(data) {
    const iat = Math.floor(Date.now() / 1000)
    return jsonwebtoken.sign({ ...data, iat }, tokenSecretKey)
  },
  verify(token) {
    return jsonwebtoken.verify(token, tokenSecretKey)
  },
  decode(token) {
    return jsonwebtoken.decode(token)
  }
}
