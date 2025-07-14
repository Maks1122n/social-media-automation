const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get all videos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const videos = await prisma.video.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        filename: true,
        title: true,
        description: true,
        hashtags: true,
        duration: true,
        size: true,
        url: true,
        thumbnailUrl: true,
        aiGenerated: true,
        status: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ videos });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Upload video (placeholder)
router.post('/upload', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Video upload endpoint - coming soon', 
    service: 'Videos Management',
    status: 'under_development'
  });
});

// Generate video with AI (placeholder)
router.post('/generate', authenticateToken, (req, res) => {
  res.json({ 
    message: 'AI video generation endpoint - coming soon', 
    service: 'AI Video Generator',
    status: 'under_development'
  });
});

// Delete video
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const video = await prisma.video.deleteMany({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (video.count === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

module.exports = router; 