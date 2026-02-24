const express = require('express');
const router = express.Router();
const { searchData } = require('../data/mockData');

/**
 * Search API endpoint
 * GET /api/search?q=<query>&field=<field>&limit=<limit>
 * 
 * Query parameters:
 * - q: Search query (required)
 * - field: Field to search in (optional: 'title', 'description', 'tags', 'all')
 * - limit: Maximum number of results to return (optional, default: 10)
 */
router.get('/search', (req, res) => {
  try {
    const { q, field = 'all', limit = 10 } = req.query;

    // Validate query parameter
    if (!q || q.trim() === '') {
      return res.status(400).json({
        error: 'Search query is required',
        message: 'Please provide a search query using the "q" parameter'
      });
    }

    const query = q.toLowerCase().trim();
    const maxLimit = parseInt(limit, 10);

    // Perform search
    const results = searchData.filter(item => {
      if (field === 'all') {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
        );
      } else if (field === 'title') {
        return item.title.toLowerCase().includes(query);
      } else if (field === 'description') {
        return item.description.toLowerCase().includes(query);
      } else if (field === 'tags') {
        return item.tags.some(tag => tag.toLowerCase().includes(query));
      }
      return false;
    });

    // Apply limit
    const limitedResults = results.slice(0, maxLimit);

    // Return response
    res.json({
      query: q,
      field: field,
      count: limitedResults.length,
      total: results.length,
      results: limitedResults
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while processing your search'
    });
  }
});

module.exports = router;
