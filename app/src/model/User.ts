import mongoose,{Schema,Document} from "mongoose"


// Define the schema for the user document
export interface Message extends Document {
  content: string;
  createdAt : Date
}

const messageSchema:Schema<Message> = new Schema({
  content:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required:true
  }
})


export interface User extends Document {
 username:string;
 email:string;
 password:string;
 verifyCode:string;
 verifyCodeExpiry:Date;
 isVerified:boolean;
 isAcceptingMessage:boolean;

 messages: Message[];
}




const UserSchema:Schema<User> = new Schema({
  username:{
    type: String,
    required: [true,"Username is required"],
    unique: true,
    trim: true

  },
  email:{
    type: String,
    required: [true,"Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Invalid email format"]
  },
  password:{
    type: String,
    required: [true,"Password is required"],

  },
  verifyCode:{
    type: String,
    required: [true,"Verify code is required"]
  },
  verifyCodeExpiry:{
    type: Date,
    required: [true,"Verify code expiry is required"]
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  isAcceptingMessage:{
    type: Boolean,
    default: true
  },
  messages: [messageSchema]


})

// Export the User model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);



export default UserModel
