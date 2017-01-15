import * as React from "react"
import DashboardItem from "./dashboard-item.component"
import Alert from "./alert.component"

interface DashboardListProps extends React.Props<any> {
    counts: any
    getCounts: any
}

class DashboardList extends React.Component<DashboardListProps, void> {
    componentWillMount() {
        document.title = "Dashboard - " + document.title
    }

    componentDidMount() {
        const { getCounts, counts } = this.props

        if (!counts.fetched) {
            getCounts()
        }
    }

    render() {
        const { counts } = this.props
        const { isFetching, items, error } = counts

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <section className="page-header text-center">
                            <h1>Welcome back, My Master !</h1>
                        </section>
                    </div>
                </div>
                <Alert isFetching={isFetching} error={error} isPosting={false} posted={false} />
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                    {
                        items.map((item, key) => {
                            return <DashboardItem key={key} title={item.title} count={item.count} />
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardList