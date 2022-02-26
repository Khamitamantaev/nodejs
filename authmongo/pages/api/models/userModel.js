module.exports = mongoose => {
    const User = mongoose.model(
        "User",
        mongoose.Schema(
            {
                name: {
                    type: String,
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String,
                    required: true
                },

            },
            { timestamps: true }
        )
    );
    return User;
};