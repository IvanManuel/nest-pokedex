import { mongo } from "mongoose";


export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    // mongoDB: process.env.MONGO_DB || 'mongodb://localhost:27017/nest-pokemon',
    mongoDB: process.env.MONGO_DB,
    port: process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,
})
