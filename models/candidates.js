import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  // cv: {type: Buffer, required: true}
});

module.exports = mongoose.model('candidates', candidateSchema);
