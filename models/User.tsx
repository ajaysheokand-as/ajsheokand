import mongoose, { Document, Schema } from 'mongoose';

export interface UUser extends Document {
  name: string;
  phone: string;
  email: string;
  noOfQues: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String  },
  noOfQues: { type: Number },
});

export default mongoose.models.User || mongoose.model<UUser>('User', UserSchema);
