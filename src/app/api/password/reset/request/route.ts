import { NextResponse } from 'next/server';

type ResponseType = {
    status: string,
    message?: string
    data?: any;
}

export async function POST(request: Request): Promise<NextResponse|undefined> {
    try {
        // debugger;
        const body: string = await request.text();
        if (body) {
            const bodyData = JSON.parse(body);
            const baseUrl: string = process.env.HOST_URL ?? '';
            const token: string = process.env.FE_TOKEN ?? '';
            const url: string = baseUrl + 'reset/customer/request?XDEBUG_SESSION_START=PHPSTORM';
            const req: Request = new Request(url, {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': token,
                })
            });

            return await fetch(req)
                .then((res: Response): Promise<any> => {
                    return res.json()
                })
                .then( (data: any): NextResponse<ResponseType> => {
                    // let datum = JSON.parse(data);
                    return NextResponse.json({
                        status: 'success',
                        data: data
                    }, { status: 201 })
                })
                .catch( (err: Error): NextResponse<ResponseType> => {
                    console.log(err);
                    return NextResponse.json({
                        status: 'error',
                        message: 'Something has gone wrong! Redirecting...'
                    }, { status: 500 })
                });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 'error',
            message: 'Something has gone wrong! Redirecting...'
        }, { status: 500 })
    }

    return NextResponse.json({ status: 'error', message: 'Invalid Payload' }, { status: 400 });
}