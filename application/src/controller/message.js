const { Message } = require("../../models");

module.exports = {
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