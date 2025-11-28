export const UserMapper = {
    toResponse(user: any) {
        return { id: user.id || user._id, name: user.name, email: user.email };
    }
};
