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
        !req.body.languageTotalSpeakers
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

/**
 * @api {put} /api/language/ Edits the language with the specified id
 */
router.put('/', async (req, res) => {
    const language = await LanguageModel.findByPk(req.body.languageID);
    if (!language) {
        return res.status(404).json({
            success: false,
            error: 'Language not found.',
        });
    }

    if (
        !req.body.languageName &&
        req.body.languageName.length < 1 &&
        !req.body.languageNativeSpeakers &&
        !req.body.languageTotalSpeakers
    ) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid languageName, languageNativeSpeakers or languageTotalSpeakers.',
        });
    }

    try {
        const updatedLanguage = await language.update({
            languageName: req.body.languageName,
            languageNativeSpeakers: req.body.languageNativeSpeakers,
            languageTotalSpeakers: req.body.languageTotalSpeakers,
        });
        res.json({
            success: true,
            error: '',
            data: updatedLanguage,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The language ${req.body.languageName} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/language/ Delete a language
 */
router.delete('/', async (req, res) => {
    if (!req.body.languageID) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a language ID',
        });
    }

    try {
        // Delete country from database
        const language = await LanguageModel.destroy({
            where: { languageID: req.body.languageID },
        });

        if (language === 0) {
            return res.status(404).json({
                success: false,
                error: 'Language not found',
            });
        } else {
            return res.status(200).json({
                success: true,
                error: 'Language deleted',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
