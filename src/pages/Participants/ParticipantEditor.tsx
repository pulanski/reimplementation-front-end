import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  Button,
  InputGroup,
  Row,
  Col,
  Form as BootstrapForm,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import FormSelect from "components/Form/FormSelect";
import useAPI from "hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { alertActions } from "store/slices/alertSlice";
import { HttpMethod } from "utils/httpMethods";
import { RootState } from "store/store";
import { ROLE } from "utils/interfaces";
import { IParticipantFormValues, transformParticipantRequest } from "./participantUtil";

/**
 * @author Mrityunjay Joshi on October, 2023
 */

const initialValues: IParticipantFormValues = {
  type: "",
  assignment_id: -1,
  course_id: -1,
  user_id: -1,
  name: "",
};

interface IParticipantEditor {
  mode: "create" | "update";
  type: string;
}

const ParticipantEditor: React.FC<IParticipantEditor> = ({ mode, type }) => {
  const roleOptions = [
    {
      label: "Participant",
      value: "participant",
      description:
        "Engages fully in project activities, submitting work and participating in peer reviews.",
    },
    { label: "Reader", value: "reader", description: "Just takes the quiz on the artifact" },
    {
      label: "Reviewer",
      value: "reviewer",
      description:
        "Assesses the work of peers, providing feedback and recommendations for improvement.",
    },
    {
      label: "Submitter",
      value: "submitter",
      description:
        "Responsible for uploading content or documents pertinent to the project or course requirements.",
    },
    {
      label: "Mentor",
      value: "mentor",
      description:
        "Guides participants through advice, expertise, and feedback to enhance their learning and project outcomes.",
    },
  ];
  const { data: participantResponse, error: participantError, sendRequest } = useAPI();
  const auth = useSelector(
    (state: RootState) => state.authentication,
    (prev, next) => prev.isAuthenticated === next.isAuthenticated
  );
  const { participantData, users }: any = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { typeId } = useParams();
  // logged-in participant is the parent of the participant being created and the institution is the same as the parent's

  // Close the modal if the participant is updated successfully and navigate to the participants page
  useEffect(() => {
    if (
      participantResponse &&
      participantResponse.status >= 200 &&
      participantResponse.status < 300
    ) {
      dispatch(
        alertActions.showAlert({
          variant: "success",
          message: `Participant ${participantData.name} ${mode}d successfully!`,
        })
      );
      navigate(location.state?.from ? location.state.from : `/${type}/${typeId}/participants/new`);
    }
  }, [
    dispatch,
    mode,
    navigate,
    participantData.name,
    participantResponse,
    location.state?.from,
    type,
  ]);

  // Show the error message if the participant is not updated successfully
  useEffect(() => {
    participantError &&
      dispatch(alertActions.showAlert({ variant: "danger", message: participantError }));
  }, [participantError, dispatch]);

  const onSubmit = (
    values: IParticipantFormValues,
    submitProps: FormikHelpers<IParticipantFormValues>
  ) => {
    let method: HttpMethod = HttpMethod.POST;
    let url: string = "/participants";

    if (mode === "update") {
      url = `/participants/${values.id}`;
      method = HttpMethod.PATCH;
    }

    values.type = type;
    if (type === "assignments" || type === "student_tasks") {
      values.assignment_id = typeId as unknown as number;
    } else if (type === "courses") {
      values.course_id = typeId as unknown as number;
    }

    // to be used to display message when participant is created
    participantData.name = values.name;
    sendRequest({
      url: url,
      method: method,
      data: values,
      transformRequest: transformParticipantRequest,
    });
    submitProps.setSubmitting(false);
  };

  return (
    <>
      {participantError && <p className="text-danger">{participantError}</p>}

      <Formik
        initialValues={mode === "update" ? participantData : initialValues}
        onSubmit={onSubmit}
        validateOnChange={false}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form>
            <Row className="align-items-center">
              <Col xs={12} md={3}>
                <InputGroup className="d-flex align-items-center">
                  <InputGroup.Text id="user-prepend">Users</InputGroup.Text>
                  <FormSelect
                    controlId="participant-user"
                    name="user_id"
                    options={users}
                    disabled={mode === "update" || auth.user.role !== ROLE.ADMIN.valueOf()}
                  />

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-add-participant">Add Participant</Tooltip>}
                  >
                    <Button
                      variant="outline-success"
                      type="submit"
                      disabled={
                        !(
                          formik.isValid &&
                          formik.dirty &&
                          Object.keys(formik.touched).length > 0
                        ) || formik.isSubmitting
                      }
                      className="ms-2"
                    >
                      Add
                    </Button>
                  </OverlayTrigger>
                </InputGroup>
              </Col>

              <Col xs={12} md={6}>
                {roleOptions.map((role) => (
                  <div key={role.value} className="mb-3 ms-3 d-inline-flex align-items-center">
                    <Field
                      type="radio"
                      id={role.value}
                      name="role"
                      value={role.value}
                      style={{ marginRight: "5px" }}
                    />
                    <BootstrapForm.Label
                      htmlFor={role.value}
                      className="ms-1"
                      style={{ marginRight: "5px" }}
                    >
                      {role.label}
                    </BootstrapForm.Label>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-${role.value}`}>{role.description}</Tooltip>}
                    >
                      <img
                        src="/assets/icons/info.png" // Correct path
                        alt="Info"
                        style={{
                          width: "16px",
                          height: "16px",
                          verticalAlign: "middle", // Aligns the icon vertically with adjacent text
                          cursor: "pointer",
                        }}
                      />
                    </OverlayTrigger>
                  </div>
                ))}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ParticipantEditor;
