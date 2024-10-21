import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ServiceClient from '../backEndService/ServiceClient';
import FournisseurService from '../backEndService/FournisseurService';
import CommandeFourService from '../backEndService/CommandeFourService';
import ServiceCommande from '../backEndService/ServiceCommand';
import LinesChart from './LinesChart';
import BasicDateCalendar from './Calender';
import { PieChart } from '@mui/x-charts/PieChart';
const Dashboard = () => {
  const [nbrCmdClient, setNbrCmdClient] = useState(0);
  const [nbrCmdFour, setNbrCmdFour] = useState(0);
  const [nbrClient, setNbrClient] = useState(0);
  const [nbrFournisseur, setNbrFournisseur] = useState(0);
  const [nbrCmdFourByStatus, setBbrCmdFourByStatus] = useState([]);
  const [nbrCmdClientByState, setNbrCmdClientByState] = useState([]);
  useEffect(() => {
    getNbrClient();
    getNbrCmdClient();
    getNbrCmdFour();
    getNbrFournisseur();
    getNbrCmdFourByState();
  })
  const getNbrClient = () => {
    ServiceClient.getAllClients()
      .then(res => {
        setNbrClient(res.data.length);
        console.log("success to get nbr clients")
      })
      .catch(error => {
        console.error("error to get nbr clients", error);
      })
  }

  const getNbrCmdClient = () => {
    ServiceCommande.getAllCommande()
      .then(res => {
        setNbrCmdClient(res.date.length);
        console.log("succes to get nbr commande ");
      })
      .catch(error => {
        console.error("error to get nbr cmd client");
      })
  }

  const getNbrFournisseur = () => {
    FournisseurService.getAllFournisseurs()
      .then(res => {
        setNbrFournisseur(res.data.length)
        console.log("suceess to get nbr fournisseur")
      })
      .catch(error => {
        console.error("error to get nbr fournisseur", error)

      })
  }

  const getNbrCmdFour = () => {
    CommandeFourService.getAllCommande()
      .then(res => {
        setNbrCmdFour(res.data.length);
        console.log("success to get nbr cmdfour")
      })
      .catch(error => {
        console.error("error to get nbr cmdfour");
      })
  }

  const getNbrCmdFourByState = () => {
    CommandeFourService.getNbrCommandeByState()
      .then(res => {
        setBbrCmdFourByStatus(res.data);
        console.log("all nbrcmdfourby stata was fetched");
      })
      .catch(error => {
        console.error("error to get nbr cmd four by state");
      })
  }

  return (
    <div className="content-wrapper Myfont">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Dashboard</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            {/* ./col commandes clients*/}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{nbrCmdClient}</h3>
                  <p>Commandes Client</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <NavLink to="/ListCommande" className='small-box-footer'>Plus d'info<i className="fas fa-arrow-circle-right" /></NavLink>
              </div>
            </div>
            {/* ./col client  */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{nbrClient}</h3>
                  <p>Clients</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <NavLink to="/ListeClients" className="small-box-footer">Plus d'info <i className="fas fa-arrow-circle-right" /></NavLink>
              </div>
            </div>
            {/* ./col fournisseur*/}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{nbrFournisseur}</h3>
                  <p>Fournisseurs</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <NavLink to="/ListFournisseur" className="small-box-footer">Plus d'info <i className="fas fa-arrow-circle-right" /></NavLink>
              </div>
            </div>
            {/* ./col commande fournisseur */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{nbrCmdFour}</h3>
                  <p>Commandes fournisseur</p>
                </div>
                <div className="icon">
                  <i className="fas fa-industry" />
                </div>
                <NavLink to="/ListCmdFour" className="small-box-footer">Plus d'info <i className="fas fa-arrow-circle-right" /></NavLink>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-7 connectedSortable">
              {/* Custom vente achat chart (Charts with tabs)*/}
              <div className="card">
                <div className="card-header bg-dark">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1" />
                    les achat-vente de chaque mois
                  </h3>
                </div>{/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content p-0">
                    {/* start chart - Sales */}

                    <LinesChart />

                    {/* endChart chart - Sales */}
                  </div>
                </div>{/* /.card-body */}
              </div>
              {/* /.card */}
              {/*/.direct-chat */}
              {/* TO DO List */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="ion ion-clipboard mr-1" />
                    To Do List
                  </h3>
                  <div className="card-tools">
                    <ul className="pagination pagination-sm">
                      <li className="page-item"><a href="#" className="page-link">«</a></li>
                      <li className="page-item"><a href="#" className="page-link">1</a></li>
                      <li className="page-item"><a href="#" className="page-link">2</a></li>
                      <li className="page-item"><a href="#" className="page-link">3</a></li>
                      <li className="page-item"><a href="#" className="page-link">»</a></li>
                    </ul>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <ul className="todo-list" data-widget="todo-list">
                    <li>
                      {/* drag handle */}
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      {/* checkbox */}
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo1" id="todoCheck1" />
                        <label htmlFor="todoCheck1" />
                      </div>
                      {/* todo text */}
                      <span className="text">Design a nice theme</span>
                      {/* Emphasis label */}
                      <small className="badge badge-danger"><i className="far fa-clock" /> 2 mins</small>
                      {/* General tools such as edit or delete*/}
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo2" id="todoCheck2" defaultChecked />
                        <label htmlFor="todoCheck2" />
                      </div>
                      <span className="text">Make the theme responsive</span>
                      <small className="badge badge-info"><i className="far fa-clock" /> 4 hours</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo3" id="todoCheck3" />
                        <label htmlFor="todoCheck3" />
                      </div>
                      <span className="text">Let theme shine like a star</span>
                      <small className="badge badge-warning"><i className="far fa-clock" /> 1 day</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo4" id="todoCheck4" />
                        <label htmlFor="todoCheck4" />
                      </div>
                      <span className="text">Let theme shine like a star</span>
                      <small className="badge badge-success"><i className="far fa-clock" /> 3 days</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo5" id="todoCheck5" />
                        <label htmlFor="todoCheck5" />
                      </div>
                      <span className="text">Check your messages and notifications</span>
                      <small className="badge badge-primary"><i className="far fa-clock" /> 1 week</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo6" id="todoCheck6" />
                        <label htmlFor="todoCheck6" />
                      </div>
                      <span className="text">Let theme shine like a star</span>
                      <small className="badge badge-secondary"><i className="far fa-clock" /> 1 month</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /.card-body */}
                <div className="card-footer clearfix">
                  <button type="button" className="btn btn-info float-right"><i className="fas fa-plus" /> Add item</button>
                </div>
              </div>
              {/* /.card */}
            </section>
            {/* /.Left col */}
            {/* right col (We are only adding the ID to make the widgets sortable)*/}
            <section className="col-lg-5 connectedSortable">
              {/*The chart commande fournisseur  */}
              <div className="card ">
                <div className="card-header border-0 bg-gradient-primary">
                  <h3 className="card-title">
                    <i className="far fa-calendar-alt" />
                    &nbsp;&nbsp;nombre de commandes fournisseur par état 2024
                  </h3>
                </div>
                {/* /.card-header */}
                <div className="card-body pt-0">
                  {/*The chart commande client  */}
                  <PieChart
                    colors={['green', 'red', 'blue', 'yellow']}
                    series={[{
                      data: nbrCmdFourByStatus,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    }]}
                    width={400}
                    height={300}
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/*The chart commande client  */}
              <div className="card bg-gradient-primary">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="far fa-calendar-alt" />
                    &nbsp;&nbsp;nombre de commandes client par état 2024
                  </h3>
                </div>
                {/* /.card-header */}
                <div className="card-body pt-0">
                  {/*The chart commande client  */}

                </div>
                {/* /.card-body */}
              </div>
              {/* Calendar */}
              <div className="card bg-gradient-success">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="far fa-calendar-alt" />
                    &nbsp;&nbsp;Calendar
                  </h3>
                  {/* tools card */}
                  <div className="card-tools">
                    {/* button with a dropdown */}
                    <div className="btn-group">
                      <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                        <i className="fas fa-bars" /></button>
                      <div className="dropdown-menu float-right" role="menu">
                        <a href="#" className="dropdown-item">Add new event</a>
                        <a href="#" className="dropdown-item">Clear events</a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">View calendar</a>
                      </div>
                    </div>
                    <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus" />
                    </button>
                    <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                  {/* /. tools */}
                </div>
                {/* /.card-header */}
                <div className="card-body pt-0">
                  {/*The calendar */}
                  <BasicDateCalendar />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </section>
            {/* right col */}
          </div>
          {/* /.row (main row) */}
        </div>{/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>

  )
}

export default Dashboard