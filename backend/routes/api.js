const express = require('express');
const router = express.Router();

router.use('/currency', require('./currency.routes'));
router.use('/language', require('./language.routes'));
router.use('/religion', require('./religion.routes'));
router.use('/city', require('./city.routes'));

router.get('/', async (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the API',
    });
});

module.exports = router;
