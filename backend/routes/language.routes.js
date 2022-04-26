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
    const { name, nativeSpeakers, totalSpeakers } = req.body;

    if ((!name && name.length < 1) || !nativeSpeakers || !totalSpeakers) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid name, nativeSpeakers and totalSpeakers.',
        });
    }

    try {
        const language = await LanguageModel.create({
            languageName: name,
            languageNativeSpeakers: nativeSpeakers,
            languageTotalSpeakers: totalSpeakers,
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
                error: `The language ${name} already exists.`,
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
    const { id, name, nativeSpeakers, totalSpeakers } = req.body;

    const language = await LanguageModel.findByPk(id);
    if (!language) {
        return res.status(404).json({
            success: false,
            error: 'Language not found.',
        });
    }

    if (!name && name.length < 1 && !nativeSpeakers && !totalSpeakers) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid name, nativeSpeakers or totalSpeakers.',
        });
    }

    try {
        const updatedLanguage = await language.update({
            languageName: name,
            languageNativeSpeakers: nativeSpeakers,
            languageTotalSpeakers: totalSpeakers,
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
                error: `The language ${name} already exists.`,
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
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a language ID',
        });
    }

    try {
        // Delete country from database
        const language = await LanguageModel.destroy({
            where: { languageID: id },
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
