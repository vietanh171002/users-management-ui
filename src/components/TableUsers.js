import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fechAllUser } from '../services/UserSevice';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser.';
function TableUsers() {
    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    //call api
    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fechAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
            setTotalPages(res.total_pages);
            setTotalUsers(res.total);
        }
    };

    //pagination
    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    };

    //modal add user
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const handleClose = () => {
        setIsShowModalAddNew(false);
    };
    const handleUpdateUser = (user) => {
        setListUsers([user, ...listUsers]);
    };

    //modal edit user
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [editedUserData, setEditedUserData] = useState('');
    const [index, setIndex] = useState('');
    const handleCloseEdit = () => {
        setIsShowModalEditUser(false);
    };
    const handleUpdateUser2 = (newName) => {
        setListUsers((prevArray) =>
            prevArray.map((element, i) => (i === index ? { ...element, first_name: newName, last_name: '' } : element)),
        );
        setIndex('');
        setEditedUserData('');
    };

    return (
        <>
            <div className="my-3 d-flex justify-content-between">
                <span className="fs-4 fw-bold">List users:</span>
                <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                    Add new user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className="text-white bg-warning border-0 rounded mx-2 "
                                            onClick={() => {
                                                setIsShowModalEditUser(true);
                                                setEditedUserData(item);
                                                setIndex(index);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button className="text-white bg-danger border-0 rounded ">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateUser={handleUpdateUser} />
            <ModalEditUser
                show={isShowModalEditUser}
                editedUserData={editedUserData}
                handleClose={handleCloseEdit}
                handleUpdate={handleUpdateUser2}
            />
        </>
    );
}

export default TableUsers;
