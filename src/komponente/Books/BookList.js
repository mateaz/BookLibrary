import React from 'react';
import {updateBook, createBook, getAllBooksWithBorrowState} from "../../crud/http-methods-books";
import {BsFillPlusSquareFill} from 'react-icons/bs'
import {Button, Alert} from 'react-bootstrap';
import {FiEdit} from 'react-icons/fi';
import {Container, FormComponent, ModalComponent} from './partials';

export default class BookList extends React.Component {
    state = {
        allBooks: [],
        activeButton: 'all-books',
        backupBooks: [],
        nextBookId: '',
        filter: false,
        showModal: false,
        selectedBook: {
            id: '',
            bookName: '',
            authorName:''
        },
        showAlert: false,
        variant: '',
        messageVariant: '',
        setModalTitle: '',
    };

     componentDidMount () {
        getAllBooksWithBorrowState().then(res => {
            this.setState({allBooks: res.data}); 
            this.setState({backupBooks: res.data})
        });        
    };

    editBook = data => {
        data['id'] = this.state.selectedBook['id'];
        updateBook(data['id'], data)
            .then(() => {
                this.updateData();
                this.handleHideModalClick();
            })
            .catch((error) => console.log(error));
    };

    addNewBook = data => {
        data['id'] = this.state.nextBookId;
        createBook(data)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste dodali novu knjigu!')
                this.updateData();
                this.handleHideModalClick();
            })
            .catch(() =>this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno.'));
    };

    updateData = () => {
        if (this.state.filter) {
            getAllBooksWithBorrowState().then(res => {this.setState({backupBooks: res.data})});
        } else getAllBooksWithBorrowState().then(res => {this.setState({allBooks: res.data}); this.setState({backupBooks: res.data})});  
    };

    handleSelectedClick = (selected) => {
        this.setState({showModal: !this.state.showModal});
        this.setState({setModalTitle: 'Izmijeni podatke o knjizi'});
        if (selected !== this.state.selectedBook) {
            this.setState({selectedBook: selected})
         };
    };

    handleHideModalClick = () => {
        this.setState({showModal: false})
    };

    handleBookDataSubmit = (submitedData, b) => {
        if (b === 'edit') {
            this.editBook(submitedData);
        } else this.addNewBook(submitedData);
    };

    handleOpenModalClick = () => {
        const nextValueId = Math.max(...this.state.backupBooks.map(o => o.id), 0)+1;
        this.setState({nextBookId: nextValueId})
        this.handleSelectedClick({id: nextValueId, bookName: '', authorName: ''});
        this.setState({setModalTitle: 'Dodaj novu knjigu'});
    };

    handleFilterBooksClick = (e) => {
        if (e.target.getAttribute('id').includes('filter')) {
            let array = this.state.backupBooks.filter((item) => {
                if(item.borrowState.length > 0) {
                    return true
                } else return false;
            });
            this.setState({allBooks: array});
            this.setState({filter: true})
        } else {
            this.setState({allBooks: this.state.backupBooks});
            this.setState({filter: false})
        };
        this.setState({activeButton: e.target.getAttribute('id')})

    };

    showMessageAlert = (variant, message) => {
        this.setState({showAlert: true});
        this.setState({variant: variant});
        this.setState({messageVariant: message})
    };

    render() {
        return (        
            <div id="book-list"> 
                <Alert show={this.state.showAlert} variant={this.state.variant}>
                    <p>{this.state.messageVariant}</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setState({showAlert: false})} variant="outline-success">
                            Zatvori
                        </Button>
                    </div>
                </Alert>  
                <div className="buttons-list">
                    <Button className='button-custom' onClick = {this.handleOpenModalClick}>Dodaj novu knjigu <BsFillPlusSquareFill /></Button>
                    <div>
                        <Button className={`button-custom ${this.state.activeButton === 'all-books' ? 'button-active' : ''}`} id="all-books" onClick = {(e)=> this.handleFilterBooksClick(e)}>Sve knjige</Button>
                        <Button className={`button-custom  ${this.state.activeButton === 'filter-books' ? 'button-active' : ''}`}  id="filter-books" onClick = {(e)=> this.handleFilterBooksClick(e)}>Posuđene knjige</Button>
                    </div>
                </div>
                <Container iconElement = {<FiEdit />} books = {this.state.allBooks} onSelectedClick = {this.handleSelectedClick}/>
                <ModalComponent 
                    modalTitle = {this.state.setModalTitle}
                    isShowing = {this.state.showModal}
                    onHideModalClick = {this.handleHideModalClick}
                    children = {
                        <FormComponent
                            book = {this.state.selectedBook}
                            onBookDataSubmit = {this.handleBookDataSubmit}
                        />
                    }
                />
          </div>   
        )
}};

