const { model, Schema, default: mongoose } = require('mongoose');

const gameSchema = new Schema(
    {
        name: { type: String },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        deck: {
            type: mongoose.Types.ObjectId,
            ref: 'Deck'
        }
    },{
        timestamps: true
    }
)

module.exports = model('Game', gameSchema);