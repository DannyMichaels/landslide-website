import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this song'],
    },

    imgUrl: {
      type: String,
      required: [true, 'Please provide a image for this song'],
    },

    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Song || mongoose.model('Song', SongSchema);
