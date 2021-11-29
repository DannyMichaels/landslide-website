import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  bucket: { type: String },
  key: { type: String },
  location: { type: String },
  result: { type: Object },
  // uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this post'],
    },

    subtitle: {
      type: String,
      required: false,
      maxlength: [30, 'subtitle cannot be more than 30 characters'],
    },

    // uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    content: {
      type: String,
      required: [true, 'Please add a body for this post'],
    },

    images: {
      type: [ImageSchema],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
