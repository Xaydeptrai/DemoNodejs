import {notAuth} from "./handle_errors";

export const isAdmin = (req, res, next) => {
    const {role_code} = req.user
    if(role_code !== 'G1') return notAuth("Permission denied", res)
    next()
}

export const isModeratorOrAdmin = (req, res, next) => {
    const {role_code} = req.user
    if(role_code !== 'G1' && role_code !== 'G2') return notAuth("Permission denied", res)
    next()
}
