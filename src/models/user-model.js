import mongoose from "mongoose";
import brcypt from "bcrypt";

const userSchema = new mongoose.Schema({
    nickname: { type: String, default: ""},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    });

    userSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
            this.password = await brcypt.hash(this.password, 10);
        }
        next();
    });

    export default mongoose.model('User', userSchema);
    