import React, { useState, ChangeEvent, FormEvent } from 'react';

interface UserProfileFormData {
  fullName: string;
  password: string;
  email: string;
  institution: string;
  emailOptions: {
    reviewsMyWork: boolean;
    submitsWork: boolean;
    metaReviewsMyWork: boolean;
  };
  actionPreference: string;
  handle: string;
  timeZone: string;
  language: string;
}

const Edit: React.FC = () => {
  const [formData, setFormData] = useState<UserProfileFormData>({
    fullName: '',
    password: '',
    email: '',
    institution: 'Other',
    emailOptions: {
      reviewsMyWork: false,
      submitsWork: false,
      metaReviewsMyWork: false,
    },
    actionPreference: 'canShowActions',
    handle: '',
    timeZone: 'Eastern Time',
    language: 'No Preference',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;
  
    if (target.type === 'checkbox') {
      setFormData({
        ...formData,
        emailOptions: {
          ...formData.emailOptions,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Full name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Confirm your password:
          <input
            type="password"
            name="confirmPassword"
            // This field is not part of the state since it's just for confirmation
            // Handle its validation on form submission
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          E-mail address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Institution:
          <select
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
          >
            <option value="Other">Other</option>
            {/* Add other options here */}
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="reviewsMyWork"
            checked={formData.emailOptions.reviewsMyWork}
            onChange={handleInputChange}
          />
          When someone else reviews my work
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="submitsWork"
            checked={formData.emailOptions.submitsWork}
            onChange={handleInputChange}
          />
          When someone else submits work I am assigned to review
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="metaReviewsMyWork"
            checked={formData.emailOptions.metaReviewsMyWork}
            onChange={handleInputChange}
          />
          When someone else reviews one of my reviews (meta-reviews my work)
        </label>
      </div>
      <div>
        Action Preference:
        <label>
          <input
            type="radio"
            name="actionPreference"
            value="canShowActions"
            checked={formData.actionPreference === 'canShowActions'}
            onChange={handleInputChange}
          />
          Homepage can show actions
        </label>
        <label>
          <input
            type="radio"
            name="actionPreference"
            value="cannotShowActions"
            checked={formData.actionPreference === 'cannotShowActions'}
            onChange={handleInputChange}
          />
          Homepage cannot show actions
        </label>
      </div>
      <div>
        <label>
          Handle:
          <input
            type="text"
            name="handle"
            value={formData.handle}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Preferred Time Zone:
          <select name="timeZone" value={formData.timeZone} onChange={handleInputChange}>
            <option value="Eastern Time">Eastern Time</option>
            {/* Add other timezone options here */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Preferred Language:
          <select name="language" value={formData.language} onChange={handleInputChange}>
            <option value="No Preference">No Preference</option>
            {/* Add other language options here */}
          </select>
        </label>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default Edit;
