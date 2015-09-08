module.exports = function(config) {
    config.set({

        browsers: ['Chrome'],
        port: 9999,
        // list of files / patterns to load in the browser
        files: [
            '../scripts/**/*.js',
            '../tests/**/*test.js'
        ]
    });
};