import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import { TEACHER_SIGNUP_INITIAL_VALUES } from "@/constants/initialValues";
import { useFormik } from "formik";


const SignUpTeacher = () => {
  const formik = useFormik({
    initialValues: TEACHER_SIGNUP_INITIAL_VALUES,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div>
          <InputBox id='name' labelName='teacher Name' inputClass='' labelClass=''
            name='name' onChange={formik?.handleChange} type='text' value={formik?.values?.name} />
        </div>
        <div>
          <InputBox id='email' labelName='Email' inputClass='' labelClass=''
            name='email' onChange={formik?.handleChange} type='email' value={formik?.values?.email} />
        </div>
        <div>
          <InputBox id='dateOfBirth' labelName='Date of Birth' inputClass='' labelClass=''
            name='dateOfBirth' onChange={formik?.handleChange} type='date' value={formik?.values?.dateOfBirth} />
        </div>
        <div>
          <InputBox id='password' labelName='Password' inputClass='' labelClass=''
            name='name' onChange={formik?.handleChange} type='password' value={formik?.values?.password} />

        </div>
        <div>
          <InputBox id='school' labelName='School Name' inputClass='' labelClass=''
            name='school' onChange={formik?.handleChange} type='text' value={formik?.values?.school} />

        </div>
        <div>
          <InputBox id='teachSubject' labelName='Teacher Subject' inputClass='' labelClass=''
            name='teachSubject' onChange={formik?.handleChange} type='text' value={formik?.values?.teachSubject} />

        </div>
        <div>
          <InputBox id='teachSClass' labelName='Class' inputClass='' labelClass=''
            name='teachSClass' onChange={formik?.handleChange} type='text' value={formik?.values?.teachSClass} />

        </div>
        <Button type="submit" classNames='bg-green-800'>Submit</Button>
      </form>
    </div>
  )
}

export default SignUpTeacher;