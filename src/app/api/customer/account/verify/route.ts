import { NextResponse } from 'next/server';
import { decrypt, encrypt } from "@/app/api/utils/encryptor";

type PayloadData = {
    email: string,
    id: number,
    time: number
};

type ResponseType = {
    status: string,
    message?: string
    data?: any;
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
                    .then( async (decrypted: any): Promise<NextResponse<ResponseType>>  => {
                        let datum: PayloadData;
                        if (typeof decrypted === 'string') {
                            datum = JSON.parse(decrypted);
                        } else {
                            datum  = decrypted;
                        }
                        //Missing email, invalidate
                        if (datum === undefined || datum.email === undefined || datum.email === "") {
                            // return NextResponse.json({
                            //     status: 'error',
                            //     message: 'Invalid Data! Redirecting...'
                            // }, { status: 403 })
                        }
                        // Check if link expired and invalidate
                        const timestamp: number = Date.now() / 1000;
                        if (timestamp > datum['time']) {
                            // return NextResponse.json({
                            //     status: 'expired',
                            //     message: 'The link has expired'
                            // }, { status: 201 });
                        }
                        const payload: { email: string; id: number } = {
                            email: datum.email,
                            id: datum.id,
                        }
                        let returnData: any = await validateEmail(payload);
                        // debugger;
                        if (returnData) {
                            returnData.email = datum.email;
                            return NextResponse.json({
                                status: 'success',
                                data: returnData,
                            }, { status: 201 });
                        } else {
                            return NextResponse.json({
                                status: 'error',
                                message: 'Unable to verify email, please try again or contact customer services.',
                                data: {}
                            }, { status: 201 });
                        }

                    })
                    .catch( (err: Error): NextResponse<ResponseType> => {
                        console.log(err);
                        return NextResponse.json({
                            status: 'error',
                            message: 'Something has gone wrong! Redirecting...'
                        }, { status: 500 })
                    });
            }
        } else {
            return NextResponse.json({
                status: 'error',
                message: 'Invalid payload! Redirecting...'
            }, { status: 403 })
        }
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ status: 'error', message: 'Something has gone wrong!' }, { status: 500 })
}


async function validateEmail(payload: { email: string, id: number }): Promise<any> {
    // debugger;
    const baseUrl: string = process.env.HOST_URL ?? '';
    const token: string = process.env.FE_TOKEN ?? '';
    const url: string = baseUrl + 'verify/customer/email?XDEBUG_SESSION_START=PHPSTORM';
    const request: Request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token,
        })
    });
   return await fetch(request)
        .then((res: Response): Promise<any> => {
            return res.json()
        })
        .then( (data: any): void => {
            // let datum = JSON.parse(data);
            return data;
        })
        .catch( (err: Error): void => {
            console.log(err);
        });

}