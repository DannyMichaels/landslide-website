import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this song'],
    },

    audioSrc: {
      type: String,
      required: [true, 'Please provide a audioSrc for this song'],
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

    bpm: {
      type: Number,
    },

    isSingle: {
      // is the song a part of an album or a single release?
      type: Boolean,
      default: false,
    },

    musicStoreUrls: {
      type: [
        {
          spotify: {
            type: String,
          },

          appleMusic: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Song || mongoose.model('Song', SongSchema);
