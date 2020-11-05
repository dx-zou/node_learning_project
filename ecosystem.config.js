module.exports = {
	apps: [
		{
			name: 'BLOG-APP',
			script: 'app.js',
			watch: '.',
			env: {
				COMMON_VARIABLE: 'true',
			},
			// Environment variables injected when starting with --env production
			// http://pm2.keymetrics.io/docs/usage/application-declaration/#switching-to-different-environments
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],

	deploy: {
		production: {
			user: 'root',
			host: '47.95.1.121',
			ref: 'origin/master',
			repo: 'git@github.com:dx-zou/node_learning_project.git',
			path: '/usr/local/www',
			ssh_options: 'StrictHostKeyChecking=no',
			'pre-deploy-local': '',
			'post-deploy':
				'cnpm install && pm2 reload ecosystem.config.js --env production',
			env: {
				NODE_ENV: 'production',
			},
		},
	},
};
