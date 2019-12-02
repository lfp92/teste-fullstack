import React from 'react';
import './UsuarioList.css';
import { listUsers } from '../../services/services';
import UsuarioDetails from './UsuarioDetails';

let listKey = 0;

export default class UsuariosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ADD: null,
            EDIT: null,
            list: null
        }
    }

    clickEditar = (id) => {
        let { ADD, EDIT } = this.state;
        ADD = null;
        EDIT = <UsuarioDetails id={id} voltar={this.voltar} />
        this.setState({ ADD, EDIT });
    }

    voltar = () => {
        listUsers()
            .then(response => {
                let array = response.map(u => <Item u={u} key={listKey++} clickEditar={this.clickEditar} />);
                this.setState({ list: array, ADD: null, EDIT: null });
            })
            .catch(error => alert(error));

    }

    adicionar = () => {
        this.setState({ ADD: <UsuarioDetails voltar={this.voltar} />, EDIT: null })
    }

    componentDidMount() {
        listUsers()
            .then(response => {
                let array = response.map(u => <Item u={u} key={listKey++} clickEditar={this.clickEditar} />);
                this.setState({ list: array });
            })
            .catch(error => alert(error))
    }

    render() {
        return (
            <React.Fragment>
                {this.state.ADD}
                {this.state.EDIT}
                {this.state.ADD || this.state.EDIT ?
                    null :
                    <React.Fragment>
                        <div><button onClick={this.adicionar}>Novo</button></div>
                        <div className="grid-container">
                            {this.state.list}
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>);
    }
}

function Item({ u, clickEditar }) {
    return (
        <React.Fragment>
            <div className="grid-item">ID: {u.id}</div>
            <div className="grid-item">Nome: {u.nome}</div>
            <div className="grid-item">Email: {u.email}</div>
            <div className="grid-item">Celular: {u.celular}</div>
            <div className="grid-item"><button onClick={() => clickEditar(u.id)}>Editar</button></div>
        </React.Fragment>);
}