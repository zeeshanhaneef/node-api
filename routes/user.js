const express = require('express')
const utils = require('../utils/util')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   isValid:
 *                      type: boolean
 *                   response:
 *                      $ref: '#/components/schemas/Users'
 */
router.get('/', (req, res) => {
    const response = [
        { id: '1', name: `This is user: 1 API` },
        { id: '2', name: `This is user: 2 API` },
        { id: '3', name: `This is user: 3 API` }
    ];

    res.json(utils.unifiedResponse(response))
})

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve a single record of user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: An object of user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   isValid:
 *                      type: boolean
 *                   response:
 *                      $ref: '#/components/schemas/User'
 */
router.get('/:id', (req, res) => {
    setTimeout(() => {
        res.json(utils.unifiedResponse({ id: req.params.id, name: `This is user: ${req.params.id} API` }))
    }, 1000);
})

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Post a single record of user
 *     tags: [User]
 *     description: API to create a new user with a JSON request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: An object of received payload with a message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   isValid:
 *                      type: boolean
 *                   response:
 *                      $ref: '#/components/schemas/User'
 */
router.post('/', (req, res) => {
    const payload = req.body;

    res.json(utils.unifiedResponse({ message: `Here is the payload we received`, payload : payload }))
})
module.exports = router; 