const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    try {
        const accesstoken = req.headers['authorization'];
        if (!accesstoken) {
            console.log("asstokennotfound");
            if (renewToken(req, res)) {
                next()
            }
        }
        else {
            jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err, decoded) => {
                if (err) {
                    return res.json({ valid: false, message: "Invalid Token" })
                } else {
                    console.log("accesstoken still valid");
                    req.Email = decoded.Email
                    req.loggedIn_user_id = decoded.loggedIn_user_id
                    next()
                }
            })
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const renewToken = (req, res) => {
    try {
        const refreshtoken = req.headers['refreshtoken'];
        let exist = false;
        if (!refreshtoken) {
            console.log("No Refresh token");
             res.json({ valid: false, message: "No Refresh token" })
        } else {
            jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err, decoded) => {
                if (err) {
                    console.log("Invalid Refresh Token");
                    return res.json({ valid: false, message: "Invalid Refresh Token" })
                } else {
                    console.log("created new toekn");
                    let payload = {
                        Email: decoded.Email,
                        loggedIn_user_id: decoded.loggedIn_user_id
                    }
                    const accessToken = jwt.sign(payload,
                        "jwt-access-token-secret-key", { expiresIn: '5m' })
                    req.accessToken = accessToken
                    exist = true;
                }
            })
        }
        return exist;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    verifyUser
};
