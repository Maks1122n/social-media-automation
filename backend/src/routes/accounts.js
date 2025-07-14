const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const router = express.Router();
const prisma = new PrismaClient();

// Validation schema
const createAccountSchema = Joi.object({
  username: Joi.string().required(),
  platform: Joi.string().valid('INSTAGRAM', 'YOUTUBE', 'TIKTOK', 'TWITTER').required(),
  password: Joi.string().required(),
  proxy: Joi.string().optional(),
  postsPerDay: Joi.number().min(1).max(10).default(3),
  intervalHours: Joi.number().min(1).max(24).default(4)
});

// Get all accounts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        username: true,
        platform: true,
        status: true,
        postsPerDay: true,
        intervalHours: true,
        lastPost: true,
        proxy: true,
        adspowerId: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ accounts });
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

// Create account
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { error, value } = createAccountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, platform, password, proxy, postsPerDay, intervalHours } = value;

    // Check if account already exists
    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: req.user.id,
        username,
        platform
      }
    });

    if (existingAccount) {
      return res.status(400).json({ error: 'Account already exists' });
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create account
    const account = await prisma.account.create({
      data: {
        userId: req.user.id,
        username,
        platform,
        password: encryptedPassword,
        proxy,
        postsPerDay,
        intervalHours
      },
      select: {
        id: true,
        username: true,
        platform: true,
        status: true,
        postsPerDay: true,
        intervalHours: true,
        proxy: true,
        createdAt: true
      }
    });

    res.status(201).json({
      message: 'Account created successfully',
      account
    });
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Update account status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['ACTIVE', 'PAUSED', 'BLOCKED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const account = await prisma.account.updateMany({
      where: {
        id,
        userId: req.user.id
      },
      data: { status }
    });

    if (account.count === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ message: 'Account status updated successfully' });
  } catch (error) {
    console.error('Update account status error:', error);
    res.status(500).json({ error: 'Failed to update account status' });
  }
});

// Delete account
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const account = await prisma.account.deleteMany({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (account.count === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router; 