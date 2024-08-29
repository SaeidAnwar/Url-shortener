mongo-url-parser
===============

Simple parser for mongodb connection strings.

Usage
-------

```
npm install --save mongo-url-parser
const parser = require('mongo-url-parser');
const url = 'mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin';
const parsed = parser(url);
```

parsed now contains the following

```
{
  usingSrv: false,
  auth: { user: 'myDBReader', password: 'D1fficultP@ssw0rd' },
  server_options: { socketOptions: {} },
  db_options: {
    read_preference_tags: null,
    authSource: 'admin',
    read_preference: 'primary'
  },
  rs_options: { socketOptions: {} },
  mongos_options: {},
  dbName: 'admin',
  servers: [ { host: 'mongodb0.example.com', port: 27017 } ]
}
```

This is based on the 
[connection string parser](https://github.com/mongodb/node-mongodb-native/blob/2.0/lib/url_parser.js) 
from the [mongodb driver](https://github.com/mongodb/node-mongodb-native).

License
-------

Apache 2.0
