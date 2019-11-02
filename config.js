'use strict';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-demo-database';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/demo-database';
exports.PORT = process.env.PORT || 8080;
