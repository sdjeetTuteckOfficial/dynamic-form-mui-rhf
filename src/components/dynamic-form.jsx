import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Autocomplete, Grid } from '@mui/material';
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
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
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
            <Controller
              name={field.name}
              control={control}
              defaultValue=''
              render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
              }) => (
                <>
                  {field.type === 'autocomplete' ? (
                    <Autocomplete
                      value={
                        field.options.find((option) => option.id === value) ||
                        null
                      }
                      onChange={(e, selectedOption) => {
                        onChange(selectedOption ? selectedOption.id : null);
                      }}
                      options={field.options || []}
                      getOptionLabel={(option) => option?.value || ''}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={field.label}
                          fullWidth
                          variant='outlined'
                          margin='normal'
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      name={name}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      label={field.label}
                      fullWidth
                      variant='outlined'
                      margin='normal'
                      error={!!error}
                      helperText={error?.message}
                      placeholder={field.placeholder}
                      type={field.type}
                    />
                  )}
                </>
              )}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        endIcon={<Send />}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </form>
  );
};

DynamicForm.propTypes = {
  schema: PropTypes.shape({
    config: PropTypes.shape({
      gridContainer: PropTypes.shape({
        sx: PropTypes.object,
        spacing: PropTypes.number,
      }),
    }),
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['text', 'number', 'autocomplete']).isRequired,
        placeholder: PropTypes.string,
        order: PropTypes.number.isRequired,
        validation: PropTypes.object,
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