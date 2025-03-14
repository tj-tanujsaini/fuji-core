module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created_at: {
            type: DataTypes.BIGINT,
            allowNull: false,
            get() {
                return Number(this.getDataValue('created_at')); // Ensure it's returned as a number
            }
        },
        updated_at: {
            type: DataTypes.BIGINT,
            allowNull: false,
            get() {
                return Number(this.getDataValue('updated_at')); // Ensure it's returned as a number
            }
        }
    }, {
        tableName: 'categories',
        schema: 'public',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            beforeCreate: (user) => {
                const timestamp = Date.now(); // Current time in milliseconds
                user.created_at = timestamp;
                user.updated_at = timestamp;
            },
            beforeUpdate: (user) => {
                user.updated_at = Date.now(); // Update timestamp on modification
            }
        }
    });

    return Category;
};
