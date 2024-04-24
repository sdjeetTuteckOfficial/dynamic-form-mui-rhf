// schema.js
import * as yup from 'yup';

export const schema = {
  config: {
    defaultValues: {
      firstName: '',
      lastName: '',
      age: null,
      country: null,
      dateOfBirth: null,
      fileUpload: null,
    },
    gridContainer: {
      // sx: {
      //   border: '1px solid black',
      // },
      spacing: 2,
    },
    submitButton: {
      display: 'flex',
      justifyContent: 'right',
      variant: 'contained',
      color: 'primary',
    },
  },
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      order: 1,
      validation: yup.string().required('First name is required'),
      size: 'small',
      gridItemProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      order: 2,
      validation: yup.string().required('Last name is required'),
      size: 'small',
      gridItemProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Enter your age',
      size: 'small',
      order: 3,
      validation: yup
        .number()
        .required('Age is required')
        .positive('Age must be a positive number')
        .integer('Age must be an integer')
        .required('Age is required'),
      gridItemProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'autocomplete',
      placeholder: 'Select your country',
      url: 'http://localhost:3001/api/countries',
      size: 'small',
      order: 4,
      // autocomplete: true,
      validation: yup.string().required('Country is required'),
      // options: [
      //   { id: '1', value: 'USA' },
      //   { id: '2', value: 'Canada' },
      //   { id: '3', value: 'UK' },
      //   { id: '4', value: 'Australia' },
      // ],
      gridItemProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
    {
      name: 'city',
      label: 'City',
      type: 'autocomplete',
      placeholder: 'Select your city',
      url: 'http://localhost:3001/api/cities',
      size: 'small',
      order: 4,
      // autocomplete: true,
      validation: yup.string().required('Country is required'),
      // options: [
      //   { id: '1', value: 'USA' },
      //   { id: '2', value: 'Canada' },
      //   { id: '3', value: 'UK' },
      //   { id: '4', value: 'Australia' },
      // ],
      gridItemProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      muiDatepicker: true,
      order: 5,
      validation: yup.date().required('Date of Birth is required'),
      size: 'small',
      gridItemProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
    {
      name: 'fileUpload',
      label: 'File Upload',
      type: 'file',
      order: 6,
      size: 'small',
      validation: yup
        .mixed()
        .required('File upload is required')
        .test('fileSize', 'File is too large', (value) => {
          return value ? value.size <= 5242880 : true; // limit: 5MB
        })
        .test('fileType', 'Unsupported file type', (value) => {
          return value
            ? ['image/jpeg', 'image/png'].includes(value.type)
            : true; // Allowed file types
        }),
      gridItemProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
  ],
};
