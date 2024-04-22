// schema.js
import * as yup from 'yup';

export const schema = {
  config: {
    gridContainer: {
      // sx: {
      //   border: '1px solid black',
      // },
      spacing: 2,
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
      order: 3,
      validation: yup
        .number()
        .required('Age is required')
        .positive('Age must be a positive number')
        .integer('Age must be an integer'),
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
      order: 4,
      autocomplete: true,
      validation: yup.string().required('Country is required'),
      options: [
        { id: '1', value: 'USA' },
        { id: '2', value: 'Canada' },
        { id: '3', value: 'UK' },
        { id: '4', value: 'Australia' },
      ],
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
