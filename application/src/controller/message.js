const { Message } = require("../../models");

module.exports = {
    find() {
    // TODO add filter once login/signup ready
        return (req, res, next) => {
            Message.findAll().then(messages => {
                res.locals.messages = toJSON(messages);
                next();
            });
        };
    },
    create() {
        return (req, res, next) => {
            Message.create({
                from: req.body.buyerName,
                to: req.body.sellerName,
                item: req.query.item,
                message: req.body.contactDetails,
                dealLocation: req.body.contactLocation,
                dealTime: req.body.contactTime
            }).then(item => {
                next();
            });
        };
    }
};

function toJSON(item) {
    if (Array.isArray(item)) {
        return item.map(toJSON);
    }

    return item.get({ plain: true });
}