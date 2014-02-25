"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libraryDir: 'assets'
	};

	grunt.initConfig({
		creds: grunt.file.readJSON('server_creds.json'),
		paths: paths,

		concat: {
			options: {
				separator: ';'
			},

			dist: {
				src: ['<%= paths.libraryDir %>/js/libs/*.js', '<%= paths.libraryDir %>/js/scripts.js'],
				dest: '<%= paths.libraryDir %>/js/scripts.concat.js'
			}
		},

		autoprefixer: {
			dist: {
				src: '<%= paths.libraryDir %>/css/styles.css',
				dest: '<%= paths.libraryDir %>/css/styles.css'
			}
		},

		sass: {
			options: {
				sourceComments: 'map'
			},
			dist: {
				files: {
					'<%= paths.libraryDir %>/css/styles.css':'<%= paths.libraryDir %>/scss/styles.scss'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},

			sass: {
				options: {
					livereload: false
				},
				files: ['<%= paths.libraryDir %>/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},

			css: {
				files: ['<%= paths.libraryDir %>/css/styles.css'],
			},

			php: {
				files: ['site/**/*.php']
			},

			txt: {
				files: ['content/**/*.txt']
			},

			js: {
				files: ['<%= paths.libraryDir %>/js/**/*.js', '!<%= paths.libraryDir %>/js/scripts.concat.js'],
				tasks: ['concat']
			}
		},

		connect: {
			server: {
				options: {
					hostname :''
				}
			}
		},

        rsync: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'server_creds.json'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            staging: {
                options: {
                    dest: "<%= creds.path.staging %>",
                    host: "<%= creds.user %>@<%= creds.ip %>"
                }
            },
            prod: {
                options: {
                    dest: "<%= creds.path.prod %>",
                    host: "<%= creds.user %>@<%= creds.ip %>"
                }
            }
        }

	});

	grunt.registerTask('build', ['sass', 'autoprefixer', 'concat']);
	grunt.registerTask('default', ['build', 'connect', 'watch']);
};