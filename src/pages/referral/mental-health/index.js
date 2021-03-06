import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, Button, Hidden, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import green from "@material-ui/core/colors/green";
import stringify from "json-stringify-pretty-compact";

import withRoot from "../../../utils/withRoot";
import Page from "../../../components/Page";
import SEO from "../../../components/SEO";

import ClientDetails, { ClientValues } from "./ClientDetails";
import MedicalDetails, { MedicalValues } from "./MedicalDetails";
import Important, { ImportantValues } from "./Important";
import ReferrerDetails, { ReferrerValues } from "./ReferrerDetails";
import Additional, { AdditionalValues } from "./Additional";
import Confirmation from "../../../components/Confirmation";
import ErrorMessage from "../../../components/ErrorMessage";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { object, string } from "yup";

const CREATE_ELECTRONIC_SUBMISSION_MUTATION = gql`
  mutation CREATE_ELECTRONIC_SUBMISSION_MUTATION(
    $nmo_firstname: String
    $nmo_lastname: String
    $nmo_perferredname: String
    $nmo_birthdate: String
    $nmo_nhi: String
    $nmo_gendercode: Int
    $nmo_telephone1: String
    $nmo_mobilephone: String
    $nmo_address1_line1: String
    $nmo_address1_line2: String
    $nmo_address1_line3: String
    $nmo_address1_city: String
    $nmo_address1_postalcode: String
    $nmo_ethnicitycode: String
    $nmo_iwicode: String
    $nmo_contactname: String
    $nmo_contactphone: String
    $nmo_contactemail: String
    $nmo_nok1_fullname: String
    $nmo_nok1_address: String
    $nmo_nok1_relationship: String
    $nmo_nok1_telephone1: String
    $nmo_nok1_telephone2: String
    $nmo_info: String
    $nmo_rawdata: String
  ) {
    createElectronicSubmission(
      nmo_firstname: $nmo_firstname
      nmo_lastname: $nmo_lastname
      nmo_perferredname: $nmo_perferredname
      nmo_birthdate: $nmo_birthdate
      nmo_nhi: $nmo_nhi
      nmo_gendercode: $nmo_gendercode
      nmo_telephone1: $nmo_telephone1
      nmo_mobilephone: $nmo_mobilephone
      nmo_address1_line1: $nmo_address1_line1
      nmo_address1_line2: $nmo_address1_line2
      nmo_address1_line3: $nmo_address1_line3
      nmo_address1_city: $nmo_address1_city
      nmo_address1_postalcode: $nmo_address1_postalcode
      nmo_ethnicitycode: $nmo_ethnicitycode
      nmo_iwicode: $nmo_iwicode
      nmo_contactname: $nmo_contactname
      nmo_contactphone: $nmo_contactphone
      nmo_contactemail: $nmo_contactemail
      nmo_nok1_fullname: $nmo_nok1_fullname
      nmo_nok1_address: $nmo_nok1_address
      nmo_nok1_relationship: $nmo_nok1_relationship
      nmo_nok1_telephone1: $nmo_nok1_telephone1
      nmo_nok1_telephone2: $nmo_nok1_telephone2
      nmo_info: $nmo_info
      nmo_rawdata: $nmo_rawdata
    )
  }
`;

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  card: {
    marginBottom: 16,
    padding: 16,
    paddingBottom: 32
  },
  button: {},
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1rem 0 0"
  },
  stepper: {
    marginBottom: "1rem"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

const ValidationSchema = object().shape({
  reasonForReferral: string().required("reasonForReferral is required"),
  relevantHistory: string().required("relevantHistory selection is required"),
  riskIssues: string().required("riskIssues is required")
});

const steps = ["Client", "Medical", "Important", "Referrer", "Additional"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ClientDetails />;
    case 1:
      return <MedicalDetails />;
    case 2:
      return <Important />;
    case 3:
      return <ReferrerDetails />;
    case 4:
      return <Additional />;
    default:
      throw new Error("Unknown step");
  }
}

