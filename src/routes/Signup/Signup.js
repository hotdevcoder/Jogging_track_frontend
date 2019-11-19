import React from 'react'
import { Button, Col, Form, Row, Input, Label } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { authStateSelector } from 'redux/selectors'
import { pick } from 'lodash'
import { signup, login } from 'redux/modules/auth'
import { useFormik } from 'formik'
import  './Signup.css'

const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'Required'
  } else if (values.first_name.length > 15) {
    errors.first_name = 'Must be 15 characters or less'
  }

  if (!values.last_name) {
    errors.last_name = 'Required'
  } else if (values.last_name.length > 20) {
    errors.last_name = 'Must be 20 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } 

  
  if (!values.confirm_password) {
    errors.password = 'Required'
  } 

  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Confirm Password should match with Password field.'
  }

  return errors
}

const Signup = props =>  {

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validate,
    onSubmit: values => {
      console.log(props)
      const { login, signup } = props
      signup({
        body: values,
        success: () => login({
          body: pick(values, ['email', 'password'])
        })
      })
    },
  })
    return (
      <Row>
          <Col sm={12} md={{ size: 6, offset: 3 }}>
            <h2 className='text-center mb-5'>Sign up</h2>
            <Form onSubmit={formik.handleSubmit} className={"signupform signupform--shadow"}>
              <Row>
                <Col sm={6} xs={12}>
                  <Label for="first_name">First Name</Label>
                  <Input
                    name='first_name'
                    id='first_name'
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <div>{formik.errors.first_name}</div>
                  ) : null}
                </Col>
                <Col sm={6} xs={12}>
                <Label for="last_name">Last Name</Label>
                <Input
                  name='last_name'
                  id='lsat_name'
                  type='text'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div>{formik.errors.last_name}</div>
                ) : null}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>    
                <Label for="email">Email</Label>
                <Input
                    name='email'
                    id='email'
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col sm={6} xs={12}>
                <Label for="password">Password</Label>
                <Input
                  name='password'
                  id='password'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
                </Col>
                <Col sm={6} xs={12}>
                <Label for="confirm_password">Confirm Password</Label>
                <Input
                  name='confirm_password'
                  id='confirm_password'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                />
                {formik.touched.confirm_password && formik.errors.confirm_password ? (
                  <div>{formik.errors.confirm_password}</div>
                ) : null}
                </Col>
              </Row>
              <Button color='primary' type='submit' className={'signupform-button--submit'}>Signup</Button>
            </Form>
          </Col>
        </Row>
    )
}

const selector = (state) => ({
  auth: authStateSelector
})

const actions = {
  login, 
  signup
}
export default compose(
  connect(selector, actions)
)(Signup)