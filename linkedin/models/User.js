import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  trees: [{
    _id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Tree",
       index: true
    },
    name: String,
    slug: String
}]
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)