import TurndownService from "turndown";  
import fs from 'fs';
import bodyParser from "body-parser";  
import express from "express";
import matter from "gray-matter";

const app = express();
app.use(bodyParser.json());
const turndownService = new TurndownService();
const port = 8080;

app.get('/markdown/publish', (req, res) => {
     const { frontmatter, html, path } = req.body;
     let testHtml = '<h3>Test title</h3><p>Test</p>';
     testHtml = turndownService.turndown(testHtml);
     const frontmatterMock = {
          slug: '/test3',
          title: 'Test 2',
          tags: ["Test 1", "Test 2"]
     };
     const updatedDocument = matter.stringify(testHtml, frontmatterMock);
     fs.writeFile('test.md', updatedDocument, (err) => {
          if(err) throw err;
          console.log("Markdown file updated");
     });
     console.log(updatedDocument);
     res.json({});
});

app.listen(port, () => console.log(`cms mock app listening on port ${port}!`))
