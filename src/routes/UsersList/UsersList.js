import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { show } from 'redux-modal'
import { withRouter } from 'react-router'
import { getUsers, deleteUser } from 'redux/modules/user'
import { ucFirst } from 'helpers'
import { usersListSelector } from 'redux/selectors'
import confirm from 'containers/ConfirmModal'
import { MdAddCircleOutline } from 'react-icons/md'
// import Pagination from 'components/Pagination'
import ReportModal from 'containers/ReportModal'

class UsersList extends Component {
  static propTypes = {
    deleteUser: PropTypes.func,
    getUsers: PropTypes.func,
    usersList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    console.log("Dashboard willmount")
    const { getUsers } = this.props // delete params 
    getUsers() // {params}
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser } = this.props
    confirm('Are you sure to delete the user?').then(
      () => {
        deleteUser({ id })
      }
    )
  }

  handleViewReport = (user) => () => {
    const { show } = this.props
    console.log("click report modal")
    show('reportModal', { user })
  }

  handlePagination = (pagination) => {
    const { getUsers } = this.props // delete params 
    getUsers()
  }
/*
{
      params: {
        ...pick(params, ['page', 'page_size']),
        ...pagination
      }
    }
 */
  render() {
    const { usersList } = this.props // delete params
    // const pagination = pick(params, ['page', 'page_size', 'count'])

    return (
      <div>
        <h2 className='text-center mb-5'>Manage Users</h2>
        <div className='text-right mb-2'>
          <Link to='/users/new' className='btn btn-primary'>
            <MdAddCircleOutline size='1.2em' /> Add a New User
          </Link>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{ucFirst(user.role)}</td>
                <td className='text-right'>
                  <Button color='info' size='sm' onClick={this.handleViewReport(user)}>
                    Report
                  </Button>
                  {' '}
                  <Button color='primary' tag={Link} size='sm' to={`/users/edit/${user.id}`}>
                    Edit
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <ReportModal />
      </div>
    )
  }
}
// <Pagination pagination={pagination} setPagination={this.handlePagination} />
const selector = createStructuredSelector({
  usersList: usersListSelector,
  // params: usersParamsSelector
})

const actions = {
  getUsers,
  deleteUser,
  show
}

export default compose(
  connect(selector, actions),
  withRouter
)(UsersList)
