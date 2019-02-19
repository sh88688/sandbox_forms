import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import InputBuilder from "./Components/InputBuilder";
import ErrorBoundary from "./Components/ErrorBoundary";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import checkValidity from "./Components/Validator";
import isFormValid from "./Components/FormValidSetter";
import jsonData from "./JsonData/formJson";
class FormRender extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      iForm: jsonData,
      formIsValid: false,
      loading: false
    };
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.iForm) {
      formData[formElementIdentifier] = this.state.iForm[
        formElementIdentifier
      ].value;
    }
    setTimeout(() => {
      console.log(formData);
      this.setState({ loading: false });
    }, 2000);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    //make a copy of iForm State
    const updatediForm = {
      ...this.state.iForm
    };
    // make a copy of Changed Element
    const updatedFormElement = {
      ...updatediForm[inputIdentifier]
    };
    //update changed value
    updatedFormElement.value = event.target.value;

    //check validity
    let getValidity = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.valid = getValidity.isValid;
    updatedFormElement.elementConfig.helperText = getValidity.errorText;
    //updated element's touched property
    updatedFormElement.touched = true;
    updatediForm[inputIdentifier] = updatedFormElement;

    //Checking The whole form Validity
    let formIsValid = isFormValid(updatediForm);

    this.setState({ iForm: updatediForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];

    let Loader = this.state.loading ? <LinearProgress color="secondary" /> : null;

    for (let key in this.state.iForm) {
      formElementsArray.push({
        id: key,
        config: this.state.iForm[key]
      });
    }
    let form = (
      <form>
        <Grid container spacing={24}>
          {formElementsArray.map(formElement => (
            <InputBuilder
              key={formElement.id}
              touched={formElement.config.touched}
              errorValue={formElement.config.valid}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              inputAdornment={formElement.config.inputAdornment}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
        </Grid>
        <Button
          variant="contained"
          onClick={this.submitHandler}
          disabled={!this.state.formIsValid}
          color="primary"
        >
          Send Form
        </Button>
      </form>
    );

    return (
      <div style={{ backgroundColor: "#fafafa" }}>
        <AppBar position="static" style={{ backgroundColor: "#2196f3" }}>
          <Toolbar>
            <Typography variant="h6" fontFamily="Monospace" color="inherit">
              &nbsp; iForms
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Typography
          fontFamily="Monospace"
          align="center"
          variant="h6"
          color="inherit"
        >
          Fill the details :
        </Typography>
        <br />
        <Grid container spacing={24} justify={"center"}>
          <Grid item xs={6}>
            <Card>
              {Loader}
              <CardContent>
                <ErrorBoundary>{form}</ErrorBoundary>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormRender;
