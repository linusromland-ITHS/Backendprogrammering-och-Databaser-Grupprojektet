const express = require('express');
const router = express.Router();

router.use('/city', require('./city.routes'));
router.use('/country', require('./country.routes'));
router.use('/currency', require('./currency.routes'));
router.use('/language', require('./language.routes'));
router.use('/religion', require('./religion.routes'));

router.get('/', async (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the API',
    });
});

module.exports = router;
