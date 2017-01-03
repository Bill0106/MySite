import { connect } from 'react-redux';
import { GourmetFields } from '../../config/fields/gourmet';
import { fetchGourmet, updateGourmet, createGourmet } from '../actions/gourmets.action';
import { initItemCreate, changeItem, setItem } from '../actions/item.action';
import Item from '../components/item.component';

const mapStateToProps = (state) => {
    return {
        list: state.gourmets,
        item: state.item,
        type: 'Gourmet',
        fields: GourmetFields,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initItemCreate: () => dispatch(initItemCreate()),
        getItem: (params) => dispatch(fetchGourmet(params.id)),
        setItem: (item) => dispatch(setItem(item)),
        createItem: (item) => dispatch(createGourmet(item)),
        updateItem: (item, params) => dispatch(updateGourmet(item, params.id)),
        changeItem: (field, value) => dispatch(changeItem({field, value})),
    }
}

const Gourmet = connect(mapStateToProps, mapDispatchToProps)(Item);

export default Gourmet;