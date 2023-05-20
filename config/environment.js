

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : "somehting",
    db : 'codeial_dev',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : true,
        auth : {
            user : 'yadavabhi050198',
            pass : 'yioptopimwzveaox'
        },
    },
    google_client_ID : "862569520441-eqf229al04dmsruvt1o38e4t1in2echq.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_backURL : "http://localhost:8000/auth/google/callback",
    jwt_secret : 'codeial',

}

const production = {
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : "somehting",
    db : 'codeial_production',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : true,
        auth : {
            user : process.env.PASSWORD,
            pass : process.env.USER,
        },
    },
    google_client_ID : process.env.CODEIAL_google_client_ID,
    google_client_secret : process.env.CODEIAL_google_client_secret,
    google_call_backURL : process.env.CODEIAL_google_call_backURL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET,
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) ==  undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);