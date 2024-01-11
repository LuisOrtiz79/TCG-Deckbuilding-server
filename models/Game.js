const { model, Schema, default: mongoose } = require('mongoose');

const gameSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        name: { type: String },
        deck: {
            type: mongoose.Types.ObjectId,
            ref: 'Deck'
        }
    },{
        timestamps: true
    }
)

module.exports = model('Game', gameSchema);