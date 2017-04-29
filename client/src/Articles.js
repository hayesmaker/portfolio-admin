import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './Articles.css';
import AddArticleModal from './AddArticleModal';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import Client from './Client';

const style = {
  color: 'white',
};


const DeleteForeverIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
);

const limitLength = (str, length) => str.substring(0, length);

class Articles extends Component {
  constructor(props) {
    super(props);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.state = {
      shouldShowDelete: false,
      articles: []
    }
  }

  handleRowSelection(rows) {
    if (rows.length) {
      let mongoId = this.state.articles[rows[0]]._id;
      console.log('Articles :: handleRowSelection', rows, mongoId);
      this.setState({
        shouldShowDelete: true,
        currentRecordId: mongoId
      });
    } else {
      this.setState({
        shouldShowDelete: false,
        currentRecordId: null
      });
    }
  }

  deleteCurrentRecord() {
    console.log('deleteCurrent');
    Client.deleteArticle(this.state.currentRecordId, (res) => {
      console.log('record deleted', res);
      this.props.getArticles.call();
    });
  }

  /**
   * this.renderListCallback = props.renderList;
   * this.listScope = props.listScope;
   * @returns {XML}
   */
  render() {
    return (
      <Card>
        <AddArticleModal ref="myDialog" confirm={this.props.getArticles} />
        <CardHeader
          title="Published Work History"
          subtitle="Based on https://github.com/hayesmaker/react-express-template"
        />
        <CardActions>
          <FloatingActionButton mini={true} onTouchTap={() => this.refs.myDialog.handleOpen()}>
            <ContentAdd />
          </FloatingActionButton>
          {
            this.state.shouldShowDelete?
              <IconButton tooltip="Delete Project" onTouchTap={() => this.deleteCurrentRecord()}>
                <DeleteForeverIcon fill="white" />
              </IconButton>: null
          }

        </CardActions>
        <CardText expandable={true}>
          Welcome to my portfolio projects administration table.  You can add, remove, and edit my portfolio arti les.
          This uses Express and React Template available here: <a href="https://github.com/hayesmaker/react-express-template" style={style}>React Express Template</a>
        </CardText>
        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>MONGO_ID</TableHeaderColumn>
              <TableHeaderColumn>TITLE</TableHeaderColumn>
              <TableHeaderColumn>DATE</TableHeaderColumn>
              <TableHeaderColumn>COMPANY</TableHeaderColumn>
              <TableHeaderColumn>DESC</TableHeaderColumn>
              <TableHeaderColumn>LINK</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.articles.map((article, idx) => (
                <TableRow key={idx}>
                  <TableRowColumn>{limitLength(article._id, 7)}</TableRowColumn>
                  <TableRowColumn>{article.title}</TableRowColumn>
                  <TableRowColumn>{article.date}</TableRowColumn>
                  <TableRowColumn>{article.company}</TableRowColumn>
                  <TableRowColumn>{article.desc}</TableRowColumn>
                  <TableRowColumn>{article.link}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
    )
  }
}

export default Articles;