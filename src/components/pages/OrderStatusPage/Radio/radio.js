import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio
  } from "@material-ui/core";
  import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
  import React from "react";
  import ReactDOM from "react-dom";
  import Input from "@material-ui/core/Input/Input";

  export const MUIRadioGroup = ({
    classes,
    isSubmitting,
    label,
    name,
    value,
    onChange,
    controls,
    InputVal,
    onInputChange
  }) => {
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          name={name}
          // className={classes.group}
          value={value}
          onChange={onChange}
        >
          {controls.map(({ value, disabled, label, ...rest }, i) => {
            return (
              <FormControlLabel
                key={value + i}
                value={label ? value : InputVal}
                disabled={disabled || isSubmitting}
                control={<Radio disabled={disabled || isSubmitting} />}
                label={
                  label ? (
                    label
                  ) : (
                    <Input
                    id={"Ga-radio-input"}
                    key={"Ga-radio-input"}
                    onChange={onInputChange}
                    disabled={disabled}
                    name={"Ga-radio-input"}
                    placeholder="others"
                    value={InputVal}
                  />
                  )
                }
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  };

  export default MUIRadioGroup;