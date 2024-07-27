import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import { STUDENT_SIGNUP_INITIAL_VALUES } from "@/constants/initialValues";
import { useFormik } from "formik";


const StudentSignUp = () => {
  const formik = useFormik({
    initialValues: STUDENT_SIGNUP_INITIAL_VALUES,
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
          <InputBox id='gender' labelName='Gender' inputClass='' labelClass=''
            name='gender' onChange={formik?.handleChange} type='text' value={formik?.values?.gender} />
        </div>
        <div>
          <InputBox id='dateOfBirth' labelName='Date of Birth' inputClass='' labelClass=''
            name='dateOfBirth' onChange={formik?.handleChange} type='date' value={formik?.values?.dateOfBirth} />
        </div>
        <div>
          <InputBox id='sclassName' labelName='Class Name' inputClass='' labelClass=''
            name='sclassName' onChange={formik?.handleChange} type='text' value={formik?.values?.sclassName} />
        </div>
        <div>
          <InputBox id='school' labelName='School' inputClass='' labelClass=''
            name='school' onChange={formik?.handleChange} type='text' value={formik?.values?.school} />
        </div>
        <div>
          <InputBox id='feesPaid' labelName='School' inputClass='' labelClass=''
            name='feesPaid' onChange={formik?.handleChange} type='text' value={formik?.values?.feesPaid} />
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

export default StudentSignUp