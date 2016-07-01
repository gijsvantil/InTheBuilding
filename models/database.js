// Container object
let db = {
	mod: {}
}

// requiring Sequelize
const Sequelize = require( 'sequelize' )
// establishing database connection
db.conn = new Sequelize('inthebuilding', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
});

// Models
// mainuser
db.coworker = db.conn.define( 'coworker', {
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING,
	email: Sequelize.STRING,
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	location: Sequelize.STRING
})

// Relationships

// Database synchronization
db.conn.sync( {'force': false} ).then( 
	() => { 
		console.log ( 'Sync succeeded' )
	},
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db