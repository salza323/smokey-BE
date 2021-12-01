module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      // TODO, add db name once configured
      filename: './data/'DBNAMEHERE'.db3',
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },
};