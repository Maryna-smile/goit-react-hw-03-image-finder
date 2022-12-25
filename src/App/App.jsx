import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { Hearts } from 'react-loader-spinner';
import { fetchPictures } from '../components/api/api';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import css from './App.module.css'

export default class App extends Component {
  state = {
    pictures: [],
    searchInput: '',
    page: 1,
    isLoading: false,
    error: '',
    showModal: false,
    bigImg: ''
  };

 componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page) {
      this.setState({ isLoading: true });
      const { searchInput, page } = this.state;
    fetchPictures(searchInput, page).then(hits => {
      this.setState(prevState => {
        return {
          pictures: [...prevState.pictures, ...hits],
        };
      });
      
    }).finally(() => {
      this.setState({ isLoading: false });
    });

    }
  }

  getBigImg = (e) => {
    this.setState({
      bigImg: e.currentTarget.dataset.large,
    });
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };



  getInputValue = e => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  getPictures = e => {
    const { searchInput } = this.state;
    e.preventDefault();
this.setState({isLoading: true })
    fetchPictures(searchInput).then(hits => {
      if (hits.length === 0) {
        this.setState({
          searchInput: '',
        });
        return Notiflix.Notify.info('Oops, we don`t have such photos');
      }
      this.setState({
        pictures: hits,
      });
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  };

  getMorePictures = async () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { searchInput, pictures, showModal, isLoading, bigImg} = this.state;
    return (
      <section>
       
        
        <Searchbar
          value={searchInput}
          onSubmit={this.getPictures}
          getInputValue={this.getInputValue}
        />
 {isLoading && <Hearts
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />}

        <ImageGallery getBigImg={this.getBigImg} img={pictures} />

        {this.state.pictures.length >= 12 && this.state.pictures.length > 0 && (
          <Button getMorePictures={this.getMorePictures} />
        )}

        {showModal && <Modal url={bigImg} toggleModal={this.toggleModal}/>}
      </section>
    );
  }
}
