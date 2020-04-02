module.exports = function (errors) {
    let msg = []
    errors.forEach(err => {
        msg.push(err)
    });
    return {msg}
}