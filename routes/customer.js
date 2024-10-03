const express = require('express')
const utils = require('../utils/util')
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer management APIs
 */

/**
 * @swagger
 * /api/customer:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   isValid:
 *                      type: boolean
 *                   response:
 *                      $ref: '#/components/schemas/Customers'
 */
router.get('/', (req, res) => {
    const response = [
        { id: '1', name: `This is customer: 1 API` },
        { id: '2', name: `This is customer: 2 API` },
        { id: '3', name: `This is customer: 3 API` }
    ];

    res.json(utils.unifiedResponse(response))
})

/**
 * @swagger
 * /api/customer/{id}:
 *   get:
 *     summary: Retrieve a single record of customer
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Customer ID
 *     responses:
 *       200:
 *         description: An object of customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   isValid:
 *                      type: boolean
 *                   response:
 *                      $ref: '#/components/schemas/Customer'
 */
router.get('/:id', (req, res) => {
    res.json(utils.unifiedResponse({ id: req.params.id, name: `This is customer: ${req.params.id} API` }))
})

module.exports = router; 