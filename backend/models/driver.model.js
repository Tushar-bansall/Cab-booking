import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password : {
        type: String,
        required : true,
        minlength: 6
    },
    phoneNo : {
        type : String,
        required: true,
        unique: true,
        length: 10
    },
    license : {
        type: String,
        required: true
    },
    vehicle : {
        type: String,
        required: true
    },
    location : {
        type : {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type : [Number],
            default:[0,0]
        }
    }
},{
    timestamps: true
})

driverSchema.index({location : '2dsphere'})

const Driver = mongoose.model("Driver",driverSchema)

export default Driver