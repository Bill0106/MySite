import { connect } from 'react-redux';
import { fetchGourmet, changField, updateGourmet, initGourmetCreate, createGourmet } from '../actions/gourmets.action';
import GourmetPage from '../components/gourmet-page.component';

const mapStateToProps = (state) => {
    return {
        gourmet: state.gourmet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGourmet: (url) => dispatch(fetchGourmet(url)),
        createGourmet: (gourmet) => dispatch(createGourmet(gourmet)),
        updateGourmet: (gourmet) => dispatch(updateGourmet(gourmet)),
        changeField: (field, value) => dispatch(changField(field, value)),
        initGourmetCreate: () => dispatch(initGourmetCreate())
    }
}

const Gourmet = connect(mapStateToProps, mapDispatchToProps)(GourmetPage);

export default Gourmet;