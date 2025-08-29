"use client";
import { useState, useEffect } from 'react';

type CmsData = {
    content: string,

}

export const useCmsBlock = (identifier: string) => {
    const [data, setData] = useState<CmsData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    function loadData(identifier: string): void {
        // const hostUrl: string = getCookie('host_url');
        const hostUrl: string|undefined = process.env.HOST_URL;
        let url: string  = hostUrl + 'frontend/cms/block/?identifier=' + identifier;
        if (url.includes('local')) {
            if (url.includes('?')) {
                url += '&XDEBUG_SESSION_START=PHPSTORM';
            } else {
                url += '?XDEBUG_SESSION_START=PHPSTORM';
            }
        }
        const request: Request = new Request(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type' : 'application/json',
            })
        });
        fetch(request)
            .then( (response: Response) => {
                return response.json();
            })
            .then( (data: any) => {
                setLoading(false);
                if (data !== undefined && data['state'] === 'success' && data['message'] === 'Block Found') {
                    setData(data['data']);
                } else if (data !== undefined && data['state'] === 'success' && data['message'] !== 'Block Found') {
                    setError(data['message']);
                } else {
                    let msg = data['message'] ?? 'Something has gone wrong!'
                    setError(msg);
                }
            })
            .catch( (err: Error) => {
                console.log(err);
            })
    }

    const reloadData = () => {
        setLoading(false);
        loadData(identifier);
        return true;
    }

    useEffect( () => {
        loadData(identifier);
    }, [] );

    return { data, loading, reloadData, error };
}

function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}