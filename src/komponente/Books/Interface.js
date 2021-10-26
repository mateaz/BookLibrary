import React from 'react';
import {getUser} from "../../crud/http-methods-users";
import {updateBook, getAllBooks} from "../../crud/http-methods-books";
import {Alert, Button} from 'react-bootstrap';
import {ModalComponent, Container, Find} from './partials';

export default class Interface extends React.Component {
    state = {
        searchedUser: '',
        show: false,
        books: [],
        borrowedBooks: [],
        resetBooks: [],
        showAlert: false,
        variant: '',
        messageVariant: '',
        openModal: false,
        selectedFeature: {
            id: '',
            book_name: '',
            author_firstname:'',
            author_lastname: '',
            userId: '',
        },
    };

    handleSubmit = data => {
        getUser(data.id)
            .then(res => {
                // showAlert("success", "Update success");
                this.setState({searchedUser: res.data})
                this.getData(data.id);
                this.setState({show: true});
                /*this.showMessageAlert('success', 'Uspješno pretraživanje');*/
            })
            .catch( () => {
                this.showMessageAlert('warning', 'Neuspješno pretraživanje. Provjerite upisane podatke i pokušajte ponovno'); 
                this.setState({searchedUser: ''});
                this.setState({show: false})
            });
    };

    getData = e => {
        getAllBooks().then(res => {
          this.setState({books: res.data}); 
          this.filterBooks(e);
        });
    };

    filterBooks = e => {
        let borrowed = this.state.books.filter((item) => {
            if( item.userId === e) {
                return true
            };
        }); 
        this.setState({borrowedBooks: borrowed})
        let notborrowed = this.state.books.filter((item) => {
            if( item.userId === '') {
                return true
            };
        }); 
        this.setState({resetBooks: notborrowed})
    };

    openModalEdit = selected => {
        this.setState({openModal: true})
        this.setState({selectedFeature: selected}) 
    };

    closeModalEdit = () => {
        this.setState({openModal: false})
    };
    
    returnBook = () => {
        let userID = this.state.selectedFeature['userId'];
        let data = this.state.selectedFeature;
        data['userId'] = '';
        updateBook(data['id'], data)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste vratili knjigu');
                this.getData(userID);
                this.closeModalEdit();
            })
            .catch(() => {
                this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
                this.closeModalEdit();
            });
    }

    borrowBook = () => {
        let data = this.state.selectedFeature;
        data['userId'] = this.state.searchedUser['id'];    
        updateBook(data['id'], data)
        .then(() => {
            this.showMessageAlert('success', 'Uspješno ste posudili knjigu');
            this.getData(this.state.searchedUser['id']);
            this.closeModalEdit();
        })
        .catch(() => {
            this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
            this.closeModalEdit();
        });
    };

    showMessageAlert = (variant, message) => {
        this.setState({showAlert: true});
        this.setState({variant: variant});
        this.setState({messageVariant: message})
    };

    render() {
        return (        
            <div id="interface">  
               <Alert show={this.state.showAlert} variant={this.state.variant}>
                    <p>{this.state.messageVariant}</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setState({showAlert: false})} variant="outline-success">
                            Zatvori
                        </Button>
                    </div>
                </Alert>
                <Find onSubmit={this.handleSubmit}/>
                {!this.state.show ?  
                    <div></div>  : 
                    ( <div className="userinterface"> 
                        {this.state.borrowedBooks.length > 0 ? 
                        <Container data = {this.state.borrowedBooks} openModalEdit = {this.openModalEdit}/> : 
                        <div>Trenutno nisi posudio nijednu knjigu</div>
                        }
                        <div className="vertical-line"></div>
                        {this.state.resetBooks.length > 0 ? <Container data = {this.state.resetBooks} openModalEdit = {this.openModalEdit}/> : 
                            <div>Nijedna knjiga nije dostupna za posudbu</div>
                        }
                    </div>)
                }
                
                <ModalComponent 
                    show={this.state.openModal}
                    handleClose={this.closeModalEdit}
                    child = {this.state.selectedFeature.userId ? 
                        <div>Za povratak knjige u knjižnicu kliknite Da
                            <button onClick={this.returnBook}>DA</button>
                            <button onClick={this.closeModalEdit}>Odustani</button>
                        </div>
                    :   <div>Za posudbu knjige kliknite Da
                            <button onClick={this.borrowBook}>DA</button>
                            <button onClick={this.closeModalEdit}>Odustani</button>
                        </div>
                        }
                />
            </div>   
        )
}};

/*BookList.propTypes={
    propsconsole: PropTypes.string, 
    propsname: PropTypes.string,
    posts: PropTypes.array,
    user: PropTypes.array,
    comments: PropTypes.array
};*/