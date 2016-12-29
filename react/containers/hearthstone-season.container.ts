import { connect } from 'react-redux';
import { fetchSeason, createSeason, updateSeason, initSeasonCreate, changField } from '../actions/hearthstone-seasons.action';
import HearthstoneSeasonPage from '../components/hearthstone-season-page.component';

const mapStateToProps = (state) => {
    return {
        season: state.hearthstoneSeason
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSeason: (url) => dispatch(fetchSeason(url)),
        initSeasonCreate: () => dispatch(initSeasonCreate()),
        createSeason: (season) => dispatch(createSeason(season)),
        updateSeason: (season) => dispatch(updateSeason(season)),
        changeField: (field, value) => dispatch(changField(field, value))
    }
}

const HearthstoneSeason = connect(mapStateToProps, mapDispatchToProps)(HearthstoneSeasonPage);

export default HearthstoneSeason;