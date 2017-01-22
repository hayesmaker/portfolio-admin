import React, {Component} from 'react';
import './Articles.css';

class Articles extends Component {
  constructor(articles) {
    super();
    console.log('Articles const :: articles=', articles);
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DATE</th>
            <th>COMPANY</th>
            <th>DESC</th>
            <th>LINK</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.articles.map((article, idx) => (
            <tr key={idx}>
              <td>{article.title}</td>
              <td>{article.date}</td>
              <td>{article.company}</td>
              <td>{article.desc}</td>
              <td>{article.link}</td>
            </tr>
          ))
        }
        </tbody>

      </table>
    )
  }
}

export default Articles;

/*
 {
 title: 'Thrust 30',
 date: 'Current',
 company: 'HayesMaker Games',
 desc: 'Phaserjs, and P2 Physics are being used to create this fully open source space based cave explorer. Half puzzler, half shoot-em-up.  Technical features include End-to-end testing (using Phase-2e) and Unit tests.  Now on iOS Appstore & Steam Greenlight',
 thumb: {
 src:'images/title-thrust-engine.png',
 size:'700x500'
 },
 link: 'http://www.thrust30.com'
 },
 */