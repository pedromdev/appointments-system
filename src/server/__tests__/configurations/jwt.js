const expect = require('expect')
const Jwt = require('../../configurations/jwt').default

describe('JWT', () => {
  it('should, sign, verify and decode a token', () => {
    let token = Jwt.sign({ sub: 'abc123' })
    let decoedToken = Jwt.decode(token)

    expect(typeof token).toBe('string')
    expect(Jwt.verify(token)).toBeTruthy()
    expect(typeof decoedToken.iat).toBe('number')
  })
})
