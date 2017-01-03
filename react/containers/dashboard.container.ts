import axios from 'axios';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import helpers from '../helpers';
import DashboardList from '../components/dashboard-list.component';

const mapStateToProps = (state) => {
    return {
        counts: state.counts
    }
}

const mapDispatchToProps = (dispatch) => {
    const getCounts = createAction(helpers.actionTypes.counts.fetch_list, () => axios.get('/counts'));

    return {
        getCounts: () => dispatch(getCounts())
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardList);

export default Dashboard;