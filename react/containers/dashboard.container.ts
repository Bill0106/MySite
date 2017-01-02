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
    const type = helpers.actionTypeStatus(helpers.actionTypes.counts.fetch_list, 'fetch');
    const getCounts = createAction(type, () => axios.get('/counts'));

    return {
        getCounts: () => dispatch(getCounts())
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardList);

export default Dashboard;