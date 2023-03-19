module.exports = {
    apps: [
        {
            name: 'my-app',
            script: './src/server.js',
            instances: 'max',
            exec_mode: 'cluster',
            watch: false,
            env: {
                NODE_ENV: 'development',
            },
        },
    ]
}

//
//production