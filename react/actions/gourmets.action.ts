import axios from "axios"
import { createAction } from "redux-actions"
import { actionTypes } from "../constants/action-types.constants"

const { gourmets } = actionTypes

export const fetchGourmets = createAction(gourmets.fetch_list, (page: number) => {
    let url = `/gourmets?limit=30${page ? "&page=" + page : ""}`
    return axios.get(url)
})
export const fetchGourmet = createAction(gourmets.fetch_item, (id: string) => axios.get("/gourmets/" + id))
export const createGourmet = createAction(gourmets.post, (gourmet: any) => axios.post("/gourmets", gourmets))
export const updateGourmet = createAction(gourmets.post, (gourmet: any, id: string) => axios.post("/gourmets/" + id, gourmet))
export const deleteGourmet = createAction(gourmets.delete, (id: string) => axios.post("/gourmets/" + id + "/delete"))