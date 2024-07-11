import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../config/dbConnection';
import User from '../../../models/User';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const {phone} = body;
    const isExist = await User.findOne({phone}).exec();
    console.log("isExist=>", isExist);
    if(isExist){
        return NextResponse.json({ success: true, error: 'Phone number already exists', data: isExist }, { status: 200 });
    }else{
        delete body.noOfQues;
        console.log("This is body =>", body)
        const newUser = new User(body);
        const user = await newUser.save();
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    }
   
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest){
    await dbConnect();
    const users = await User.find({});
    if(users){
        return NextResponse.json({ success: true, data: users });
    }else{
        return NextResponse.json({ success: false, error: 'No users found' }, { status: 404 });
    }
}
