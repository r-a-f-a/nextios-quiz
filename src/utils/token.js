import jwt from '@allinmkt/jwt'

const TokenService = {

    async init(accountData) {
        let decoded = await jwt(accountData, process.env.VUE_APP_JWT_SECRET).verify()
        let data = {
            client: decoded.code.transid,
            permissions: ['admin']
        }
        let token = await jwt(data, process.env.VUE_APP_SECRET).generate()
        return token
    },

    async encrypt(data) {
        let token = await jwt(data, process.env.VUE_APP_SECRET).generate()
        return token
    }
}

export default TokenService;