import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface TTest extends Document {
  userId: ObjectId;
  date: Date;
  noOfQues: string;
  result:Object;
}

const TestSchema: Schema = new Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  noOfQues: { type: Number },
  result:Object,

});

export default mongoose.models.Test || mongoose.model<TTest>('Test', TestSchema);
