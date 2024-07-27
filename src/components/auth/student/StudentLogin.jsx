
import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/InputBox';
import { STUDENT_LOGIN_INITIAL_VALUES } from '@/constants/initialValues';
import { useFormik } from 'formik';

const StudentLogin = () => {
  const formik = useFormik({
    initialValues: STUDENT_LOGIN_INITIAL_VALUES,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div>
          <InputBox id='studentName' labelName='Student Name' inputClass='' labelClass=''
            name='studentName' onChange={formik?.handleChange} type='text' value={formik?.values?.studentName} />
        </div>
        <div>
          <InputBox id='rollNum' labelName='Roll Number' inputClass='' labelClass=''
            name='rollNum' onChange={formik?.handleChange} type='text' value={formik?.values?.rollNum} />
        </div>
        <div>
          <InputBox id='password' labelName='Password' inputClass='' labelClass=''
            name='name' onChange={formik?.handleChange} type='password' value={formik?.values?.password} />

        </div>
        <Button type="submit" classNames='bg-green-800'>Submit</Button>
      </form>
    </div>
  )
}

export default StudentLogin