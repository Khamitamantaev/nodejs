import mongoose from 'mongoose';
import Branch from '../models/Branch'

function slugify(string) {
   const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
   const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
   const p = new RegExp(a.split('').join('|'), 'g')

   return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

const TreeSchema = new mongoose.Schema({
   name: String,
   slug: String,
   isPrivate: {type: Boolean, default: true },
   rootUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   branches: [{
      _id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Branch",
         index: true,
      },
      rootUser: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         index: true,
      },
      parentID: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Branch",
         index: true,
      }, 
      imageBranch: String, 
      description: String,
      code: String,
      name: String,
      slug: String
   }]
});

TreeSchema.pre('save', async function (next) {
   this.slug = slugify(this.name);
   next();
});

module.exports = mongoose.models.Tree || mongoose.model('Tree', TreeSchema)