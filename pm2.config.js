module.exports = {
    apps: [
        {
            name: 'my-app',
            script: './dist/server.js',
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