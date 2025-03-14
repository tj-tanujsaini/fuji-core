const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isValidUsername(value) {
                    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                        throw new Error("Username can only contain letters, numbers, and underscores (_), and cannot have spaces.");
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'users',
        schema: 'public',
        timestamps: true, // Enable createdAt and updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            beforeCreate: async (user) => {
                const timestamp = Date.now(); // Current time in milliseconds
                user.created_at = timestamp;
                user.updated_at = timestamp;
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10); // Hash the password
                }
            },
            beforeUpdate: async (user) => {
                user.updated_at = Date.now(); // Update timestamp on modification
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10); // Re-hash if changed
                }
            }
        },
        defaultScope: {
            attributes: { exclude: ['password'] } // Exclude password by default
        }
    });
    return User;
};
