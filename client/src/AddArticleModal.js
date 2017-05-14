import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Client from './Client';

export default class AddArticleModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
  }

  resetForm() {
    this.setState({
      title: '',
      date: '',
      company: '',
      desc: '',
      link: '',
      thumb: {
        src: '',
        size: ''
      }
    })
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  handleFormChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

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
      this.resetForm();
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onTouchTap={this.handleSubmit.bind(this)}
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
          <div class="row">
            <TextField
              name="title"
              value={this.state.title}
              hintText="Project Title"
              onChange={this.handleFormChange.bind(this)}
            />
            <TextField
              name="date"
              value={this.state.date}
              hintText="Date"
              onChange={this.handleFormChange.bind(this)}
            />
          </div>
          <div class="row">
            <TextField
              name="company"
              value={this.state.company}
              hintText="Company"
              multiLine={true}
              rows={5}
              onChange={this.handleFormChange.bind(this)}
            />
            <TextField
              name="desc"
              value={this.state.desc}
              hintText="Description"
              multiLine={true}
              rows={5}
              onChange={this.handleFormChange.bind(this)}
            />
          </div>
          <div class="row">
            <TextField
              name="link"
              value={this.state.link}
              hintText="Link To Project"
              onChange={this.handleFormChange.bind(this)}
            />

          </div>
        </Dialog>
      </div>
    )

  }
}

