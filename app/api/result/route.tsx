import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../config/dbConnection';
import Test from '../../../models/Test';


  export async function GET(req: NextRequest){
    const aggregationPipeline = [
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'phone',
            as: 'user'
          }
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            userId: 1,
            date: 1,
            result: 1,
            'user.name': 1,
            'user.phone': 1,
            'user.email': 1
          }
        },
        // {
        //   $match: {
        //     date: {
        //       $gte: new Date('2024-07-19T00:00:00.000Z')
        //     }
        //   }
        // }
      ];
    await dbConnect();
    // const users = await Test.find({});
    const results = await Test.aggregate(aggregationPipeline, { maxTimeMS: 60000, allowDiskUse: true });
    if(results){
        return NextResponse.json({ success: true, data: results });
    }else{
        return NextResponse.json({ success: false, error: 'No users found' }, { status: 404 });
    }
}