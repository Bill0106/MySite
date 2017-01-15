import { connect } from "react-redux";
import { fetchSeasons, deleteSeason } from "../actions/hearthstone-seasons.action";
import List from "../components/list.component";

const mapStateToProps = (state) => {
    return {
        list: state.hearthstoneSeasons,
        type: "Hearthsonte-Seasons"
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (page = null) => dispatch(fetchSeasons(page)),
        postDelete: (url) => dispatch(deleteSeason(url))
    }
}

const HearthstoneSeasons = connect(mapStateToProps, mapDispatchToProps)(List);

export default HearthstoneSeasons;