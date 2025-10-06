import { NextResponse } from 'next/server';
import { decrypt, encrypt } from "@/app/api/utils/encryptor";

type ResetData = {
    email: string,
    id: number,
    time: number
};

type ResponseType = {
    status: string,
    message?: string
    data?: ResetData;
}

export async function POST(request: Request): Promise<NextResponse|undefined> {
    // debugger;
    // let val ={'email':'richard@noknok.email',id:1,time:1756818474};
    // const ennckey: string = process.env.FE_KEY ?? '';
    // await encrypt(val, ennckey)
    // .then(encrypted => {
    //     console.log(encrypted)
    //     if (typeof encrypted === "string" && encrypted.includes('\n')) {
    //         debugger;
    //     }
    //     debugger;
    // })

    try {
        const body: any = await request.json();
        if (body['payload'] !== undefined && typeof body['payload'] === "string" && body['payload'].length > 0) {
            const key: string = process.env.FE_KEY ?? '';
            if (key !== '') {
                return await decrypt(body['payload'], key)
                    .then( (decrypted: any): NextResponse<ResponseType>  => {
                        let datum: ResetData;
                        if (typeof decrypted === 'string') {
                            datum = JSON.parse(decrypted);
                        } else {
                            datum  = decrypted;
                        }

                        const timestamp: number = Date.now() / 1000;
                        if (timestamp > datum['time']) {
                            // return NextResponse.json({
                            //     status: 'expired',
                            //     message: 'The link has expired'
                            // }, { status: 201 });
                        }
                        return NextResponse.json({
                            status: 'success',
                            data: datum
                        }, { status: 201 });
                    })
                    .catch( (err: Error): NextResponse<ResponseType> => {
                        console.log(err);
                        return NextResponse.json({
                            status: 'error',
                            message: 'Unable to validate! Redirecting...'
                        }, { status: 500 })
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ status: 'error', message: 'Something has gone wrong!' }, { status: 500 })
}