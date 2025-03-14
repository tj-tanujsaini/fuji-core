const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        expense_date: {
            type: DataTypes.BIGINT,
            allowNull: false,
            get() {
                return Number(this.getDataValue('expense_date')); // Ensure it's returned as a number
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'expenses',
        schema: 'public',
        timestamps: true, // Enable createdAt and updatedAt
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
    return Expense;
}