'use strict';

/**
 * news-blog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-blog.news-blog');
