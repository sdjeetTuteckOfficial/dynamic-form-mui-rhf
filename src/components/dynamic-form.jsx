import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Autocomplete,
  Grid,
  Typography,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import * as yup from 'yup';

const DynamicForm = ({ schema }) => {
  const sortedSchema = schema.fields.sort((a, b) => a.order - b.order);

  const validationSchema = yup.object().shape(
    sortedSchema.reduce((acc, field) => {
      acc[field.name] = field.validation || yup.string();
      return acc;
    }, {})
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: schema?.config?.defaultValues,
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  const getFieldComponent = (
    field,
    { onChange, onBlur, value, name },
    error
  ) => {
    if (field.type === 'date') {
      return (
        <TextField
          name={field.name}
          type='date'
          onChange={onChange}
          size={field?.size || 'medium'}
          onBlur={onBlur}
          value={value || ''}
          // label={field.label}
          fullWidth
          variant='outlined'
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    }

    if (field.type === 'autocomplete') {
      return (
        <Autocomplete
          value={field.options.find((option) => option.id === value) || null}
          onChange={(e, selectedOption) => {
            onChange(selectedOption ? selectedOption.id : null);
          }}
          options={field.options || []}
          getOptionLabel={(option) => option?.value || ''}
          renderInput={(params) => (
            <TextField
              {...params}
              // label={field.label}
              fullWidth
              size={field?.size || 'medium'}
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      );
    }

    if (field.type === 'file') {
      return (
        <TextField
          type='file'
          onChange={(e) => onChange(e.target.files[0])}
          onBlur={onBlur}
          name={field.name}
          fullWidth
          variant='outlined'
          size={field?.size || 'medium'}
          inputProps={{
            accept: 'image/*',
          }}
          error={!!error}
          helperText={error?.message}
        />
      );
    }

    return (
      <TextField
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ''}
        size={field?.size || 'medium'}
        // label={field.label}
        fullWidth
        variant='outlined'
        error={!!error}
        helperText={error?.message}
        placeholder={field.placeholder}
        type={field.type}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        sx={schema?.config?.gridContainer?.sx}
        spacing={schema?.config?.gridContainer?.spacing}
      >
        {sortedSchema.map((field) => (
          <Grid
            item
            key={field.name}
            xs={field.gridItemProps.xs}
            sm={field.gridItemProps.sm}
            md={field.gridItemProps.md}
            lg={field.gridItemProps.lg}
            xl={field.gridItemProps.xl}
          >
            <Typography fontWeight={700} mb={0.2}>
              {field.label}
            </Typography>
            <Controller
              name={field.name}
              control={control}
              defaultValue=''
              render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
              }) =>
                getFieldComponent(
                  field,
                  { onChange, onBlur, value, name },
                  error
                )
              }
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        display={schema?.config?.submitButton?.display || 'block'}
        justifyContent={schema?.config?.submitButton?.justifyContent || 'left'}
      >
        <Button
          type='submit'
          variant={schema?.config?.submitButton?.variant || 'contained'}
          color={schema?.config?.submitButton?.color || 'primary'}
          endIcon={<Send />}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

DynamicForm.propTypes = {
  schema: PropTypes.shape({
    config: PropTypes.shape({
      defaultValues: PropTypes.object,
      gridContainer: PropTypes.shape({
        sx: PropTypes.object,
        spacing: PropTypes.number,
        display: PropTypes.string,
      }),
      submitButton: PropTypes.shape({
        sx: PropTypes.object,
        display: PropTypes.string,
        justifyContent: PropTypes.string,
        variant: PropTypes.string,
        color: PropTypes.string,
      }),
    }),
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
          'text',
          'number',
          'autocomplete',
          'date',
          'file',
        ]).isRequired,
        placeholder: PropTypes.string,
        order: PropTypes.number.isRequired,
        validation: PropTypes.object,
        size: PropTypes.string,
        gridItemProps: PropTypes.shape({
          xs: PropTypes.number.isRequired,
          sm: PropTypes.number.isRequired,
          md: PropTypes.number.isRequired,
          lg: PropTypes.number.isRequired,
          xl: PropTypes.number.isRequired,
        }),
        options: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
  }).isRequired,
};

export default DynamicForm;
