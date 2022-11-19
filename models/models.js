const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER},
    role: {type: DataTypes.ENUM('user', 'admin')}
})

const Tasks = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    task: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    textSolution: {type: DataTypes.STRING},
    imageSolution: {type: DataTypes.STRING}
})

const MonthlyTasks = sequelize.define('monthly_tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CompletedTasks = sequelize.define('completed_tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userTextSolution: {type: DataTypes.STRING},
    userImageSolution: {type: DataTypes.STRING}
})

const ProposedTasks = sequelize.define('proposed_tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    task: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    textSolution: {type: DataTypes.STRING},
    imageSolution: {type: DataTypes.STRING}
})

const Videos = sequelize.define('videos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: DataTypes.STRING}
})

Users.hasMany(ProposedTasks)
ProposedTasks.belongsTo(Users)

Tasks.hasOne(MonthlyTasks)
MonthlyTasks.belongsTo(Tasks)

Tasks.hasOne(Videos)
Videos.belongsTo(Tasks)

Tasks.hasMany(CompletedTasks)
CompletedTasks.belongsTo(Tasks)

Users.hasMany(CompletedTasks)
CompletedTasks.belongsTo(Users)

module.exports = {
    Users,
    Tasks,
    MonthlyTasks,
    CompletedTasks,
    ProposedTasks,
    Videos
}