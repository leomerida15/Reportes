export const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';

export const host = prod ? 'http://localhost:5000/' : 'http://localhost:5000/';
