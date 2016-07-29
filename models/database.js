// Container object
let db = {
	mod: {}
};

// requiring Sequelize
const Sequelize = require( 'sequelize' )
console.log(process.env.MYSQL_USER)
// establishing database connection
db.conn = new Sequelize('postgres://lqrzxrgxapgqmc:R71W3iKPxR2_hHCdi0JLfECS-1@ec2-54-228-189-127.eu-west-1.compute.amazonaws.com:5432/d4bhlepnvnrpfk' {
	// host: 'localhost',
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
});

db.post = db.conn.define ('post',{
	body: Sequelize.TEXT,
	location: Sequelize.TEXT
});

db.comment = db.conn.define ('comment',{
	body: Sequelize.TEXT
});


// Relationships
// relate user to many blogposts
db.coworker.hasMany(db.post);
db.post.belongsTo(db.coworker);
// relate user and blogpost to many comments
db.post.hasMany(db.comment);
db.coworker.hasMany(db.comment);
db.comment.belongsTo(db.post);
db.comment.belongsTo(db.coworker);

// Database synchronization
db.conn.sync( {'force': false} ).then( 
	() => { 
		console.log ( 'Sync succeeded' )
	},
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db