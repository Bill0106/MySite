import * as React from "react"
import { RouteComponentProps } from "react-router"
import { HearthstoneDeckFields } from "../constants/hearthstone-deck-fields.constants"
import PageHeader from "./page-header.component"
import Alert from "./alert.component"
import Form from "./form.component"
import HearthstoneDeckCards from "../containers/hearthstone-deck-cards.container"
import HearthstoneCards from "../containers/hearthstone-cards.container"

interface HearthstoneDeckPageProps extends RouteComponentProps<void, void> {
    list: any
    deck: any
    getDeck: any
    setDeck: any
    changeDeck: any
    createDeck: any
    updateDeck: any
    initCreateDeck: any
}

class HearthstoneDeckPage extends React.Component<HearthstoneDeckPageProps, void> {
    componentWillMount() {
        const { params, initCreateDeck } = this.props

        if (params["id"] === "add") {
            document.title = "Add - Hearthstone Decks | Admin"
        } else {
            document.title = "Edit - Hearthstone Decks | Admin"
        }

        initCreateDeck()
    }

    componentDidMount() {
        const { params, list, getDeck, setDeck } = this.props
        const item = list.items.find(v => v._id === params["id"])

        if (item) {
            setDeck(item)
        } else if (params["id"] !== "add") {
            getDeck(params["id"])
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { params, list, deck, setDeck } = nextProps
        const item = list.items.find(v => v._id === params["id"])

        if (!deck.data && item) {
            setDeck(item)
        }
    }

    handleChange(field, value) {
        const { changeDeck } = this.props
        changeDeck(field, value)
    }

    handleCardsSort(cards: any) {
        cards.sort((a, b) => {
            if (a.cost > b.cost) return 1
            if (a.cost < b.cost) return -1
            if (a.name > b.name) return 1
            if (a.name > b.name) return -1
            return 0
        })

        return cards
    }

    handleCardsChange(selected) {
        const { changeDeck } = this.props
        const sorted = this.handleCardsSort(selected)
        const storage = sorted.map(e => JSON.stringify(e))

        let cards = []
        for (let card of sorted) {
            const element = cards.findIndex(e => e.card === card._id)
            const filter = sorted.filter(e => e._id === card._id)

            if (element < 0) {
                cards.push({
                    card: card._id,
                    count: filter.length,
                })
            }
        }

        changeDeck("cards", cards)
        window.localStorage.setItem("selected_cards", storage.join(";"))
    }

    handleSubmit(e) {
        const { params, deck, createDeck, updateDeck} = this.props

        if (params["id"] === "add") {
            createDeck(deck.data)
        } else {
            updateDeck(deck.data, params["id"])
        }
    }

    render() {
        const { params, list, deck, changeDeck } = this.props
        const { isFetching, isPosting, posted, error } = list

        return (
            <div className="container-fluid">
                <PageHeader title={params["id"] === "add" ? "Add Deck" : "Edit Deck"} />
                <Alert isPosting={isPosting} isFetching={isFetching} posted={posted} error={error} />
                <Form fields={HearthstoneDeckFields} data={deck.data} submit={this.handleSubmit.bind(this)} change={this.handleChange.bind(this)} />
                <HearthstoneDeckCards change={this.handleCardsChange.bind(this)} />
                <HearthstoneCards change={this.handleCardsChange.bind(this)} sort={this.handleCardsSort.bind(this)} />
            </div>
        )
    }
}

export default HearthstoneDeckPage