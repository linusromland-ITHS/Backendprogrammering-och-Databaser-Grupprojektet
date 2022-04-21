//Dependencies import
const express = require('express');
const router = express.Router();
const LanguageModel = require('../models/Language');

/**
 * @api {get} /api/language/ Returns all languages
 */
router.get('/', async (req, res) => {
    try {
        const languages = await LanguageModel.findAll();
        res.json({
            success: true,
            error: '',
            data: languages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {post} /api/language/ Create a new language
 */
router.post('/', async (req, res) => {
    if (
        (!req.body.languageName && req.body.languageName.length < 1) ||
        !req.body.languageNativeSpeakers ||
        req.body.languageTotalSpeakers
    ) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid languageName, languageNativeSpeakers and languageTotalSpeakers.',
        });
    }

    try {
        const language = await LanguageModel.create({
            languageName: req.body.languageName,
            languageNativeSpeakers: req.body.languageNativeSpeakers,
            languageTotalSpeakers: req.body.languageTotalSpeakers,
        });
        res.status(201).json({
            success: true,
            error: '',
            data: language,
        });
    } catch (error) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The language ${req.body.languageName} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
