import React, { Fragment, useState } from 'react';
import cheerio from 'cheerio';
import { GlobalStyle, Text, Form, Button, Status } from './App.styles';

const App = () => {
  const [status, setStatus] = useState('');
  const [urlText, setValue] = useState('');
  const corsAnywhere = 'https://saibot-no-cors.herokuapp.com/';

  const download = (filename, data) => {
    var element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const getAllLinks = $ => {
    const linksObj = $('a[href], img[src]');    
    const links = Object.values(linksObj)
      .filter(val => val.attribs)
      .map(link => link.attribs.href || link.attribs.src);

    if (links.length > 0) {
      setStatus('Downloaded');
      download('sitemap.json', JSON.stringify(links));
    } else setStatus('Nothing to crawl');
  };

  const crawlURL = async url => {
    setStatus('Crawling...');
    try {
      const res = await fetch(`${corsAnywhere}${url}`);
      const body = await res.text();
      const $ = cheerio.load(body);

      getAllLinks($);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    crawlURL(urlText);
  };

  return (
    <Fragment>
      <GlobalStyle />
      <Form onSubmit={handleSubmit}>
        <Text onChange={handleChange} />
        <Button>Submit</Button>
        <Status>{status}</Status>
      </Form>
    </Fragment>
  );
};

export default App;
