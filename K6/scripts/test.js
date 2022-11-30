import http from 'k6/http';
import {check} from "k6";
import { SharedArray } from 'k6/data';
import encoding from 'k6/encoding';

export const options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: 3,
            timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
            duration: '6s',
            preAllocatedVUs: 1, // how large the initial pool of VUs would be
            maxVUs: 1, // if the preAllocatedVUs are not enough, we can initialize more
        },
    },
};

export default function () {

    const credentials = `$cherry:wi3Aifeamaejei7`;
    const encodedCredentials = encoding.b64encode(credentials);

    const options = {

        headers: {
            Authorization: `Basic ${encodedCredentials}`,
        },
    };

    const res = http.get(`https://newstore.spartak.com`, options);

    check(res, {

        'status is 200': (r) => r.status === 200,

        'is authenticated': (r) => r.json().authenticated === true,

        'is correct user': (r) => r.json().user === username,

    });
    
    //
    // // res = http.get(`http://httpbin.test.k6.io/basic-auth/${username}/${password}`, options);
    //
    //
    // // Passing username and password as part of the URL will
    //
    // // allow us to authenticate using HTTP Basic Auth.
    //
    // const url = `http://${credentials}@httpbin.test.k6.io/basic-auth/${username}/${password}`;
    //
    // var auth = http.get()
    // self.client.get("/", auth=('', 'wi3Aifeamaejei7'))
	// const response = http.get(`https://10.97.142.62:7243/Host/GetOperatorId/${hostCode}`);
    //
    // check(response, {
    //     'is status 200': (r) => r.status === 200,
    // });
}