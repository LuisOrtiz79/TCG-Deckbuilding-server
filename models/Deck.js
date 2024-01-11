const { model, Schema, default: mongoose } = require('mongoose');

const deckSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        game: { type: String },
        name: { type: String },
        cards: {
            type: mongoose.Types.ObjectId,
            ref: 'Cards'
        }
    },{
        timestamps: true
    }
)

module.exports = model('Deck', deckSchema);