module.exports = {
    errorHandler: function(err,req,res,next) {
        const status = err.status || 500
        const message = err.message || 'Internal server error'

        if (err.name === 'SequelizeValidationError') {
            let msgArr = []

            err.errors.forEach(el => {
                msgArr.push(el.message)
            });

            res.status(400).json({
                message: msgArr.join(', ')
            })
        } 
        else {
            res.status(status).json({
                message
            })
        }
    }
}