const { model, Schema } = require('mongoose');

const YugiohCardsSchema = new Schema(
    {
        id: { type: Number },
        name: { type: String },
        type: { type: String },
        frameType: { type: String },
        desc: { type: String },
        race: { type: String },
        ygoprodeck_url: { type: String },
        card_sets: [{
            set_name: { type: String },
            set_code: { type: String },
            set_rarity: { type: String },
            set_rarity_code: { type: String },
            set_price: { type: String }
        }],
        card_images: [{
            id: { type: Number },
            image_url: { type: String },
            image_url_small: { type: String },
            image_url_cropped: { type: String }
        }],
        card_prices: [{
            cardmarket_price: { type: String },
            tcgplayer_price: { type: String },
            ebay_price: { type: String },
            amazon_price: { type: String },
            coolstuffinc_price: { type: String }
        }]
    }
);

module.exports = model('YugiohCards', YugiohCardsSchema);