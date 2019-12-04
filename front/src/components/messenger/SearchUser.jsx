import React, { useState } from 'react';
import { searchUser } from '../../services/services';

export default function SearchUser({ setUserList, usuario }) {
    let [pesquisa, setPesquisa] = useState('')
    let { id } = usuario;

    function pesquisarUsuario(e) {
        e.preventDefault();
        searchUser(pesquisa, id)
            .then(response => setUserList(response))
            .catch(error => console.log(error))

    }

    return (
        <div>
            <form>
                <input type="text" placeholder="Digite o nome do usuário" onChange={e => setPesquisa(e.target.value)} value={pesquisa} />
                <button onClick={e => pesquisarUsuario(e)}>Pesquisar</button>
            </form>
        </div>
    )
}