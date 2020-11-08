module.exports = {
	apps: [
		{
			name: 'BLOG-APP',
			script: './bin/www',
			instances: 1, // 开启的进程个数
			autorestart: true, // 自动重启
			watch: true, //监听文件变化，true则开启监听，文件若变化则会触发重启
			max_memory_restart: '1G', // 允许此项目最大运行内存
			env: {
				COMMON_VARIABLE: 'true',
			},
			// Environment variables injected when starting with --env production
			// http://pm2.keymetrics.io/docs/usage/application-declaration/#switching-to-different-environments
			env_production: {
				NODE_ENV: 'production', // 生产环境
			},
			ignore_watch: [
				// 不⽤监听的⽂件
				'node_modules', // 安装依赖的文件夹
				'logs', // 日志文件
				'public', // 静态文件
			],
			error_file: './logs/app-err.log', // 错误⽇志⽂件存放路径
			out_file: './logs/app-out.log',
			log_date_format: 'YYYY-MM-DD HH:mm:ss', // 给每⾏⽇志标记⼀个时间
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
				'git pull origin master && cnpm install && pm2 reload ecosystem.config.js --env production',
			env: {
				NODE_ENV: 'production',
			},
		},
	},
};
