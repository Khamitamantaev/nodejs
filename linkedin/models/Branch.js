import mongoose from 'mongoose';


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

const BranchSchema = new mongoose.Schema({
name: String,
slug: String,
description: String,
code: String,
url: String,
rootConfirm: Boolean,
IsMain: Boolean,
rootUser: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User'
},
treeID: {
   type: mongoose.Schema.Types.ObjectId,
   default: null,
   ref: 'Tree'
},
parentID: {
  type: mongoose.Schema.Types.ObjectId,
  default: null,
  ref: 'Branch'
},
imageBranch: String, 
branches: [{
     _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        index: true
     },
     description: String,
     name: String,
     slug: String
}]
});

BranchSchema.pre('save', async function (next) {
   this.slug = slugify(this.name);
   next();
});

module.exports = mongoose.models.Branch || mongoose.model('Branch', BranchSchema)