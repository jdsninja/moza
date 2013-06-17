/*global module:false*/
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		uglify: {
			my_target: {
				files: {
					'js/global.min.js': [
						'components/jquery/jquery.min.js',
						'components/jquery-tmpl/jquery.tmpl.min.js',
						'components/underscore/underscore-min.js'
					]
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Default task.
	grunt.registerTask('default', 'uglify');
};
