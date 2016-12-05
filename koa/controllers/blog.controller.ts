import * as Blog from '../models/blog.model';

const list = async (ctx) => {
    try {

    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const find = async (ctx) => {
    try {

    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const create = async (ctx) => {
    try {

    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const update = async (ctx) => {
    try {

    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const remove = async (ctx) => {
    try {

    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

export default { list, find, create, update, remove }