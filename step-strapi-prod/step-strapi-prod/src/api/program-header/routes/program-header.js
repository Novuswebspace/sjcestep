'use strict';

/**
 * program-header router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::program-header.program-header');
