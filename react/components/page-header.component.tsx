import * as React from "react"
import { Link } from "react-router"

interface PageHeaderProps extends React.Props<any> {
    title: string
    total?: number
    button?: boolean
}

class PageHeader extends React.Component<PageHeaderProps, void> {
    render() {
        const { title, total, button } = this.props
        let addButton = null
        if (button) {
            addButton = <Link to={"/admin/" + title.toLowerCase() + "/add"} className="btn btn-primary pull-right">Add</Link>
        }

        return (
            <div className="row">
                <div className="col-sm-12">
                    <section className="page-header">
                        <h1>
                            {title} <small>{total ? total : ""}</small>
                            {addButton ? addButton : null}
                        </h1>
                    </section>
                </div>
            </div>
        )
    }
}

export default PageHeader