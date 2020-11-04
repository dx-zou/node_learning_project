module.exports = {
	apps: [
		{
			script: 'index.js',
			watch: '.',
		},
		{
			script: './service-worker/',
			watch: ['./service-worker'],
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
				'nvm use v12.19.0 && cnpm install && pm2 reload ecosystem.config.js --env production',
			env: {
				NODE_ENV: 'production',
			},
		},
	},
};
