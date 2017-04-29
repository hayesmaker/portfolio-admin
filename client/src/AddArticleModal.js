import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Client from './Client';

let AddArticleModal = React.createClass({

  getInitialState() {
    return {
      open: false,
      title: '',
      date: '',
      company: '',
      desc: '',
      link: '',
      thumb: {
        src: '',
        size: ''
      }
    };

  },

  handleOpen () {
    this.setState({open: true});
  },

  handleClose () {
    this.setState({open: false});
  },

  handleFormChange(e) {
    this.setState({[e.target.name]: e.target.value});
  },

  /**
   * "title": req.body.title,
   "date": req.body.date,
   "company": req.body.company,
   "desc": req.body.desc,
   "link": req.body.link,
   "thumb": {
      "src": req.body.thumbSrc,
      "size": req.body.thumbSize
    }
   */
  handleSubmit() {
    this.handleClose();
    let payload = {
      title: this.state.title,
      date: this.state.date,
      company: this.state.company,
      desc: this.state.desc,
      link: this.state.link,
      thumb: {
        src: 'mySrc',
        size: '640x480'
      }
    };
    Client.postNewArticle(payload, () => {
      this.props.confirm.call();
    });
  },

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Add Project"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            name="title"
            value={this.state.title}
            hintText="Project Title"
            onChange={this.handleFormChange}
          />
          <TextField
            name="date"
            value={this.state.date}
            hintText="Date"
            onChange={this.handleFormChange}
          />
          <TextField
            name="company"
            value={this.state.company}
            hintText="Company"
            onChange={this.handleFormChange}
          />
          <TextField
            name="desc"
            value={this.state.desc}
            hintText="Description"
            multiLine={true}
            rows={5}
            onChange={this.handleFormChange}
          />
          <TextField
            name="link"
            value={this.state.link}
            hintText="Link To Project"
            onChange={this.handleFormChange}
          />
        </Dialog>
      </div>
    )

  }
});

export default AddArticleModal;