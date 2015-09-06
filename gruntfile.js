// Обязательная обёртка
module.exports = function(grunt) {
    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            js: {
                src: [
                    'bower_components/**/*min.js',  // Все JS-файлы в папке
                    'scripts/**/*.js'
                ],
                dest: 'build/temp/scripts.js'
            },
            css: {
                src: [
                    'styles/**/*.css'
                ],
                dest: 'build/temp/styles.css'
            },
            js_dev: {
                src: [
                    'bower_components/**/*min.js',  // Все JS-файлы в папке
                    'scripts/**/*.js'
                ],
                dest: 'build/scripts.js'
            },
            css_dev: {
                src: [
                    'styles/**/*.css'
                ],
                dest: 'build/styles.css'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.js': '<%= concat.js.dest %>'
                }
            }
        },
        cssmin: {
            main: {
                files: {
                    'build/styles.css': '<%= concat.css.dest %>'
                }
            }
        },
        watch: {
            js: {
                files: ['scripts/*.js'],
                tasks: ['concat:js_dev']
            }
        },
        clean: ["build/**/*.js", "build/**/*.css"]
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Задача по умолчанию
    grunt.registerTask('default', ['clean', 'concat:js', 'concat:css', 'uglify', 'cssmin']);

    grunt.registerTask('build', function() {
        var release = grunt.option('release');
        var tasks = release ? ['default'] : ['clean', 'concat:js_dev', 'concat:css_dev', 'watch.js'];
        grunt.task.run(tasks);
    });
};