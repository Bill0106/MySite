import axios from 'axios';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { actionTypeGenerator } from '../helpers';
import DashboardList from '../components/dashboard-list.component';

const mapStateToProps = (state) => {
    return {
        counts: state.counts
    }
}

const mapDispatchToProps = (dispatch) => {
    const type = actionTypeGenerator('counts', 'fetch');
    const fetchCounts = createAction(type(), () => axios.get('/counts'));

    return {
        getCounts: () => dispatch(fetchCounts())
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardList);

export default Dashboard;