'use strict';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-crud-template';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/crud-template';
exports.PORT = process.env.PORT || 8080;