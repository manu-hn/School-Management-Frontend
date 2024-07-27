import InputBox from "@/components/ui/InputBox"

import Button from "@/components/ui/Button"
import { ADMIN_INITIAL_VALUES } from '@/constants/initialValues';
import { useFormik } from "formik";
const AdminRegistration = () => {
  const formik = useFormik({
    initialValues: ADMIN_INITIAL_VALUES,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div><form onSubmit={formik.handleSubmit}>
      <div>
        <InputBox id='name' labelName='Full Name' inputClass='' labelClass=''
          name='name' onChange={formik?.handleChange} type='text' value={formik?.values?.name} />
      </div>
      <div>
        <InputBox id='email' labelName='Email' inputClass='' labelClass=''
          name='email' onChange={formik?.handleChange} type='email' value={formik?.values?.email} />

      </div>
      <div>
        <InputBox id='password' labelName='Password' inputClass='' labelClass=''
          name='password' onChange={formik?.handleChange} type='password'
          value={formik?.values?.password} />

      </div>
      <div>
        <InputBox id='schoolName' labelName='School Name' inputClass='' labelClass=''
          name='schoolName' onChange={formik?.handleChange} type='text' value={formik?.values?.schoolName} />
      </div>

      <Button type="submit" classNames='bg-green-800'>Submit</Button>
    </form></div>
  )
}

export default AdminRegistration