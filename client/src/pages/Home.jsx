import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import { TextField, FormControl, Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Modal from './Modal'
import CommentsModal from './CommentsModal'
import Statatics from './Statatics'
import CreateTicket from './CreateTicket'
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector } from "react-redux";
import { _getAllTicket, _getAllStatatics, _getAllSummaryTickets } from '../Action/TicketDispatcher';
import {_getAllTechnician, _getAllManager} from '../Action/authDispatcher'
import {_getAllDept} from '../Action/deptDispatcher'
import Comments from './comments'

import { DataGrid, GridToolbar } from "@mui/x-data-grid";



import AssignTicket from './AssignTicket'

import dayjs, { Dayjs } from "dayjs";



const columns = [

  {
    headerName: "Ticket ID",
    field: "id",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
    renderCell: (params) => {
      return '#' + params.row.id

    }
  },

  {
    headerName: "Title",
    field: "title",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },
  {
    headerName: "category",
    field: "category",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },

  {
    headerName: "Description",
    field: "ticketDescription",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },
 
  {
    headerName: "created By",
    field: "createdName",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },



  {
    headerName: "creation Date",
    field: "creationDate",
    headerClassName: "super-app-theme--header",

    type: "date",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    renderCell: (params) => {
      return new Date(params.row.creationDate).toDateString()
    }
 
  },

  {
    headerName: "Status",
    field: "ticketStatus",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },

  {
    headerName: "Priority",
    field: "ticketPriority",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },

  {
    headerName: "Assigned By",
    field: "AssignedByName",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },

  {
    headerName: "Assign Date",
    field: "AssignDate",
    headerClassName: "super-app-theme--header",
    type: "date",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    renderCell: (params) => {
      return params.row.AssignDate ? new Date(params.row.AssignDate).toDateString() : ''
    }
  },


  {
    headerName: "Assigned",
    field: "AssignedToName",
    headerClassName: "super-app-theme--header",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
  },

  {
    headerName: "Resolve Date",
    field: "ResolveDate",
    headerClassName: "super-app-theme--header",
    type: "date",
    // filterOperators,
    headerAlign: "left",
    align: "left",
    flex: 0.1,
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    renderCell: (params) => {
      return params.row.ResolveDate ? new Date(params.row.ResolveDate).toDateString() : ''
    }
  }

]



export default function Home () {

  const { ticketData } = useSelector((state) => state.ticketReducer);
  const { user, deptData } = useSelector((state) => state.authReducer);


  const [startDate, setStartDate] = React.useState(dayjs("2022-04-17"));


  const dispatch = useDispatch();

  const [error, setError] = React.useState({display: false, error: '', message: ''})

  const [isOpenForm, setOpenForm] = useState(false)

  const [isCommentsForm, setCommentsForm] = useState(false)

 
  const [selectedRow, setSelectedRow] = React.useState({})
 
  const clickHandler = (event) => {


    setSelectedRow(event.row)

    setCommentsForm(true)

  }





    useEffect(() => {

      console.log('deptData', deptData)

      if(deptData.length > 0) {
      dispatch(_getAllTicket({deptName: user.isSuperManager ?  'All': deptData[0]?.DeptName}))
      dispatch(_getAllStatatics({deptName: user.isSuperManager ?  'All': deptData[0]?.DeptName}))
      dispatch(_getAllSummaryTickets({deptName: user.isSuperManager ?  'All': deptData[0]?.DeptName}))
    }
      dispatch(_getAllTechnician())
      dispatch(_getAllManager())
      dispatch(_getAllDept({isSuperManager: user.isSuperManager}))

  }, [deptData.length]);

  const callback  = (payload) => {

   

    setOpenForm(!isOpenForm)
    setCommentsForm(false)
    console.log('payload', payload)
    if(payload.error === 'success') {

      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  payload.message,
        error: 'success'
      }));

    } else {

      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  payload.message,
        error: 'error'
      }));
    }
    dispatch(_getAllTicket({deptName: user.isSuperManager ?  'All': deptData[0]?.DeptName}))
    dispatch(_getAllStatatics({deptName: user.isSuperManager ?  'All': deptData[0]?.DeptName}))
    // dispatch(_get({deptName: user.isSuperManager ?  'All': deptData[0]?.DeptName}))
 
  }

  console.log('error', error)

  return(
    <>
    <div>
    {error.display && <Alert severity= {error.error}>{error.message}</Alert> }
      {user.cusTechRole === 'Customer' && 
    <Modal Component={<CreateTicket callback={callback}  /> } name ={'Create Ticket'}  isOpenForm= {isOpenForm}></Modal>
    }
    </div>

    
    <Statatics />
    
    <div style={{background:'aliceblue', marginTop: '5px'}}>

    {user.cusTechRole === 'Manager' && !selectedRow.AssignedToID ? 

    <CommentsModal Component={<AssignTicket selectedRow={selectedRow} callback={callback}/> } name ={'Assign Ticket '}  isOpenForm= {isCommentsForm} cb={setCommentsForm}></CommentsModal>
    :
    <CommentsModal Component={<Comments selectedRow={selectedRow} callback={callback}/> } name ={'Update Ticket Comments '}  isOpenForm= {isCommentsForm} cb={setCommentsForm}></CommentsModal>
    }

        <DataGrid
        onRowClick={(event) => clickHandler(event)}
        rows={ticketData}
        columns={columns}
        components={{
          Toolbar: GridToolbar
        }}
      />
      </div>
    </>
  )
}