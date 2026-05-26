import Car from '@/models/car';
import { connect } from '@/dbconfig/dbconfig';
import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';
import { randomUUID } from 'crypto';

export async function POST(request) {
  try {
    await connect();

    const data = await request.formData();

    const model = data.get('model');
    const category = data.get('category');
    const exterior_color = data.get('exterior_color');
    const interior_color = data.get('interior_color');
    const drivetrain = data.get('drivetrain');
    const mpg = data.get('mpg');
    const fuel_type = data.get('fuel_type');
    const transmission = data.get('transmission');
    const engine = data.get('engine');
    const convenience = data.get('convenience');
    const entertainment = data.get('entertainment');
    const exterior = data.get('exterior');
    const safety = data.get('safety');
    const dealer = data.get('dealer');

    const file = data.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { message: 'No image found', success: false },
        { status: 400 },
      );
    }

    //  basic type/size checks
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (file.type && !allowed.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid image type', success: false },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload buffer directly — no local public/ write
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'carease_uploads',
            public_id: randomUUID(),
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const imageUrl = await cloudinaryResponse.secure_url;
    const cloudinary_id = await cloudinaryResponse.public_id;
    const car = new Car({
      model,
      category,
      specifications: {
        exterior_color,
        interior_color,
        drivetrain,
        mpg,
        fuel_type,
        transmission,
        engine,
        convenience,
        entertainment,
        exterior,
        safety,
      },
      imageUrl,
      cloudinary_id,
      dealer,
    });

    const saved = await car.save();
    return NextResponse.json({
      message: 'File uploaded',
      success: true,
      car: saved,
    });
  } catch (error) {
    console.dir(error, { depth: null });
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
