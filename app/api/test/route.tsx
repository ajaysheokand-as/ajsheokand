import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../config/dbConnection';
import Test from '../../../models/Test';

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
      const body = await req.json();
             const newTest = new Test(body);
          const test = await newTest.save();
          return NextResponse.json({ success: true, data: test }, { status: 201 });
     
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }

  export async function GET(req: NextRequest){
    await dbConnect();
    const users = await Test.find({});
    if(users){
        return NextResponse.json({ success: true, data: users });
    }else{
        return NextResponse.json({ success: false, error: 'No users found' }, { status: 404 });
    }
}