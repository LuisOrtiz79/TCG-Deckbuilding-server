const { model, Schema, default: mongoose } = require('mongoose');

const commentsSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        deck: {
            type: mongoose.Types.ObjectId,
            ref: 'Deck'
        },
        comments: { types: String }
    },{
        timestamps: true
    }
)

module.exports = model('Comments', commentsSchema);