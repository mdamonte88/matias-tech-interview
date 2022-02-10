import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyView from "./views/SurveyView"
import ResponsesView from "./views/ResponsesView"
import { Container, Button } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container className="main pad-t">
        <Link to="/survey/1">
          <Button className="text-uppercase" variant="secondary" block={true}>
              Take a Survey
          </Button>
        </Link>
        <br/>
        <Link to="/responses">
          <Button className="text-uppercase" variant="secondary" block={true}>
              Show All Responses
          </Button>
        </Link>
        <Switch>
          <Route path="/survey">
            <SurveyView surveyId={1}/>
          </Route>
          <Route path="/responses">
            <ResponsesView />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
