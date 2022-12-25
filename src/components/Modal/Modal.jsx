import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={css.Backdrop}>
        <div className={css.Modal}>
          <img src={this.props.url} alt="img" />
        </div>
      </div>
    );
  }
}
