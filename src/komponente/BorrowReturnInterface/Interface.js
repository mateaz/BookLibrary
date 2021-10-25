import React from 'react';
import {updateUser, getAllUsers} from "../../crud/http-methods-users";
import {updateBook, getAllBooks} from "../../crud/http-methods-books";
import {Find} from './partials';


import {Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getCardActionAreaUtilityClass } from '@mui/material';

export default class Interface extends React.Component {
    state = {
        users: [],
        searchedUser: '',
        show: false,
        books: [],
        borrowedBooks: [],
        restBooks: [],

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
        getAllUsers().then(res => this.setState({users: res.data}));
    };

    checkUser = (inputid) => {
        this.setState({searchedUser: inputid})
    };

   // handleSubmit = (e) => {

     //   console.log(e)
     /*   console.log(this.state.searchedUser)
        
       if (parseInt(this.state.searchedUser)) {
            let array = this.state.users.filter((item) => {
                if( item.id === parseInt(this.state.searchedUser)) {
                    return true
                };
            });
            if (array.length > 0) {
                console.log('if array')
                this.setState({show: true})
                this.getData(parseInt(this.state.searchedUser));
            } else {
                this.setState({show: false});
                this.setState({searchedUser: ''});
                console.log('ne postoji taj korisnik')
            };
        } else {
            this.setState({show: false});
            this.setState({searchedUser: ''});
            console.log('upisan  nije broj')
        };*/
  //  };

    handleSubmit = data => {
        //console.log(data)

        const userExists = this.state.users.some(user => user.id === data.id);
        if (userExists) {
            this.getData(data.id);
            this.setState({show: true});
        } else {
            console.log('user ne postoji')
            this.setState({show: false});
        };
        //submitData(data);
    };

    getData = (e) => {
        getAllBooks().then(res => {
          this.setState({books: res.data}); 
          this.filterBooks(e);
        });
    };

    filterBooks = (e) => {
        let borrowed = this.state.books.filter((item) => {
            if( item.userId === e) {
                return true
            };
        }); 

        this.setState({borrowedBooks: borrowed})

        //console.log(borrowed)

        let notborrowed = this.state.books.filter((item) => {
            if( item.userId !== e) {
                return true
            };
        }); 

        this.setState({restBooks: notborrowed})

        ///console.log(notborrowed)
    };

    

    render() {
        return (        
            <div>  
                <Find onSubmit={this.handleSubmit}/>
                
                    {!this.state.show ?  <div></div>  : 
                    
                    (
                        <div className="userinterface"> 
                    <div className="blue">
                        {this.state.borrowedBooks.map(feature => {
                            
                            const { id } = feature;
                            // const { userId } = feature;
                            const { book_name } = feature;
                            const { author_firstname } = feature;
                            const { author_lastname } = feature;
                
                        //  const {image } = feature
                            return (
                                <div key={id} className="book-card">
                                    <p className="book_name-book">{book_name}</p>
                                    <p className="author_firstname-book">{author_firstname} {author_lastname}</p>  
                                    </div>
                            )
                        })}
                    </div>
                    <div className="vertical-line"></div>

                    <div className="red">
                    {this.state.restBooks.map(feature => {
                        
                        const { id } = feature;
                        const { book_name } = feature;
                        const { author_firstname } = feature;
                        const { author_lastname } = feature;
                        return (
                            <div key={id} className="book-card">
                                <p className="book_name-book">{book_name}</p>
                                <p className="author_firstname-book">{author_firstname} {author_lastname}</p>  
                            </div>
                        )
                    })}
                    </div>
                    
                    </div>)
                }
                
               

                
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