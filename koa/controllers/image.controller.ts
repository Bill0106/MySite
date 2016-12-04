/// <reference path="../../declarations.d.ts"/>

import * as fs from 'fs';
import * as crypto from 'crypto';
import * as qiniu from 'qiniu';
import axios from 'axios';
import { Keys } from '../../config/keys';

const create = async (ctx) => {
    const { path, mimetype } = ctx.req.file;
    const bucket = 'website';

    qiniu.conf.ACCESS_KEY = Keys.qiniu.AK;
    qiniu.conf.SECRET_KEY = Keys.qiniu.SK;

    try {
        let imageType = mimetype.split('/');
        if (imageType[0] != 'image') {
            throw "Not Image";
        }

        let filename = await generateFilenam(path, imageType[1]);
        let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + filename);
        let token = putPolicy.token();
        let extra = new qiniu.io.PutExtra();
        let image = await uploadFile(bucket, filename, path);
        await fs.unlinkSync(path);
        await axios.get(image + '?imageAve')
            .then(response => {
                ctx.body = {
                    url: image,
                    color: response.data.RGB
                }
            })
    } catch (error) {
        ctx.status = ctx.status || 400;
        ctx.body = error.message;
    }
}

function generateFilenam(path, type): any {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            let md5 = crypto.createHash('md5').update(data, 'utf8').digest('hex');
            resolve(md5 + '.' + type);
        });
    })
}

function uploadFile(bucket, key, localFile): any {
    let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    let extra = new qiniu.io.PutExtra();

    return new Promise((resolve, reject) => {
        qiniu.io.putFile(putPolicy.token(), key, localFile, extra, (error, ret) => {
            if (error) reject(error);
            resolve(Keys.qiniu.domain + ret.key);
        })
    })
}

export default { create }