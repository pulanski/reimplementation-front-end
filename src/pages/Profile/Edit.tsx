import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Edit.css'; 
import { Button } from 'react-bootstrap';

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
      <h2 className='h2-user-profile'>User Profile Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="fullName" style={{ fontWeight: 800 }}>Full name (last, first[middle]):</label>
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

            <div className='italics'>
                <p>If password field is blank, the password will not be updated</p>
            </div>

            <div className="form-field">
              <label htmlFor="email" style={{ fontWeight: 800 }}>E-mail address:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="institution" style={{ fontWeight: 800 }}>Institution:</label>
              <Field as="select" name="institution">
                <option value="North Carolina State University">North Carolina State University</option>
              </Field>
            </div>

            <div className="form-field action-preference custom-column-flex">
              <label style={{ fontWeight: 800 }}>Action Preference:</label>
              <div className="radio-group">
                <label style={{ marginRight: 8 }}>
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

            <hr />

            <div className='custom-column-flex'>
                <label style={{ fontWeight: 800 }}>Handle</label>
                <div>A "handle" can be used to conceal your username from people who view your wiki pages. If you have a handle, your wiki account should be named after your handle instead of after your user-ID. If you do not have a handle, your Expertiza user-ID will be used instead. A blank entry in the field below will cause the handle to be set back to your Expertiza user-ID. <div style={{ marginTop: -12 }}><br /></div>
                Note: By using this form, you are changing your default handle, which will be used for all future assignments. To change your handle for a specific assignment, select that assignment and choose the Change Handle action.</div>
            </div>

            <div className="form-field" style={{ marginTop: 28 }}>
              <label htmlFor="handle">Default Handle:</label>
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
              <Button type="submit" disabled={isSubmitting} variant="outline-success">
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Edit;
