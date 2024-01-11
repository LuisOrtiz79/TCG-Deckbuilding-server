const { model, Schema, default: mongoose } = require('mongoose');

const deckSchema = new Schema(
    {
        name: { type: String },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        game: {
            type: mongoose.Types.ObjectId,
            ref: 'Game'
        },
        cards: [{
            type: mongoose.Types.ObjectId,
            ref: 'YugiohCards'
        }]
    },{
        timestamps: true
    }
)

module.exports = model('Deck', deckSchema);