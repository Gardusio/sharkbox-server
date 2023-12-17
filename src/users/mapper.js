
export const toUsersResponse = (users) => {
    return users.map(user => toUserResponse(user))
}


const toUserResponse = (user) => {

    return {
        id: user._id,
        name: user.name
    }
}

export { toUserResponse }