class MentalHealth extends React.Component {
  state = {
    value: 0,
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getRawData = values => {
    let formattedJSON = stringify(values, {
      indent: 4,
      margins: true,
      arrayMargins: true
    });

    return formattedJSON.replace(/["]|(nmo_)/g, "");
  };

  getFormattedData = values => {
    return `MENTAL HEALTH ACT STATUS
${values.mentalHealthStatus}

LEGAL CONSIDERATIONS
${values.legalConsiderations}

GP DETAILS
${values.nameOfGP}
${values.gpContactNumber}

MEDICAL ISSUES
${values.medicalIssues}

OTHER SERVICES INVOLVED 
${values.otherServicesInvolved}

IMPORTANT
Client Consent: ${values.clientConsent ? "Yes" : "No"}
Is Client Requesting Service: ${values.clientRequestingService ? "Yes" : "No"}
Parental Consent Given: ${values.parentalConsent ? "Yes" : "No"}

REFERRER DETAILS
${values.nmo_contactname}
Relationship: ${values.relationshipToPerson}

REFERRER ORGANISATION
${values.referrerOrganisation}
${values.referrerOrganisationAddress}
${values.referrerRole}
${values.nmo_contactphone}
${values.referrerCellPhone}
${values.nmo_contactemail}

REASON FOR REFERRAL / PRESENTING PROBLEM
(Current situations requiring referral, events contributing to referral, area’s of concern and need etc)
${values.reasonForReferral}

RELEVANT HISTORY
${values.relevantHistory}

RISK ISSUES
(E.g. Risk to self, others, property, previous attempts on life, domestic violence etc)
${values.riskIssues}`;
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const initialValues = {
      // ...ClientValues,
      // ...MedicalValues,
      // ...ImportantValues,
      // ...ReferrerValues,
      // ...AdditionalValues
    };

    return (
      <Mutation mutation={CREATE_ELECTRONIC_SUBMISSION_MUTATION}>
        {(createElectronicSubmission, { loading, error }) => {
          return (
            <Page
              className={classes.root}
              showHeader
              title="Mental Health Referral"
            >
              <Formik
                validationSchema={ValidationSchema}
                validateOnBlur={false}
                validateOnChange
                initialValues={initialValues}
                onSubmit={values => {
                  console.log(values);
                  createElectronicSubmission({
                    variables: {
                      ...values,
                      nmo_ethnicitycode: values.ethnicity
                        ? values.ethnicity.value
                        : "99",
                      nmo_iwicode: values.iwi ? values.iwi.value : "99",
                      nmo_info: this.getFormattedData(values),
                      nmo_rawdata: this.getFormattedData(values)
                    }
                  })
                    .then(result => {
                      console.log(result);

                      // go to the last confirmation step
                      this.setState(state => ({
                        activeStep: state.activeStep + 1
                      }));
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}
                render={props => {
                  const { handleSubmit } = props;

                  return (
                    <>
                      <SEO title="Mental Health Referral">
                        <meta
                          name="description"
                          content="Mental Health Referral Form"
                        />
                      </SEO>
                      <Form onSubmit={handleSubmit}>
                        <Card className={classes.card}>
                          <Stepper
                            activeStep={activeStep}
                            className={classes.stepper}
                          >
                            {steps.map(label => (
                              <Step key={label}>
                                <StepLabel>
                                  <Hidden smDown>{label}</Hidden>
                                </StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                          {activeStep === steps.length ? (
                            <>
                              <Confirmation>
                                Your referral has been sent. We have emailed
                                your referral confirmation, and will send you an
                                update when it has been reviewed.
                              </Confirmation>
                            </>
                          ) : (
                            <>
                              {getStepContent(activeStep)}
                              <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                  <Button
                                    onClick={this.handleBack}
                                    className={classes.button}
                                  >
                                    Back
                                  </Button>
                                )}

                                {activeStep < steps.length - 1 && (
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                  >
                                    Next
                                  </Button>
                                )}

                                {activeStep === steps.length - 1 && (
                                  <div className={classes.wrapper}>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      disabled={loading}
                                      type="submit"
                                    >
                                      Send Referral
                                    </Button>
                                    {loading && (
                                      <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>

                              <ErrorMessage error={error} />
                            </>
                          )}
                        </Card>
                      </Form>
                    </>
                  );
                }}
              />
            </Page>
          );
        }}
      </Mutation>
    );
  }
}

MentalHealth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(MentalHealth));
