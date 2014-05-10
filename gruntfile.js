'use strict';

module.exports = function (grunt) {

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// paths configuration
	var pathConfig = {
		dev: 'dev',
		dist: 'dist',
		build: 'build'
	};

	// grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: pathConfig,

		// clean files
		clean: {
			dist: {
				src: ['<%= config.dist %>/*']
			},

			build: {
				src: ['<%= config.build %>/*']
			}
		},

		// copy files
		copy: {
			dist: {
				files: [{
					expand: true,
					// dot: true,
					cwd: '<%= config.dev %>/assets/',
					src: ['**'],
					dest: '<%= config.dist %>/assets/'
				}]
			}
		},

		// sass files
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= config.dist %>/assets/css/styles.css': '<%= config.dev %>/vendor/sass/styles.scss'
				}
			},

			dev: {
				options: {
					style: 'expanded',
					debugInfo: true
				},
				files: {
					'<%= config.dev %>/assets/css/styles.css': '<%= config.dev %>/vendor/sass/styles.scss'
				}
			}
		},

		// html min
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dev %>/',
					src: ['*.html', '**/*.html'],
					dest: '<%= config.dist %>/'
				}]
			}
		},

		// uglify
		uglify: {
			dist: {
				options: {
					mangle: true,
					compress: {
						drop_console: true
					}
				},
				files: {
					'<%= config.dist %>/assets/js/application.js': ['<%= config.dev %>/assets/js/application.js']
				}
			},

			dev: {
				options: {
					mangle: false,
					compress: false,
					beautify: true,
					preserveComments: 'all'
				},
				files: {
					'<%= config.dev %>/assets/js/application.js': [
						'<%= config.dev %>/vendor/js/core/Main.js'
					]
				}
			}
		},

		// make a zipfile
		compress: {
			build: {
				options: {
					archive: '<%= config.build %>/<%= pkg.name %>.zip'
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>/',
					src: ['**'],
					dest: '<%= pkg.name %>'
				}]
			}
		},

		// watch
		watch: {
			css: {
				files: '<%= config.dev %>/vendor/sass/*.scss',
				tasks: ['sass:dev']
			},
			js: {
				files: '<%= config.dev %>/vendor/js/**/*.js',
				tasks: ['uglify:dev']
			}
		},

		// FTP deployment
		// make sure you have .ftppass configured.
		'ftp-deploy': {
			build: {
				auth: {
					host: 'ftp.yoursite.com',
					port: 21,
					authKey: 'key1'
				},
				src: '<%= config.dist %>/',
    			dest: '/path/to/destination/folder',
				exclusions: [
					'.DS_Store',
					'Thumbs.db',
					'.git',
					'.gitignore',
					'.sublime-project',
					'.sublime-workspace',
					'README.md'
				]
			}
		}

	});


	// tasks
	grunt.registerTask('default', ['watch']);

	grunt.registerTask('dist', [
		'clean:dist',
		'copy:dist',
		'sass:dist',
		'htmlmin:dist',
		'uglify:dist'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'clean:build',
		'copy:dist',
		'sass:dist',
		'htmlmin:dist',
		'uglify:dist',
		'compress:build'
	]);

	grunt.registerTask('deploy', [
		'clean:dist',
		'clean:build',
		'copy:dist',
		'sass:dist',
		'htmlmin:dist',
		'uglify:dist',
		'ftp-deploy:build'
	]);
};