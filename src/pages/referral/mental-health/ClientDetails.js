import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Card, CardHeader, CardContent } from "@material-ui/core";
import { Field } from "formik";
import { TextField, Autocomplete } from "material-ui-formik-components";

import iwi from "./iwi.json";

const styles = theme => ({
    card: {
      padding: "16px 32px 32px 32px"
    }
  }),
  ClientDetails = props => {
    return (
      <Card className={props.classes.card}>
        <CardHeader
          title="Client Details"
          titleTypographyProps={{ variant: "h5" }}
        />
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6} md={4}>
              <Field
                name="surname"
                label="Surname"
                fullWidth
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Field
                name="firstnames"
                label="First Name/s"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Field
                name="preferredName"
                label="Preferred Name"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <Field
                name="nhi"
                label="NHI"
                placeholder="ABC9999"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <Field
                name="dateOfBirth"
                label="Date Of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item />

            <Grid item xs={12} sm={12} md={6}>
              <Field
                name="address"
                label="Address"
                multiline
                rows={6}
                margin="dense"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Field
                    required
                    name="ethnicity"
                    label="Ethnicity"
                    options={[
                      { value: "", label: "" },
                      { value: "Maori", label: "Maori" },
                      {
                        value: "Pacific Islander",
                        label: "Pacific Islander"
                      },
                      { value: "NZ European", label: "NZ European" }
                    ]}
                    component={Autocomplete}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    name="iwi"
                    label="Iwi"
                    fullWidth
                    options={iwi}
                    component={Autocomplete}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Field
                name="homePhone"
                label="Home Phone"
                margin="dense"
                fullWidth
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                name="cellPhone"
                label="Cell Phone"
                margin="dense"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="mentalHealthStatus"
                label="Mental Health Act Status"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="legalConsiderations"
                label="Legal considerations"
                fullWidth
                component={TextField}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

ClientDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

const ClientValues = {
  surname: "Tutemake",
  firstnames: "John",
  preferredName: "JT Jackhammer",
  nhi: "ABC9999",
  dateOfBirth: "1980-12-28",
  address: "157 Fraser Street\nTauranga 3112",
  homePhone: "07 5780396",
  cellPhone: "021 624587",
  ethnicity: [{ value: "Maori", label: "Maori" }],
  iwi: [
    {
      label: "Ngāti Kurī",
      value: "AF3"
    },
    {
      label: "Ngāpuhi",
      value: "AF4"
    }
  ],
  mentalHealthStatus: "Good mental status",
  legalConsiderations: "Has a pending police conviction"
};

export { ClientValues };

export default withStyles(styles)(ClientDetails);
