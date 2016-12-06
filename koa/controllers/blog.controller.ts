import * as fs from 'fs';
import * as showdown from 'showdown';
import * as moment from 'moment';

import * as Blog from '../models/blog.model';

const list = async (ctx) => {
    try {
        let limit = parseInt(ctx.query.limit) || 20;
        let page = parseInt(ctx.query.page) || 1;
        let skip = limit * (page - 1);

        let blogs = await Blog.repositry.find().limit(limit).skip(skip).sort({ updated_at: 'desc' }).sort({ created_at: 'desc' });
        await blogs.map(blog => {
            blog.title = new Buffer(blog.title, 'base64').toString();
        });

        ctx.body = {
            list: blogs,
            total: await Blog.repositry.count({}),
        };
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const find = async (ctx) => {
    try {
        let blog = await Blog.repositry.findOne({ url: ctx.params.url });
        blog.title = new Buffer(blog.title, 'base64').toString();
        blog.markdown_contents = new Buffer(blog.markdown_contents, 'base64').toString();
        blog.html_contents = new Buffer(blog.html_contents, 'base64').toString();

        ctx.body = blog;
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const upload = async (ctx) => {
    try {
        const { path, originalname } = ctx.req.file;
        let name = originalname.split('.');
        let blog = await Blog.repositry.findOne({ url: name[0] });
        if (blog) {
            throw { message: "Blog Existed" };
        }

        let data = await getFileData(path);
        let markdown = data.toString()
        let converter = new showdown.Converter();
        converter.setOption('noHeaderId', 'true');
        await fs.unlinkSync(path);
        ctx.body = {
            success: true,
            data: {
                name: name[0],
                html: converter.makeHtml(markdown),
                markdown: markdown
            }
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = error.message;
    }
}

const create = async (ctx) => {
    try {
        let data = ctx.request.body;
        
        data.title = new Buffer(data.title).toString('base64');
        data.markdown_contents = new Buffer(data.markdown_contents).toString('base64');
        data.html_contents = new Buffer(data.html_contents).toString('base64');
        data.created_at = moment().valueOf();
        data.updated_at = moment().valueOf();

        let blog = new Blog.repositry(data);
        await blog.save();

        ctx.body = {
            success: true,
            data: {
                id: blog._id
            }
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const update = async (ctx) => {
    try {
        let data = ctx.request.body;
        
        data.title = new Buffer(data.title).toString('base64');
        data.markdown_contents = new Buffer(data.markdown_contents).toString('base64');
        data.html_contents = new Buffer(data.html_contents).toString('base64');
        data.updated_at = moment().valueOf();

        await Blog.repositry.findByIdAndUpdate(data.id, data);

        ctx.body = {
            success: true,
            data: {
                id: data.id
            }
        }

    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const remove = async (ctx) => {
    try {
        let blog = await Blog.repositry.findOne({ url: ctx.params.url });

        await blog.remove();

        ctx.body = {
            success: true,
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const publish = async (ctx) => {
    try {
        let blog = await Blog.repositry.findOne({ url: ctx.params.url });
        if (!blog) {
            throw "Blog Not Found"
        }

        if (blog.published) {
            throw "Blog Has Published"
        }

        blog.published = true;
        await blog.update(blog);

        ctx.body = {
            success: true
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const unpublish = async (ctx) => {
    try {
        let blog = await Blog.repositry.findOne({ url: ctx.params.url });
        if (!blog) {
            throw "Blog Not Found"
        }

        if (!blog.published) {
            throw "Blog Has Unpublished"
        }

        blog.published = false;
        await blog.update(blog);

        ctx.body = {
            success: true
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

function getFileData(path): any {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}

export default { list, find, create, upload, update, remove, publish, unpublish }