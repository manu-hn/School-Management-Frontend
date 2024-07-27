import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import { TEACHER_LOGIN_INITIAL_VALUES } from "@/constants/initialValues";
import { useFormik } from "formik";


const TeacherLogin = () => {
  const formik = useFormik({
    initialValues: TEACHER_LOGIN_INITIAL_VALUES,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div>
          <InputBox id='email' labelName='Teacher Email' inputClass='' labelClass=''
            name='email' onChange={formik?.handleChange} type='email' value={formik?.values?.email} />
        </div>
        <div>
          <InputBox id='password' labelName='Password' inputClass='' labelClass=''
            name='password' onChange={formik?.handleChange} type='email' value={formik?.values?.password} />
        </div>
        <Button type="submit" classNames='bg-green-800'>Submit</Button>
      </form>
    </div>
  )
}

export default TeacherLogin