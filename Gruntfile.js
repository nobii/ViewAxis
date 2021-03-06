module.exports = function (grunt) {
    var config = {}, build = [];


    // basic
    {
        config.pkg =  grunt.file.readJSON('package.json');

        grunt.loadNpmTasks('grunt-contrib-watch');
        config.watch = {};
    }


    // js
    {
        grunt.loadNpmTasks('grunt-auto-deps');
        config.auto_deps = {
            dev: {
                scripts: ['ViewAxis'],
                loadPath: ['src/js/*.js', 'src/js/lib/*.js'],
                locate: {
                }
            }
        };

        config.watch.js = {
            files: ['src/js/*.js', 'src/js/**/*.js'],
            tasks: ['auto_deps:dev']
        };

        build.push('auto_deps:dev');
    }


    // css
    {
        grunt.loadNpmTasks('grunt-contrib-compass');

        config.compass =  {
            dev: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'css',
                    imagesDir: 'img',
                    javascriptsDir: 'js',
                    environment: 'development'
                }
            }
        };

        config.watch.css = {
            files: ['src/sass/*.scss', 'src/sass/**/*.scss'],
            tasks: ['compass:dev']
        };

        build.push('compass:dev');
    }


    // ejs


    // test
    {
        grunt.loadNpmTasks('grunt-mocha-html');
        grunt.loadNpmTasks('grunt-mocha-phantomjs');

        config.mocha_html =  {
            all: {
                src   : [ 'js/ViewAxis.js' ],
                test  : [ 'test/*-test.js' ],
                assert : 'chai'
            }
        };
        build.push('mocha_html');

        config.mocha_phantomjs =  {
            all: [ 'test/*.html' ]
        };

        config.watch.test = {
            files: ['test/*-test.js'],
            tasks: ['mocha_phantomjs']
        };;
        config.watch.js.tasks.push('mocha_html');

        grunt.registerTask('test', ['mocha_phantomjs']);

    }
    // 


    // server
    {
        grunt.loadNpmTasks('grunt-koko');
        config.koko = {
            dev: {
                openPath: '/'
            }
        };

        grunt.registerTask('server', ['koko:dev']);
    }


    // init
    grunt.initConfig(config);
    grunt.registerTask('build', build);
    grunt.registerTask('default', ['build']);
};