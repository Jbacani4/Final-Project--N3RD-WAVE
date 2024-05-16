//404

const nA = (req, res, next) => {
    const err = new Error(`Not found - ${req.originalUrl}`)
    res.status(404);
    next(err);

}

const errHandler = (err, req, res, next) => {
    if(res.headerSent) {
        return next(err)
    }
    res.status(err.code || 500).json({
        message: err.message || "unknown error has occured"
    })
}

module.exports= {nA, errHandler}