import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../config/dbConnection';
import Test from '../../../models/Test';

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
      const body = await req.json();
    //   const {phone} = body;
    //   const isExist = await Test.findOne({phone}).exec();
    //   console.log("isExist=>", isExist);
    //   if(isExist){
    //       return NextResponse.json({ success: true, error: 'Phone number already exists', data: isExist }, { status: 200 });
    //   }else{
        //   delete body.noOfQues;
          console.log("This is test body =>", body)
          const newTest = new Test(body);
          const test = await newTest.save();
          return NextResponse.json({ success: true, data: test }, { status: 201 });
    //   }
     
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }