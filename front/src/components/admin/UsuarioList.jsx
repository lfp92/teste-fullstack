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
            list: null,
            hidden: true
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
                <div className="usuarioList">
                    {this.state.ADD}
                    {this.state.EDIT}
                    {this.state.ADD || this.state.EDIT ?
                        null :
                        <React.Fragment>

                            <div className="barra-popup" onClick={() => this.setState({ hidden: !(this.state.hidden) })}>Administração de Usuários (clique para {this.state.hidden ? 'expandir':'reduzir'})</div>
                            <div className="body" hidden={this.state.hidden}>
                                <div><button onClick={this.adicionar}>Novo Usuário</button></div>
                                <div className="grid-container">
                                    <div className='grid-item title'>ID</div>
                                    <div className='grid-item title'>Nome</div>
                                    <div className='grid-item title'>Email</div>
                                    <div className='grid-item title'>Celular</div>
                                    <div className='grid-item title'></div>

                                    {this.state.list}
                                </div>
                                <div className='legenda'>Legenda: <span className='red'>Administradores</span> / Usuários</div>
                            </div>

                        </React.Fragment>

                    }
                </div>
            </React.Fragment>);
    }
}

function Item({ u, clickEditar }) {
    let classname = u.nivel === 1 ? 'grid-item red' : 'grid-item'
    return (
        <React.Fragment>
            <div className={`${classname} text`}>{u.id}</div>
            <div className={`${classname} text`}>{u.nome}</div>
            <div className={`${classname} text`}>{u.email}</div>
            <div className={`${classname} text`}>{u.celular}</div>
            <div className={`${classname}`}><button onClick={() => clickEditar(u.id)}>Editar</button></div>
        </React.Fragment>);
}