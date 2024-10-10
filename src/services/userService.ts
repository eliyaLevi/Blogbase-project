import User, { IUser } from "../models/userModel";


export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User({
        ...userData,
    });

    return await user.save()
};

// לקבל משתמש לפי ID
export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select("-password").populate("posts")
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find().select("-password")
}


export const getAllUsersWithPosts = async (): Promise<IUser[]> => {
    return await User.find().select("-password").populate("posts")
}

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password")
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id)
}


