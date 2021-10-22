import React from 'react';
import PropTypes from 'prop-types';
import {FiEdit} from 'react-icons/fi';

import {Button, ModalComponent} from './partials';

export default class BookList extends React.Component {
    state = {
        targetIDs: [],
        showID: [],
        openModal: false,
    };

   /* componentDidMount () {
        console.log(`${this.props.propsconsole} ${this.props.propsname}`);
    };*/

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

    openModalEdit = () => {
        this.setState({openModal: !this.state.openModal})
    };

    closeModalEdit = () => {
        this.setState({openModal: false})
    }

    render() {

        return (                                                                                                                                                          
            <div className="list-books">
                {this.props.books.map(book => {
                    console.log(book)
                    const { id } = book;
                    const { userId } = book;
                    const { name } = book;
                    const { author } = book;
                    const {image } = book
                    return (
                        <div key={id} className="book-card">
                            {/*  <img src={require(`../img/${image}`).default} width={150} height={150}/>*/}
                            <p className="name-book">{name}</p>
                            <p className="author-book">{author}</p>  
                            {/*  <p>{userId}</p>      */}
                            <Button styleName={'book-list-button'} icon = {<FiEdit />} onClickFun = {this.openModalEdit}
                            />
                        </div>
                    )
                })}
                <ModalComponent 
                    show={this.state.openModal}
                    handleClose={this.closeModalEdit}
                />
            </div>
        )}
};

BookList.propTypes={
    propsconsole: PropTypes.string, 
    propsname: PropTypes.string,
    posts: PropTypes.array,
    user: PropTypes.array,
    comments: PropTypes.array
};