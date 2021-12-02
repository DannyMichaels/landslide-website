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

    recordLabel: {
      type: String,
      required: false,
    },

    _album: {
      ref: 'Album',
      type: mongoose.Schema.Types.ObjectId,
    },

    artist: {
      type: String,
      default: 'Landslide',
    },

    length: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Song || mongoose.model('Song', SongSchema);
