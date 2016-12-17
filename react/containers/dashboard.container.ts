import { connect } from 'react-redux';
import { fetchCounts } from '../actions/counts.action';
import DashboardList from '../components/dashboard-list.component';

const mapStateToProps = (state) => {
    return {
        counts: state.counts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCounts: () => dispatch(fetchCounts())
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardList);

export default Dashboard;