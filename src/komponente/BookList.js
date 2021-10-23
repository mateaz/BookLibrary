import React from 'react';
import PropTypes from 'prop-types';
import {updateBook, getAllBooks} from "../crud/http-methods-books";


import {Button, ModalComponent, Container} from './partials';

export default class BookList extends React.Component {
    state = {
        books: [],
        targetIDs: [],
        showID: [],
        openModal: false,
        selectedFeature: {
            id: '',
            name: '',
            author:'',
        },
    };

     componentDidMount () {
        getAllBooks().then(res => this.setState({books: res.data}));
    };

    edit = (data) => {
        data['id'] = this.state.selectedFeature['id'];
        updateBook(data['id'], data)
            .then(() => {
               // showAlert("success", "Update success");
                //closeDialog();
                this.updateData();
                this.closeModalEdit();
            })
            .catch((error) => /*showAlert("error", "Update failed"));*/ console.log(error));
    };

    updateData = () => {
        getAllBooks().then(res => this.setState({books: res.data}));
    };

   

   /* handleOnClickButton = (e) => {
        let buttonId = e.target.getAttribute('id');
        let newButtonIds = [...this.state.showID];

        if (newButtonIds.includes(buttonId)) {
            newButtonIds = newButtonIds.filter(e => e !== buttonId)
        } else {
          newButtonIds.push(buttonId);
        }
        this.setState({showID: newButtonIds});

        let targetId = parseInt(e.target.previousSibling.getAttribute('id'));
        let newList = [...this.state.targetIDs];
        
        if (newList.includes(targetId)) {
          newList = newList.filter(e => e !== targetId)
        } else {
            newList.push(targetId);
        }
        this.setState({targetIDs: newList});
    };*/

    openModalEdit = (selected) => {
        this.setState({openModal: !this.state.openModal})
        if (selected !== this.state.selectedFeature) {
            this.setState({selectedFeature: selected})
         };
    };

    closeModalEdit = () => {
        this.setState({openModal: false})
    };

    saveSubmitedData = (submitedData) => {
        this.edit(submitedData);
    };

    render() {
        return (        
            <div>  
                <Container 
                    data = {this.state.books}
                    openModalEdit = {this.openModalEdit}
                />
                <ModalComponent 
                    show={this.state.openModal}
                    handleClose={this.closeModalEdit}
                    attributes = {this.state.selectedFeature}
                    submitData = {this.saveSubmitedData}
                />
          </div>   
        )
}
}

/*BookList.propTypes={
    propsconsole: PropTypes.string, 
    propsname: PropTypes.string,
    posts: PropTypes.array,
    user: PropTypes.array,
    comments: PropTypes.array
};*/