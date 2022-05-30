module.exports = {
	apps: [{
		name: 'app',
		script: 'dist/main.js',
		instances: 0,
		exec_mode: 'cluster',
		wait_ready: false,
		listen_timeout: 50000,
		kill_timeout: 5000,
	// error_file: 'err.log',
  	// out_file: 'out.log',
	// log_file: 'combined.log',
	// merge_logs: true,
	}]
}