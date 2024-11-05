import {sequelize} from "../util/database.mjs" 
import { Sequelize, DataTypes } from 'sequelize';
const User=sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    course_name:{
        type:DataTypes.STRING
    },
    full_name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    enrolment_date:{
        type:DataTypes.STRING
    },
    completed:{
        type:DataTypes.STRING
    },
    notification_date:{
        type:DataTypes.STRING
    },
    last_reminder_date:{
        type:DataTypes.STRING
    }
},
{
    tableName: 'report_data',
    timestamps: false, 
},
);

export default User;