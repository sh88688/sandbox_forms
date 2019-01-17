import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
const InputBuilder = props => {
  let inputElement = null;
  let startAdornment = null;
  let endAdornment = null;

  if (props.inputAdornment) {
    startAdornment = props.inputAdornment.startAdornment ? (
      <InputAdornment position={props.inputAdornment.startAdornment.position}>
        {props.inputAdornment.startAdornment.value}
      </InputAdornment>
    ) : null;
    endAdornment = props.inputAdornment.endAdornment ? (
      <InputAdornment position={props.inputAdornment.endAdornment.position}>
        {props.inputAdornment.endAdornment.value}
      </InputAdornment>
    ) : null;
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <TextField
          error={props.errorValue === false && props.touched !== false}
          onChange={props.changed}
          {...props.elementConfig}
          InputProps={{
            startAdornment: startAdornment,
            endAdornment: endAdornment
          }}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <TextField
          select
          value={props.value}
          {...props.elementConfig.configs}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.displayValue}
            </MenuItem>
          ))}
        </TextField>
      );
      break;
    case "radio":
      inputElement = (
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            style={{ paddingTop: "8px", marginLeft: "2px" }}
          >
            <Typography component="h5" variant="subtitle1">
              {props.elementConfig.configs.label}
            </Typography>
          </FormLabel>
          <RadioGroup
            {...props.elementConfig.configs}
            onChange={props.changed}
            value={props.value}
            row
          >
            {props.elementConfig.options.map(option => (
              <FormControlLabel
                key={option.value}
                {...option}
                control={<Radio color={props.elementConfig.configs.color} />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default InputBuilder;
