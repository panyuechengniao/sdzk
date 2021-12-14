


function http(url,callback,that){
    swan.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            data: {
                key: 'value'
            },
            success: res => {
               callback(res.data,that);
            },
    });
}
module.exports.http = http;
