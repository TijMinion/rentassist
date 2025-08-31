"use server";

export async function createCustomerAccount(name: string, email: string, password: string): Promise<any> {

    const url: string = `${process.env.HOST_URL}new/customer/create?XDEBUG_SESSION_START=PHPSTORM`;
    const token: string = `${process.env.TOKEN}`;
    const payload = {
        name: name,
        email: email,
        password: password
    }

    const request: Request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Token': token
        })
    });

    return fetch(request)
        .then( (response: Response) => {
            return response.json();
        })
        .then( (data: any) => {
            return data;
        } )
        .catch( (error: Error) => {
            console.log(error);
        })
        // .then( (res: Response) => res.json())
        // .then( (data: any) => {
        //
        // })
        // .catch( (err: Error) => {
        //     console.error(err);
        // })
}