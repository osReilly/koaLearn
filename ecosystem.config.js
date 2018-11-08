module.exports = {
  apps : [{
    name: 'API',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '116.62.244.133',
      ref  : 'origin/master',
      repo : 'git@github.com:osReilly/koaLearn.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

// module.exports = {
//   apps: [{
//     name: "app",
//     script: "index.js"
//   }],
//   deploy: {
//     // "production" is the environment name
//     production: {
//       // SSH key path, default to $HOME/.ssh
//       key: "D:/nodeko.pem",
//       // SSH user
//       user: "root",
//       // SSH host
//       host: ["116.62.244.133"],
//       // SSH options with no command-line flag, see 'man ssh'
//       // can be either a single string or an array of strings
//       ssh_options: "StrictHostKeyChecking=no",
//       // GIT remote/branch
//       ref: "origin/master",
//       // GIT remote
//       repo: "git@github.com:osReilly/koaLearn.git",
//       // path in the server
//       path: "/var/www/my-repository",
//       // // Pre-setup command or path to a script on your local machine
//       // pre-setup: "apt-get install git ; ls -la",
//       // // Post-setup commands or path to a script on the host machine
//       // // eg: placing configurations in the shared dir etc
//       // post-setup: "ls -la",
//       // // pre-deploy action
//       // pre-deploy-local: "echo 'This is a local executed command'",
//       // // post-deploy action
//       // post-deploy: "npm install"
//     }
//   }
// }
