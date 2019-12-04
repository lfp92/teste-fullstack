import React from 'react';
import { addUser, changePassword, deleteUser, editUser, getUser } from '../../services/services';

class UsuarioDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioSemCadastro: props.usuarioSemCadastro || null,
            ADD: props.id ? false : true,
            EDIT: props.id ? true : false,
            id: props.id || null,
            nome: '',
            email: '',
            celular: '',
            nivel: 0,
            senha: '',
            senhaRepetida: '',
        }
    }

    delete = () => {
        if (!window.confirm('Deseja mesmo excluir?')) {
            return;
        }
        let { id } = this.state;
        deleteUser(id)
            .then(response => {
                alert(response.mensagem);
                this.props.voltar();
            });
    }

    salvar = () => {
        let { ADD, EDIT, id, nome, email, celular, nivel, senha, senhaRepetida } = this.state;
        if (senha !== senhaRepetida) {
            alert('Senhas não coincidem.');
            this.setState({ senha: '', senhaRepetida: '' })
            return;
        }
        if (ADD) {
            addUser(nome, email, celular, senha, nivel)
                .then(response => {
                    alert(response.mensagem);
                    this.props.voltar();
                })
                .catch(error => alert(error))
        } else if (EDIT) {
            editUser(nome, email, celular, nivel, id)
                .then(response => {
                    if (senha !== '') {
                        changePassword(senha, id)
                            .then(response2 => {
                                alert(response2.mensagem);
                                this.props.voltar();
                            })
                    } else {
                        alert(response.mensagem);
                        this.props.voltar();
                    }
                })
                .catch(error => alert(error))
        }
    }

    componentDidMount() {
        let { id } = this.state;
        if (id) {
            getUser(id)
                .then(response => {
                    let { nome, email, celular, nivel } = response[0];
                    this.setState({ nome: nome || '', email: email || '', celular: celular || '', nivel: nivel || 0 })
                })
                .catch(error => alert(error))
        }
    }

    render() {
        return (
            <div>
                {this.state.EDIT ? <div>ID: {this.state.id}</div> : null}
                <div>Nome: <input type="text" onChange={(e) => this.setState({ nome: e.target.value })} value={this.state.nome}></input></div>
                <div>Email: <input type="text" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email}></input></div>
                <div>Celular: <input type="text" onChange={(e) => this.setState({ celular: e.target.value })} value={this.state.celular}></input></div>
                <div>Nova senha: <input type="password" onChange={(e) => this.setState({ senha: e.target.value })} value={this.state.senha}></input></div>
                <div>Repetir senha: <input type="password" onChange={(e) => this.setState({ senhaRepetida: e.target.value })} value={this.state.senhaRepetida}></input></div>
                {this.state.usuarioSemCadastro ?
                    null :
                    <div>Nível: <select value={this.state.nivel} onChange={e => this.setState({ nivel: e.target.value })}>
                        <option value={0}>Usuário</option>
                        <option value={1}>Administrador</option>
                    </select></div>}
                <div><button onClick={this.props.voltar}>Voltar</button></div>
                <div><button onClick={this.salvar}>Salvar</button></div>
                {this.state.EDIT ? <div><button onClick={this.delete}>Excluir</button></div> : null}
            </div>
        );
    }
}

export default UsuarioDetails;