
export const toUsersResponse = (users) => {
    return users.map(user => toUserResponse(user))
}

const toUserResponse = (user) => {
    return {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        role: user.role
    }
}

export { toUserResponse }