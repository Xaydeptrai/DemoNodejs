const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('store','root', '', {
    host: 'localhost', // Địa chỉ máy chủ SQL Server của bạn
    dialect: 'mysql',
    logging:false
});

const connectionDatabase = async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        } finally {
            await sequelize.close(); // Đóng kết nối sau khi kiểm tra xong
        }
}

connectionDatabase()

