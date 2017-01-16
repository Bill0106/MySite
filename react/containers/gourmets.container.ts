import { connect } from 'react-redux';
import { fetchGourmets, deleteGourmet } from '../actions/gourmets.action';
import List from '../components/list.component';

const mapStateToProps = (state) => {
    return {
        list: state.gourmets,
        type: 'Gourmets',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (page = null) => dispatch(fetchGourmets(page)),
        postDelete: (url) => dispatch(deleteGourmet(url)),
    };
};

const Gourmets = connect(mapStateToProps, mapDispatchToProps)(List);

export default Gourmets;