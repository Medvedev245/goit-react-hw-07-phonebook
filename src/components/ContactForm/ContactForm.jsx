import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { PatternFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact } from 'components/Redux/thunk';
import { selectContacts } from 'components/Redux/selectors';

import { useNavigate } from 'react-router-dom';

const ContactsSchema = Yup.object().shape({
  name: Yup.string().required('* Name is required'),
  number: Yup.string().required('* Phone number is required'),
});

const initialValues = { name: '', number: '' };

export const ContactsForm = () => {
  const allcontacts = useSelector(selectContacts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    if (allcontacts.find(contact => contact.name === values.name)) {
      return alert(`${values.name} is already in contacts`);
    }

    if (allcontacts.find(contact => contact.number === values.number)) {
      return alert(`${values.number} is already in contacts`);
    }

    dispatch(addNewContact({ ...values }));
    navigate('/');
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactsSchema}
        onSubmit={handleSubmit}
      >
        <styled autoComplete="off">
          <div>
            <Field
              label="Name"
              name="name"
              multiline
              variant="standard"
              className="fieldName"
            />
          </div>
          <ErrorMessage name="name" component="span" style={{ color: 'red' }} />

          <div>
            <Field
              as={PatternFormat}
              name="number"
              variant="standard"
              format="+38 (0##) ### ## ##"
              allowEmptyFormatting={true}
              mask="_"
            />
          </div>
          <ErrorMessage
            name="number"
            component="span"
            style={{ color: 'red' }}
          />

          <button type="submit"></button>
        </styled>
      </Formik>
    </div>
  );
};
