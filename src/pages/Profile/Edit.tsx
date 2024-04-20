import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Edit.css'; // Make sure to import the CSS file

const Edit: React.FC = () => {
  const initialValues = {
    fullName: '',
    password: '',
    confirmPassword: '',
    email: '',
    institution: 'North Carolina State University',
    actionPreference: 'cannotShowActions',
    handle: '',
    timeZone: 'GMT-05:00',
    language: 'No Preference',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    handle: Yup.string().required('Handle is required'),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="edit-form-container">
      <h2>User Profile Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="fullName">Full name (last, first[middle]):</label>
              <Field type="text" name="fullName" />
              <ErrorMessage name="fullName" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm your password:</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="email">E-mail address:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="institution">Institution:</label>
              <Field as="select" name="institution">
                <option value="North Carolina State University">North Carolina State University</option>
              </Field>
            </div>

            <div className="form-field action-preference">
              <label>Action Preference:</label>
              <div className="radio-group">
                <label>
                  <Field type="radio" name="actionPreference" value="canShowActions" />
                  Homepage can show actions
                </label>
                <label>
                  <Field type="radio" name="actionPreference" value="cannotShowActions" />
                  Homepage cannot show actions
                </label>
              </div>
              <ErrorMessage name="actionPreference" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="handle">Handle:</label>
              <Field type="text" name="handle" />
              <ErrorMessage name="handle" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="timeZone">Preferred Time Zone:</label>
              <Field as="select" name="timeZone">
                <option value="GMT-05:00">GMT-05:00 Eastern Time (US)</option>
              </Field>
            </div>

            <div className="form-field">
              <label htmlFor="language">Preferred Language:</label>
              <Field as="select" name="language">
                <option value="No Preference">No Preference</option>
              </Field>
            </div>

            <div className="form-field">
              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Edit;
