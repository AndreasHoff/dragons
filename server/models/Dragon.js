const mongoose = require('mongoose');

const DragonsSchema = new mongoose.Schema({
    name: {
        type: 'string',
    },
    wood: {
        type: 'string',
    },
    fish: {
        type: 'string',
    },
    iron: {
        type: 'string',
    },
    gatheringTime: {
        type: 'string',
    },
    dragonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dragon'
    },
});

module.exports = mongoose.model('Dragon', DragonsSchema);

