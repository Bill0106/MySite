import { connect } from "react-redux"
import { HearthstoneSeasonFields } from "../constants/hearthstone-season-fields.constants"
import { fetchSeason, createSeason, updateSeason } from "../actions/hearthstone-seasons.action"
import { initItemCreate, changeItem, setItem } from "../actions/item.action"
import Item from "../components/item.component"

const mapStateToProps = (state) => {
    return {
        list: state.hearthstoneSeasons,
        item: state.item,
        type: "Hearthstone-Season",
        fields: HearthstoneSeasonFields,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initItemCreate: () => dispatch(initItemCreate()),
        getItem: (params) => dispatch(fetchSeason(params.url)),
        setItem: (item) => dispatch(setItem(item)),
        createItem: (item) => dispatch(createSeason(item)),
        updateItem: (item, params) => dispatch(updateSeason(item, params.url)),
        changeItem: (field, value) => dispatch(changeItem({field, value})),
    }
}

const HearthstoneSeason = connect(mapStateToProps, mapDispatchToProps)(Item)

export default HearthstoneSeason