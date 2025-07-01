'use strict';

/**
 * program-header service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::program-header.program-header');
