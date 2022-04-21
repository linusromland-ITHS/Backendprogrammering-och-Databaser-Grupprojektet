const express = require('express');
const router = express.Router();

router.use('/language', require('./language.routes'));

router.get('/', async (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the API',
    });
});

module.exports = router;
