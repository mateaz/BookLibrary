import React from 'react';
import {getUser} from "../../crud/http-methods-users";
import {updateBook, getAllBooks, getBorrowedBooks, deleteBorrowedBook} from "../../crud/http-methods-books";
import {Alert, Button} from 'react-bootstrap';
import {BsFillPlusCircleFill, BsFillDashCircleFill} from 'react-icons/bs'
import {Container, Find, ModalComponent} from './partials';

export default class Interface extends React.Component {
    state = {
        borrowedBooks: [],
        allBooks: [],

        searchedUser:[],
        show: false,
        
        restBooks: [],
        showAlert: false,
        variant: '',
        messageVariant: '',
        showModal: false,
        selectedFeature: {
            id: '',
            bookName: '',
            authorName:'',
        },
    };

    componentDidMount() {
        getAllBooks()
            .then(res => {
                this.setState({allBooks: res.data})
            })
            .catch(error => {
                console.log(error);
            });

        getBorrowedBooks()
            .then(res => {
                this.setState({borrowedBooks: res.data}); 
                //console.log(res.data)
            this.filterBooks();
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleSubmit = data => {
        getUser(data.userName)
            .then(res => {
                this.setState({searchedUser: res.data})
                this.filterBooks();
                this.setState({show: true});
            })
            .catch( () => {
                this.setState({searchedUser: ''});
                this.setState({show: false})
            });
    };

    getData = () => {
        getBorrowedBooks()
            .then(res => {
                this.setState({borrowedBooks: res.data}); 
                this.filterBooks();
            })
            .catch(error => {
                console.log(error);
            });
    };

    filterBooks = () => {
        const notborrowed = this.state.allBooks.filter((el) => {
            return !this.state.borrowedBooks.some((f) => {
              return f.bookId === el.id;
            });
          });
        this.setState({restBooks: notborrowed})


    };

    handleClickSetSelected = (selected) => {
       this.setState({showModal: true})
       this.setState({selectedFeature: selected}) 
       console.log(selected)
    };

    handleClickHideModal = () => {
        this.setState({showModal: false})
    };
    
    returnBook = () => {
        //let userID = this.state.selectedFeature['userId'];
        let data = this.state.selectedFeature;
      //  data['userId'] = '';

        console.log(data)

        deleteBorrowedBook(data.borrowedBookId)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste vratili knjigu');
                this.getData();
                this.handleClickHideModal();
            })
            .catch(() => {
                this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
                this.handleClickHideModal();
            });

       /* updateBook(data['id'], data)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste vratili knjigu');
              //  this.getData(userID);
                this.handleClickHideModal();
            })
            .catch(() => {
                this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
                this.handleClickHideModal();
            });*/
    };

    borrowBook = () => {
        let data = this.state.selectedFeature;
        data['userId'] = this.state.searchedUser['id'];    
        updateBook(data['id'], data)
        .then(() => {
            this.showMessageAlert('success', 'Uspješno ste posudili knjigu');
            this.getData(this.state.searchedUser['id']);
            this.handleClickHideModal();
        })
        .catch(() => {
            this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
            this.handleClickHideModal();
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
                        <div className="userinterface-div-content" >
                            <p className="userinterface-message-p">Za vratiti</p>
                            {this.state.searchedUser.map((user, i) => (
                            <div>
                                <p>{user.userName}</p>

                                <Container id={user.id} onClickSetSelected = {this.handleClickSetSelected} iconButton={<BsFillPlusCircleFill/>} 
                                data={this.state.allBooks.filter(book => {                  
                                     return this.state.borrowedBooks.some(borrowedBook => {
                                        if (borrowedBook.userId === user.id && book.id === borrowedBook.bookId) {
                                            return book.borrowedBookId = borrowedBook.id;
                                        } 
                                    })
                                     
                                     })}/>
                            </div>))}
                        </div>
                         : 
                         <div className="userinterface-div-content">
                             <p className="userinterface-message-p">Trenutno niste posudili nijednu knjigu</p>
                        </div>
                        }
                        <div className="vertical-line"></div>
                        {this.state.restBooks.length > 0 ? 
                        <div className="userinterface-div-content" >
                        <p className="userinterface-message-p">Za posuditi</p>
                                <Container data = {this.state.restBooks} onClickSetSelected = {this.handleClickSetSelected} iconButton={<BsFillPlusCircleFill/>}/>
                                </div>
                            : 
                            <div className="userinterface-div-content" >
                                <p className="userinterface-message-p">Nijedna knjiga nije dostupna za posudbu</p>
                            </div>
                        }
                    </div>)
                }

                <ModalComponent 
                    modalTitle = { this.state.selectedFeature.borrowedBookId ? 'Vrati knjigu?' : 'Posudi knjigu?'}
                    isShowing = {this.state.showModal}
                    onClickHide = {this.handleClickHideModal}
                    children = {this.state.selectedFeature.borrowedBookId ? 
                        ( <div className='modal-return-borrow'>
                            <div>Za povratak knjige u knjižnicu kliknite Da</div>
                            <div className='modal-return-borrow-buttons'>
                                <Button className='button-custom' onClick={this.returnBook}>Da</Button>
                                <Button className='button-custom' onClick={this.handleClickHideModal}>Odustani</Button>
                            </div>
                        </div>
                        )
                    : 
                        ( <div className='modal-return-borrow'>
                            <div>Za posudbu knjige kliknite Da</div>
                            <div className='modal-return-borrow-buttons'>
                                <Button className='button-custom' onClick={this.borrowBook}>Da</Button>
                                <Button className='button-custom' onClick={this.handleClickHideModal}>Odustani</Button>
                            </div>
                        </div>
                        )
                        }
                />
                
            </div>    
        )
}};