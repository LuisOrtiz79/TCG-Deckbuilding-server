const { model, Schema, default: mongoose } = require('mongoose');

const deckSchema = new Schema(
    {
        name: { type: String },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        game: { type: String },
        main: [{
            type: mongoose.Types.ObjectId,
            ref: 'YugiohCards'
        }],
        extra: [{
            type: mongoose.Types.ObjectId,
            ref: 'YugiohCards'
        }],
        side: [{
            type: mongoose.Types.ObjectId,
            ref: 'YugiohCards'
        }]
    },{
        timestamps: true
    }
)

module.exports = model('Deck', deckSchema);