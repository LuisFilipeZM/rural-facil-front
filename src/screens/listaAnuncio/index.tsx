import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const ListaAnuncio: React.FC = () => {
  // Incluir lógica de gerenciamento de anúncios aqui

  return (
    <Container>
      <h1>Gerenciamento de Anúncios</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapear e exibir os anúncios aqui */}
        </tbody>
      </Table>
      <Button variant="primary">Novo Anúncio</Button>
    </Container>
  );
};

export default ListaAnuncio;
