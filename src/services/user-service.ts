import { create } from "../repository/user-repository";
import bcrypt from "bcryptjs";

export async function createUser(data: { name: string, email: string, password: string, cpf: string }) {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    data.password = encryptedPassword;

    const userData = {
        ...data,
        avatar: "uploads/default-avatar.png",
    };

    try {
        return await create(userData);
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "CPF already exists") {
            throw new Error("This CPF is already registered.");
        }
        throw error;
    }
}
